import Link from "next/link";
import { DocumentUploadForm } from "@/components/portal/DocumentUploadForm";
import { FileTypeIcon, PrivateLockBadge, RichTextDocIcon } from "@/components/portal/DocumentIcons";
import { listDocumentShares, listOpportunityDocuments } from "@/lib/portalDb";
import { canViewDocument } from "@/lib/portalPermissions";
import { getCurrentUser } from "@/lib/portalSession";

const STATUS_PILL_CLASSES: Record<string, string> = {
  Draft: "bg-charcoal/10 text-charcoal/70",
  "In Review": "bg-copperAccent/10 text-copperAccent",
  Approved: "bg-evergreen/10 text-evergreen",
  Rejected: "bg-red-50 text-red-700",
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
      <h2 className="font-headline text-lg font-bold text-charcoal">Documents</h2>

      {visible.length === 0 ? (
        <p className="mt-2 font-body text-sm text-charcoal/50">No documents attached yet.</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {visible.map((doc) => (
            <li key={doc.id}>
              <Link
                href={`/portal/documents/file/${doc.id}`}
                className="flex items-center gap-3 rounded-md border border-charcoal/10 px-3 py-2 hover:border-evergreen/40"
              >
                <div className="relative shrink-0">
                  {doc.doc_type === "richtext" ? (
                    <RichTextDocIcon className="h-6 w-6" />
                  ) : (
                    <FileTypeIcon mimeType={doc.current_mime_type} className="h-6 w-6" />
                  )}
                  {doc.visibility === "Private" ? <PrivateLockBadge /> : null}
                </div>
                <span className="min-w-0 flex-1 truncate font-body text-sm text-charcoal">{doc.title}</span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 font-body text-[11px] font-semibold ${STATUS_PILL_CLASSES[doc.status] ?? ""}`}
                >
                  {doc.status}
                </span>
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
