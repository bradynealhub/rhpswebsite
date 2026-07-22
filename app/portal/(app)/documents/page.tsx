import { DocumentBrowser } from "@/components/portal/DocumentBrowser";

export default function DocumentsRootPage() {
  return (
    <div>
      <h1>Documents</h1>
      <div className="mt-6">
        <DocumentBrowser currentFolderId={null} breadcrumbs={[]} />
      </div>
    </div>
  );
}
