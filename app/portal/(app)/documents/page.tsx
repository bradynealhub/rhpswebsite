import { DocumentBrowser } from "@/components/portal/DocumentBrowser";

const FILTER_HEADINGS: Record<string, string> = {
  mine: "My files",
  shared: "Shared with me",
};

export default async function DocumentsRootPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter: rawFilter } = await searchParams;
  const filter = rawFilter === "mine" || rawFilter === "shared" ? rawFilter : "all";

  return (
    <div>
      <h1>{FILTER_HEADINGS[filter] ?? "Documents"}</h1>
      <div className="mt-6">
        <DocumentBrowser currentFolderId={null} breadcrumbs={[]} filter={filter} />
      </div>
    </div>
  );
}
