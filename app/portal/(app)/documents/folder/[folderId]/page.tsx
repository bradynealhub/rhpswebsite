import { notFound } from "next/navigation";
import { DocumentBrowser } from "@/components/portal/DocumentBrowser";
import { getFolderById, getFolderPath } from "@/lib/portalDb";

export default async function DocumentsFolderPage({ params }: { params: Promise<{ folderId: string }> }) {
  const { folderId } = await params;
  const folder = await getFolderById(folderId);
  if (!folder) notFound();

  const breadcrumbs = await getFolderPath(folderId);

  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-charcoal">{folder.name}</h1>
      <div className="mt-6">
        <DocumentBrowser currentFolderId={folderId} breadcrumbs={breadcrumbs} />
      </div>
    </div>
  );
}
