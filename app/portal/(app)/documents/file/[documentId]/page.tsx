import { notFound } from "next/navigation";
import { ApprovalControls } from "@/components/portal/ApprovalControls";
import { CollaborativeEditor } from "@/components/portal/CollaborativeEditor";
import { CommentThread } from "@/components/portal/CommentThread";
import { DocumentShareControls } from "@/components/portal/DocumentShareControls";
import { DocumentUploadForm } from "@/components/portal/DocumentUploadForm";
import {
  getDocumentById,
  listApprovals,
  listComments,
  listDocumentShares,
  listDocumentVersions,
} from "@/lib/portalDb";
import { canApproveDocuments, canManageDocumentSharing, getDocumentAccessLevel } from "@/lib/portalPermissions";
import { getCurrentUser } from "@/lib/portalSession";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function DocumentDetailPage({ params }: { params: Promise<{ documentId: string }> }) {
  const { documentId } = await params;
  const [user, document] = await Promise.all([getCurrentUser(), getDocumentById(documentId)]);
  if (!user || !document) notFound();

  const shares = await listDocumentShares(documentId);
  const access = getDocumentAccessLevel(user, document, shares);
  if (access === "none") notFound();

  const [versions, comments, approvals] = await Promise.all([
    listDocumentVersions(documentId),
    listComments(documentId),
    listApprovals(documentId),
  ]);

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1>{document.title}</h1>
          {document.description ? <p className="text-muted mt-2">{document.description}</p> : null}
          <p className="text-muted mt-1" style={{ fontSize: "13px" }}>
            {document.doc_type === "richtext" ? "Started" : "Uploaded"} by {document.uploader_name} &middot;{" "}
            {document.created_at}
          </p>
        </div>
        {document.visibility === "Private" ? <span className="tag tag-neutral shrink-0">🔒 Private</span> : null}
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          {document.doc_type === "richtext" ? (
            <div>
              <h2 style={{ fontSize: "17px" }}>Document</h2>
              <div className="mt-3">
                <CollaborativeEditor
                  documentId={document.id}
                  documentTitle={document.title}
                  userId={user.id}
                  userName={user.name}
                  initialReadOnly={document.status !== "Draft" || access !== "edit"}
                />
              </div>
              {versions.length > 0 ? (
                <p className="text-muted mt-2" style={{ fontSize: "11px" }}>
                  {versions.length} review snapshot{versions.length === 1 ? "" : "s"} &middot; latest v
                  {versions[0].version} &middot; {versions[0].created_at}
                </p>
              ) : null}
            </div>
          ) : (
            <div>
              {versions[0]?.mime_type === "application/pdf" ? (
                <div>
                  <h2 style={{ fontSize: "17px" }}>Preview</h2>
                  <iframe
                    src={`/portal/api/documents/${document.id}/download?inline=1`}
                    title={`${document.title} preview`}
                    className="mt-3 h-[80vh] w-full"
                    style={{ border: "1px solid var(--color-divider)" }}
                  />
                </div>
              ) : null}

              <div className="mt-6 flex items-center justify-between">
                <h2 style={{ fontSize: "17px" }}>Versions</h2>
                {access === "edit" ? <DocumentUploadForm documentId={document.id} /> : null}
              </div>
              <ul className="mt-3" style={{ borderTop: "1px solid var(--color-divider)" }}>
                {versions.map((version) => (
                  <li
                    key={version.id}
                    className="flex items-center justify-between py-2"
                    style={{ borderBottom: "1px solid var(--color-divider)" }}
                  >
                    <div>
                      <p style={{ fontSize: "13px" }}>
                        v{version.version} &middot; {version.original_filename}
                      </p>
                      <p className="text-muted" style={{ fontSize: "11px" }}>
                        {version.size_bytes ? formatBytes(version.size_bytes) : ""} &middot; {version.created_at}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {version.mime_type === "application/pdf" ? (
                        <a
                          href={`/portal/api/documents/${document.id}/download?version=${version.version}&inline=1`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "13px" }}
                        >
                          Preview
                        </a>
                      ) : null}
                      <a
                        href={`/portal/api/documents/${document.id}/download?version=${version.version}`}
                        style={{ fontSize: "13px" }}
                      >
                        Download
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <CommentThread documentId={document.id} comments={comments} />
        </div>

        <div className="space-y-8">
          <ApprovalControls
            document={document}
            approvals={approvals}
            currentUser={user}
            canApprove={canApproveDocuments(user)}
          />
          {document.visibility === "Private" && canManageDocumentSharing(user, document) ? (
            <DocumentShareControls documentId={document.id} shares={shares} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
