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

  // Inline preview is opt-in via ?inline=1, and even then only honored for
  // PDFs -- gated on the mime_type stored in D1 at upload time, not the
  // client-suppliable query param alone, so this can't be used to get an
  // arbitrary file type (e.g. an uploaded HTML file) rendered inline in the
  // browser's origin.
  const wantsInline = url.searchParams.get("inline") === "1";
  const disposition = wantsInline && version.mime_type === "application/pdf" ? "inline" : "attachment";

  return new NextResponse(object.body, {
    headers: {
      "Content-Type": version.mime_type ?? "application/octet-stream",
      "Content-Disposition": `${disposition}; filename="${version.original_filename ?? "download"}"`,
      "Content-Length": String(version.size_bytes ?? object.size),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
