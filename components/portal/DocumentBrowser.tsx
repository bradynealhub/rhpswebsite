import Link from "next/link";
import { DocumentUploadForm } from "@/components/portal/DocumentUploadForm";
import { NewFolderForm } from "@/components/portal/NewFolderForm";
import { NewRichTextDocumentForm } from "@/components/portal/NewRichTextDocumentForm";
import { listDocuments, listFolders } from "@/lib/portalDb";
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
  const [folders, documents] = await Promise.all([listFolders(currentFolderId), listDocuments(currentFolderId)]);

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
