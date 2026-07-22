import Link from "next/link";
import { DocumentUploadForm } from "@/components/portal/DocumentUploadForm";
import { FileTypeIcon, PrivateLockBadge, RichTextDocIcon } from "@/components/portal/DocumentIcons";
import { listDocumentShares, listOpportunityDocuments } from "@/lib/portalDb";
import { canViewDocument } from "@/lib/portalPermissions";
import { getCurrentUser } from "@/lib/portalSession";

const STATUS_TAG_CLASSES: Record<string, string> = {
  Draft: "tag tag-neutral",
  "In Review": "tag tag-accent-2",
  Approved: "tag tag-accent",
  Rejected: "tag tag-danger",
};

// Unlimited documents per opportunity, reusing the same documents/R2 system
// the Documents library uses (see opportunity_documents, migration 0002) --
// not a separate attachment store. A document's own visibility/share grants
// still apply here: one attached as Private and not shared with the viewer
// simply doesn't show up in this list for them, same as it wouldn't in the
// Documents browser.
export async function OpportunityDocuments({ opportunityId }: { opportunityId: string }) {
  const user = await getCurrentUser();
  if (!user) return null;

  const allDocuments = await listOpportunityDocuments(opportunityId);
  const visible = (
    await Promise.all(
      allDocuments.map(async (doc) => {
        const shares = await listDocumentShares(doc.id);
        return canViewDocument(user, doc, shares) ? doc : null;
      }),
    )
  ).filter((doc) => doc !== null);

  return (
    <div>
      <h2 style={{ fontSize: "17px" }}>Documents</h2>

      {visible.length === 0 ? (
        <p className="text-muted mt-2" style={{ fontSize: "13px" }}>No documents attached yet.</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {visible.map((doc) => (
            <li key={doc.id}>
              <Link href={`/portal/documents/file/${doc.id}`} className="card blueprint flex items-center gap-3">
                <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
                <div className="relative shrink-0">
                  {doc.doc_type === "richtext" ? (
                    <RichTextDocIcon className="h-6 w-6" />
                  ) : (
                    <FileTypeIcon mimeType={doc.current_mime_type} className="h-6 w-6" />
                  )}
                  {doc.visibility === "Private" ? <PrivateLockBadge /> : null}
                </div>
                <span className="min-w-0 flex-1 truncate" style={{ fontSize: "13px" }}>{doc.title}</span>
                <span className={`shrink-0 ${STATUS_TAG_CLASSES[doc.status] ?? "tag tag-neutral"}`}>{doc.status}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3">
        <DocumentUploadForm opportunityId={opportunityId} />
      </div>
    </div>
  );
}
