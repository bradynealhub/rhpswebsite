import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDocumentById, getDocumentVersion, listDocumentShares, listDocumentVersions } from "@/lib/portalDb";
import { canViewDocument } from "@/lib/portalPermissions";
import { getCurrentUser } from "@/lib/portalSession";

// Never a public R2 URL -- re-derives the user from the session, then
// streams the object back. Optional ?version=N for a specific past
// version; defaults to the document's current version.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { id } = await params;
  const document = await getDocumentById(id);
  if (!document || document.doc_type !== "file") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  const shares = await listDocumentShares(id);
  if (!canViewDocument(user, document, shares)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const url = new URL(request.url);
  const requestedVersion = url.searchParams.get("version");
  const version = requestedVersion
    ? await getDocumentVersion(id, Number(requestedVersion))
    : (await listDocumentVersions(id))[0];

  if (!version || !version.r2_key) return NextResponse.json({ error: "Version not found." }, { status: 404 });

  const { env } = await getCloudflareContext({ async: true });
  const object = await env.PORTAL_FILES.get(version.r2_key);
  if (!object) return NextResponse.json({ error: "File not found in storage." }, { status: 404 });

  return new NextResponse(object.body, {
    headers: {
      "Content-Type": version.mime_type ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${version.original_filename ?? "download"}"`,
      "Content-Length": String(version.size_bytes ?? object.size),
      "Cache-Control": "private, no-store",
    },
  });
}
