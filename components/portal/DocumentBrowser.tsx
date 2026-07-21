import Link from "next/link";
import { redirect } from "next/navigation";
import { FileTypeIcon, FolderIcon, PrivateLockBadge, RichTextDocIcon } from "@/components/portal/DocumentIcons";
import { NewItemMenu } from "@/components/portal/NewItemMenu";
import { listDocuments, listFolders } from "@/lib/portalDb";
import { getCurrentUser } from "@/lib/portalSession";
import type { DocumentFolder } from "@/lib/portalTypes";

const STATUS_PILL_CLASSES: Record<string, string> = {
  Draft: "bg-charcoal/10 text-charcoal/70",
  "In Review": "bg-copperAccent/10 text-copperAccent",
  Approved: "bg-evergreen/10 text-evergreen",
  Rejected: "bg-red-50 text-red-700",
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

  const isEmpty = folders.length === 0 && documents.length === 0;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
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
        <NewItemMenu folderId={currentFolderId} />
      </div>

      {isEmpty ? (
        <p className="mt-10 font-body text-sm text-charcoal/50">Nothing here yet -- use "+ New" to get started.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {folders.map((folder) => (
            <Link
              key={folder.id}
              href={`/portal/documents/folder/${folder.id}`}
              className="group flex flex-col items-center gap-2 rounded-lg border border-transparent p-4 text-center hover:border-evergreen/30 hover:bg-warmStone/60 hover:shadow-sm"
            >
              <FolderIcon />
              <span className="line-clamp-2 font-body text-sm text-charcoal group-hover:text-evergreen">
                {folder.name}
              </span>
            </Link>
          ))}

          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/portal/documents/file/${doc.id}`}
              className="group flex flex-col items-center gap-2 rounded-lg border border-transparent p-4 text-center hover:border-evergreen/30 hover:bg-warmStone/60 hover:shadow-sm"
            >
              <div className="relative">
                {doc.doc_type === "richtext" ? (
                  <RichTextDocIcon />
                ) : (
                  <FileTypeIcon mimeType={doc.current_mime_type} />
                )}
                {doc.visibility === "Private" ? <PrivateLockBadge /> : null}
              </div>
              <span className="line-clamp-2 font-body text-sm text-charcoal group-hover:text-evergreen">
                {doc.title}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 font-body text-[11px] font-semibold ${STATUS_PILL_CLASSES[doc.status] ?? ""}`}
              >
                {doc.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
