import { notFound } from "next/navigation";
import { ApprovalControls } from "@/components/portal/ApprovalControls";
import { CollaborativeEditor } from "@/components/portal/CollaborativeEditor";
import { CommentThread } from "@/components/portal/CommentThread";
import { DocumentUploadForm } from "@/components/portal/DocumentUploadForm";
import { getDocumentById, listApprovals, listComments, listDocumentVersions } from "@/lib/portalDb";
import { canApproveDocuments } from "@/lib/portalPermissions";
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

  const [versions, comments, approvals] = await Promise.all([
    listDocumentVersions(documentId),
    listComments(documentId),
    listApprovals(documentId),
  ]);

  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-charcoal">{document.title}</h1>
      {document.description ? <p className="mt-2 font-body text-charcoal/70">{document.description}</p> : null}
      <p className="mt-1 font-body text-sm text-charcoal/50">
        {document.doc_type === "richtext" ? "Started" : "Uploaded"} by {document.uploader_name} &middot;{" "}
        {document.created_at}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          {document.doc_type === "richtext" ? (
            <div>
              <h2 className="font-headline text-lg font-bold text-charcoal">Document</h2>
              <div className="mt-3">
                <CollaborativeEditor
                  documentId={document.id}
                  documentTitle={document.title}
                  userId={user.id}
                  userName={user.name}
                  initialReadOnly={document.status !== "Draft"}
                />
              </div>
              {versions.length > 0 ? (
                <p className="mt-2 font-body text-xs text-charcoal/50">
                  {versions.length} review snapshot{versions.length === 1 ? "" : "s"} &middot; latest v
                  {versions[0].version} &middot; {versions[0].created_at}
                </p>
              ) : null}
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <h2 className="font-headline text-lg font-bold text-charcoal">Versions</h2>
                <DocumentUploadForm documentId={document.id} />
              </div>
              <ul className="mt-3 divide-y divide-charcoal/5">
                {versions.map((version) => (
                  <li key={version.id} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-body text-sm text-charcoal">
                        v{version.version} &middot; {version.original_filename}
                      </p>
                      <p className="font-body text-xs text-charcoal/50">
                        {version.size_bytes ? formatBytes(version.size_bytes) : ""} &middot; {version.created_at}
                      </p>
                    </div>
                    <a
                      href={`/portal/api/documents/${document.id}/download?version=${version.version}`}
                      className="font-body text-sm text-evergreen hover:underline"
                    >
                      Download
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <CommentThread documentId={document.id} comments={comments} />
        </div>

        <div>
          <ApprovalControls
            document={document}
            approvals={approvals}
            currentUser={user}
            canApprove={canApproveDocuments(user)}
          />
        </div>
      </div>
    </div>
  );
}
