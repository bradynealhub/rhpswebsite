"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import {
  addApproval,
  addComment,
  addRichTextSnapshot,
  createFolder,
  createRichTextDocument,
  findUserByEmail,
  getDocumentById,
  listDocumentShares,
  revokeDocumentShare,
  shareDocument,
  updateDocumentStatus,
} from "@/lib/portalDb";
import {
  canApproveDocuments,
  canEditDocumentContent,
  canManageDocumentSharing,
  canViewDocument,
  PortalForbiddenError,
} from "@/lib/portalPermissions";
import { getCurrentUser } from "@/lib/portalSession";
import type { DocumentVisibility, SharePermission } from "@/lib/portalTypes";

export async function createFolderAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const name = String(formData.get("name") ?? "").trim();
  const parentFolderId = String(formData.get("parentFolderId") ?? "").trim() || null;
  if (!name) throw new Error("Folder name is required.");

  await createFolder({ id: crypto.randomUUID(), name, parentFolderId, createdByUserId: user.id });

  revalidatePath(parentFolderId ? `/portal/documents/folder/${parentFolderId}` : "/portal/documents");
}

export async function createRichTextDocumentAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;
  const folderId = String(formData.get("folderId") ?? "").trim() || null;
  const visibilityRaw = String(formData.get("visibility") ?? "").trim();
  const visibility: DocumentVisibility = visibilityRaw === "Private" ? "Private" : "Shared";
  if (!title) throw new Error("Title is required.");
  // Private documents live only in "My Documents" (a flat, owner-scoped
  // list) -- never filed into the shared folder tree, which is inherently
  // an org-wide navigational structure. See migrations/0005's header comment.
  if (visibility === "Private" && folderId) throw new Error("Private documents can't be placed in a shared folder.");

  const id = crypto.randomUUID();
  await createRichTextDocument({ id, title, description, uploaderUserId: user.id, folderId, visibility });

  redirect(`/portal/documents/file/${id}`);
}

// File documents: no DocumentRoom involved, just a status flip.
export async function submitForReviewAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const documentId = String(formData.get("documentId") ?? "");
  const document = await getDocumentById(documentId);
  if (!document) throw new Error("Document not found.");

  await updateDocumentStatus(documentId, "In Review");
  revalidatePath(`/portal/documents/file/${documentId}`);
}

// Richtext documents: called from CollaborativeEditor.tsx (not a plain
// <form action>) because it needs the live editor's current content --
// html/text are the editor's own serialization, captured client-side at
// the moment of submission. Writes the review snapshot, then locks the
// DocumentRoom so further edits are refused server-side, not just hidden
// client-side. See plan, section B.
export async function submitRichTextForReviewAction(documentId: string, html: string, text: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new PortalForbiddenError("Not signed in.");

  const document = await getDocumentById(documentId);
  if (!document || document.doc_type !== "richtext") throw new Error("Document not found.");

  const shares = await listDocumentShares(documentId);
  if (!canEditDocumentContent(user, document, shares)) throw new PortalForbiddenError();

  const nextVersion = document.current_version + 1;
  await addRichTextSnapshot({
    versionId: crypto.randomUUID(),
    documentId,
    version: nextVersion,
    createdByUserId: user.id,
    html,
    text,
  });
  await updateDocumentStatus(documentId, "In Review");

  const { env } = await getCloudflareContext({ async: true });
  await env.DOCUMENT_ROOM.getByName(documentId).lock();

  revalidatePath(`/portal/documents/file/${documentId}`);
}

// A Founding Operator or the uploader can send a Rejected document back to
// Draft for another attempt.
export async function reopenForEditingAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const documentId = String(formData.get("documentId") ?? "");
  const document = await getDocumentById(documentId);
  if (!document) throw new Error("Document not found.");
  const shares = await listDocumentShares(documentId);
  const canReopen =
    document.uploader_user_id === user.id || user.tier === "Founding Operator" || canEditDocumentContent(user, document, shares);
  if (!canReopen) throw new PortalForbiddenError();

  await updateDocumentStatus(documentId, "Draft");

  if (document.doc_type === "richtext") {
    const { env } = await getCloudflareContext({ async: true });
    await env.DOCUMENT_ROOM.getByName(documentId).unlock();
  }

  revalidatePath(`/portal/documents/file/${documentId}`);
}

export async function decideApprovalAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");
  if (!canApproveDocuments(user)) throw new PortalForbiddenError();

  const documentId = String(formData.get("documentId") ?? "");
  const decision = String(formData.get("decision") ?? "");
  const note = String(formData.get("note") ?? "").trim() || null;
  if (decision !== "Approved" && decision !== "Rejected") throw new Error("Invalid decision.");

  const document = await getDocumentById(documentId);
  if (!document) throw new Error("Document not found.");
  const shares = await listDocumentShares(documentId);
  if (!canViewDocument(user, document, shares)) throw new PortalForbiddenError();

  await addApproval({
    id: crypto.randomUUID(),
    documentId,
    documentVersion: document.current_version,
    approverUserId: user.id,
    decision,
    note,
  });

  revalidatePath(`/portal/documents/file/${documentId}`);
}

export async function addCommentAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const documentId = String(formData.get("documentId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!body) throw new Error("Comment can't be empty.");

  const document = await getDocumentById(documentId);
  if (!document) throw new Error("Document not found.");
  const shares = await listDocumentShares(documentId);
  if (!canViewDocument(user, document, shares)) throw new PortalForbiddenError();

  await addComment({ id: crypto.randomUUID(), documentId, authorUserId: user.id, body });
  revalidatePath(`/portal/documents/file/${documentId}`);
}

// --- Sharing -------------------------------------------------------------

export async function shareDocumentAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const documentId = String(formData.get("documentId") ?? "");
  const email = String(formData.get("email") ?? "").trim();
  const permissionRaw = String(formData.get("permission") ?? "");
  const permission: SharePermission = permissionRaw === "Edit" ? "Edit" : "View";
  if (!email) throw new Error("An email address is required.");

  const document = await getDocumentById(documentId);
  if (!document) throw new Error("Document not found.");
  if (!canManageDocumentSharing(user, document)) throw new PortalForbiddenError();

  const target = await findUserByEmail(email);
  if (!target) throw new Error(`No portal user found with email ${email}.`);
  if (target.id === user.id) throw new Error("You already have full access to your own document.");

  await shareDocument({
    id: crypto.randomUUID(),
    documentId,
    userId: target.id,
    permission,
    sharedByUserId: user.id,
  });

  revalidatePath(`/portal/documents/file/${documentId}`);
}

export async function revokeShareAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const documentId = String(formData.get("documentId") ?? "");
  const userId = String(formData.get("userId") ?? "");

  const document = await getDocumentById(documentId);
  if (!document) throw new Error("Document not found.");
  if (!canManageDocumentSharing(user, document)) throw new PortalForbiddenError();

  await revokeDocumentShare(documentId, userId);
  revalidatePath(`/portal/documents/file/${documentId}`);
}
