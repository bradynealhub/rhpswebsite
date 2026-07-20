import Link from "next/link";
import { redirect } from "next/navigation";
import { DocumentUploadForm } from "@/components/portal/DocumentUploadForm";
import { NewRichTextDocumentForm } from "@/components/portal/NewRichTextDocumentForm";
import { listMyDocuments } from "@/lib/portalDb";
import { getCurrentUser } from "@/lib/portalSession";

const STATUS_COLORS: Record<string, string> = {
  Draft: "text-charcoal/60",
  "In Review": "text-copperAccent",
  Approved: "text-evergreen",
  Rejected: "text-red-700",
};

export default async function MyDocumentsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const documents = await listMyDocuments(user.id);
  const owned = documents.filter((doc) => doc.access === "owner");
  const sharedWithMe = documents.filter((doc) => doc.access !== "owner");

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-2xl font-bold text-charcoal">My Documents</h1>
        <Link href="/portal/documents" className="font-body text-sm text-charcoal/60 hover:text-evergreen">
          Shared library &rarr;
        </Link>
      </div>
      <p className="mt-2 font-body text-sm text-charcoal/60">
        Private by default -- only visible to you until you share it with someone.
      </p>

      <div className="mt-4 flex flex-wrap items-start gap-3">
        <NewRichTextDocumentForm folderId={null} visibility="Private" />
        <DocumentUploadForm folderId={null} visibility="Private" />
      </div>

      <div className="mt-8">
        <h2 className="font-body text-sm font-semibold uppercase tracking-wide text-charcoal/50">
          Owned by me ({owned.length})
        </h2>
        {owned.length === 0 ? (
          <p className="mt-2 font-body text-sm text-charcoal/50">No private documents yet.</p>
        ) : (
          <ul className="mt-2 divide-y divide-charcoal/5">
            {owned.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between py-2">
                <Link
                  href={`/portal/documents/file/${doc.id}`}
                  className="font-body text-charcoal hover:text-evergreen"
                >
                  🔒 {doc.title}
                </Link>
                <span className={`font-body text-xs font-semibold ${STATUS_COLORS[doc.status] ?? ""}`}>
                  {doc.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h2 className="font-body text-sm font-semibold uppercase tracking-wide text-charcoal/50">
          Shared with me ({sharedWithMe.length})
        </h2>
        {sharedWithMe.length === 0 ? (
          <p className="mt-2 font-body text-sm text-charcoal/50">Nobody has shared a document with you yet.</p>
        ) : (
          <ul className="mt-2 divide-y divide-charcoal/5">
            {sharedWithMe.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between py-2">
                <div>
                  <Link
                    href={`/portal/documents/file/${doc.id}`}
                    className="font-body text-charcoal hover:text-evergreen"
                  >
                    🔒 {doc.title}
                  </Link>
                  <span className="ml-2 font-body text-xs text-charcoal/40">by {doc.uploader_name}</span>
                </div>
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                  {doc.access === "Edit" ? "Can edit" : "Can view"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
