import Link from "next/link";
import { redirect } from "next/navigation";
import { DocumentUploadForm } from "@/components/portal/DocumentUploadForm";
import { NewFolderForm } from "@/components/portal/NewFolderForm";
import { NewRichTextDocumentForm } from "@/components/portal/NewRichTextDocumentForm";
import { listDocuments, listFolders } from "@/lib/portalDb";
import { getCurrentUser } from "@/lib/portalSession";
import type { DocumentFolder } from "@/lib/portalTypes";

const STATUS_COLORS: Record<string, string> = {
  Draft: "text-charcoal/60",
  "In Review": "text-copperAccent",
  Approved: "text-evergreen",
  Rejected: "text-red-700",
};

export async function DocumentBrowser({
  currentFolderId,
  breadcrumbs,
}: {
  currentFolderId: string | null;
  breadcrumbs: DocumentFolder[];
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  // Private and Shared documents are browsed in the same tree -- listDocuments
  // filters per viewer, so a document that's private to someone else simply
  // doesn't appear here at all, rather than living behind a separate tab.
  const [folders, documents] = await Promise.all([
    listFolders(currentFolderId),
    listDocuments(currentFolderId, { id: user.id, isPlatformAdmin: Boolean(user.is_platform_admin) }),
  ]);

  return (
    <div>
      <nav aria-label="Breadcrumb" className="font-body text-sm text-charcoal/60">
        <Link href="/portal/documents" className="hover:text-evergreen">
          Documents
        </Link>
        {breadcrumbs.map((folder) => (
          <span key={folder.id}>
            {" / "}
            <Link href={`/portal/documents/folder/${folder.id}`} className="hover:text-evergreen">
              {folder.name}
            </Link>
          </span>
        ))}
      </nav>

      <div className="mt-4 flex flex-wrap items-start gap-3">
        <NewFolderForm parentFolderId={currentFolderId} />
        <NewRichTextDocumentForm folderId={currentFolderId} />
        <DocumentUploadForm folderId={currentFolderId} />
      </div>

      {folders.length > 0 ? (
        <div className="mt-8">
          <h2 className="font-body text-sm font-semibold uppercase tracking-wide text-charcoal/50">Folders</h2>
          <ul className="mt-2 divide-y divide-charcoal/5">
            {folders.map((folder) => (
              <li key={folder.id} className="py-2">
                <Link
                  href={`/portal/documents/folder/${folder.id}`}
                  className="font-body text-charcoal hover:text-evergreen"
                >
                  📁 {folder.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8">
        <h2 className="font-body text-sm font-semibold uppercase tracking-wide text-charcoal/50">Documents</h2>
        {documents.length === 0 ? (
          <p className="mt-2 font-body text-sm text-charcoal/50">No documents here yet.</p>
        ) : (
          <ul className="mt-2 divide-y divide-charcoal/5">
            {documents.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between py-2">
                <Link
                  href={`/portal/documents/file/${doc.id}`}
                  className="font-body text-charcoal hover:text-evergreen"
                >
                  {doc.visibility === "Private" ? "🔒 " : ""}
                  {doc.title}
                </Link>
                <span className={`font-body text-xs font-semibold ${STATUS_COLORS[doc.status] ?? ""}`}>
                  {doc.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
