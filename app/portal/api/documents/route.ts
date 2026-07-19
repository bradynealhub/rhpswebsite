import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { addFileDocumentVersion, createFileDocument, getNextDocumentVersionNumber } from "@/lib/portalDb";
import { getCurrentUser, verifyCsrf } from "@/lib/portalSession";

// Proxy-through-Worker upload (env.PORTAL_FILES.put), not presigned URLs --
// no separate R2 S3-API credential surface to provision/rotate, and it
// keeps upload authorization in the same code path as everything else (the
// session + CSRF check below). See plan, section D.
const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50MB -- comfortably above any grant PDF/spreadsheet

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-200);
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (!(await verifyCsrf(request))) return NextResponse.json({ error: "Invalid CSRF token." }, { status: 403 });

  const formData = await request.formData();
  const file = formData.get("file");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const folderId = String(formData.get("folderId") ?? "").trim() || null;
  const existingDocumentId = String(formData.get("documentId") ?? "").trim() || null;

  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided." }, { status: 400 });
  if (!existingDocumentId && !title) return NextResponse.json({ error: "Title is required." }, { status: 400 });
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File is too large (50MB limit)." }, { status: 413 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const documentId = existingDocumentId ?? crypto.randomUUID();
  const versionId = crypto.randomUUID();
  const filename = sanitizeFilename(file.name || "upload");
  const mimeType = file.type || "application/octet-stream";

  // Version placed under its own path segment so an approved version's
  // bytes can never be silently overwritten by a later re-upload.
  const version = existingDocumentId ? await getNextDocumentVersionNumber(existingDocumentId) : 1;
  const r2Key = `documents/${documentId}/v${version}/${filename}`;

  await env.PORTAL_FILES.put(r2Key, file.stream(), { httpMetadata: { contentType: mimeType } });

  if (existingDocumentId) {
    await addFileDocumentVersion({
      versionId,
      documentId: existingDocumentId,
      version,
      uploadedByUserId: user.id,
      r2Key,
      originalFilename: filename,
      mimeType,
      sizeBytes: file.size,
    });
  } else {
    await createFileDocument({
      id: documentId,
      title,
      description,
      uploaderUserId: user.id,
      folderId,
      versionId,
      r2Key,
      originalFilename: filename,
      mimeType,
      sizeBytes: file.size,
    });
  }

  return NextResponse.json({ ok: true, documentId });
}
