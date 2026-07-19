import { DocumentBrowser } from "@/components/portal/DocumentBrowser";

export default function DocumentsRootPage() {
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-charcoal">Documents</h1>
      <div className="mt-6">
        <DocumentBrowser currentFolderId={null} breadcrumbs={[]} />
      </div>
    </div>
  );
}
