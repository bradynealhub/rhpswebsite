import Link from "next/link";
import { redirect } from "next/navigation";
import { FileTypeIcon, FolderIcon, PrivateLockBadge, RichTextDocIcon } from "@/components/portal/DocumentIcons";
import { NewItemMenu } from "@/components/portal/NewItemMenu";
import { listDocuments, listFolders } from "@/lib/portalDb";
import { getCurrentUser } from "@/lib/portalSession";
import type { DocumentFolder } from "@/lib/portalTypes";

const STATUS_TAG_CLASSES: Record<string, string> = {
  Draft: "tag tag-neutral",
  "In Review": "tag tag-accent-2",
  Approved: "tag tag-accent",
  Rejected: "tag tag-danger",
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
        <nav aria-label="Breadcrumb" className="text-muted flex items-center gap-1.5" style={{ fontSize: "13px" }}>
          <Link href="/portal/documents">Documents</Link>
          {breadcrumbs.map((folder) => (
            <span key={folder.id} className="flex items-center gap-1.5">
              <span>/</span>
              <Link href={`/portal/documents/folder/${folder.id}`}>{folder.name}</Link>
            </span>
          ))}
        </nav>
        <NewItemMenu folderId={currentFolderId} />
      </div>

      {isEmpty ? (
        <p className="text-muted mt-10" style={{ fontSize: "14px" }}>
          Nothing here yet -- use &quot;+ New&quot; to get started.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {folders.map((folder) => (
            <Link
              key={folder.id}
              href={`/portal/documents/folder/${folder.id}`}
              className="card blueprint elev-sm tile-hover group flex h-36 flex-col items-center justify-center gap-2 text-center transition"
              style={{ cursor: "pointer" }}
            >
              <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
              <FolderIcon />
              <span className="line-clamp-2" style={{ fontSize: "14px" }}>{folder.name}</span>
            </Link>
          ))}

          {documents.map((doc) => (
            <Link
              key={doc.id}
              href={`/portal/documents/file/${doc.id}`}
              className="card blueprint elev-sm tile-hover group flex h-36 flex-col items-center justify-center gap-2 text-center transition"
              style={{ cursor: "pointer" }}
            >
              <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
              <div className="relative">
                {doc.doc_type === "richtext" ? (
                  <RichTextDocIcon />
                ) : (
                  <FileTypeIcon mimeType={doc.current_mime_type} />
                )}
                {doc.visibility === "Private" ? <PrivateLockBadge /> : null}
              </div>
              <span className="line-clamp-2" style={{ fontSize: "14px" }}>{doc.title}</span>
              <span className={STATUS_TAG_CLASSES[doc.status] ?? "tag tag-neutral"}>{doc.status}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
