import type { DocumentShare, PortalDocument, PortalUser } from "./portalTypes";

export class PortalForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "PortalForbiddenError";
  }
}

// Platform-admin-only actions (user management) -- an orthogonal axis from
// the content-tier table below. See plan, section A.
export function requirePlatformAdmin(user: PortalUser): void {
  if (!user.is_platform_admin) throw new PortalForbiddenError("Platform admin required.");
}

// Content permission table (plan, section A):
//   View everything            -- all tiers
//   Create/edit opportunities  -- Founding Operator (any), others (owner only)
//   Author/upload documents    -- all tiers
//   Comment                    -- all tiers
//   Approve/reject documents   -- Founding Operator, Advisory Council (not Contributor)
export function canApproveDocuments(user: PortalUser): boolean {
  return user.tier === "Founding Operator" || user.tier === "Advisory Council";
}

export function canEditOpportunity(user: PortalUser, opportunity: { owner_user_id: string }): boolean {
  if (user.tier === "Founding Operator") return true;
  return opportunity.owner_user_id === user.id;
}

// --- Document sharing ---------------------------------------------------
//
// 'Shared' documents keep the library's original all-tiers-can-engage
// behavior unchanged (everyone gets "edit" -- upload new versions, submit
// for review, comment). 'Private' documents are visible to nobody except
// the owner, platform admins, and an explicit document_shares grant --
// "view" can open/read/comment, "edit" can also co-author. This is the
// single source of truth other checks build on; see worker.ts (WebSocket
// room access) and documentRoom.ts (per-connection read-only enforcement)
// for where it's applied outside a plain Server Action.
export type DocumentAccessLevel = "none" | "view" | "edit";

export function getDocumentAccessLevel(
  user: Pick<PortalUser, "id" | "is_platform_admin">,
  document: Pick<PortalDocument, "uploader_user_id" | "visibility">,
  shares: Pick<DocumentShare, "user_id" | "permission">[],
): DocumentAccessLevel {
  if (document.uploader_user_id === user.id) return "edit";
  if (user.is_platform_admin) return "edit";
  if (document.visibility === "Shared") return "edit";

  const share = shares.find((s) => s.user_id === user.id);
  if (!share) return "none";
  return share.permission === "Edit" ? "edit" : "view";
}

export function canViewDocument(
  user: Pick<PortalUser, "id" | "is_platform_admin">,
  document: Pick<PortalDocument, "uploader_user_id" | "visibility">,
  shares: Pick<DocumentShare, "user_id" | "permission">[],
): boolean {
  return getDocumentAccessLevel(user, document, shares) !== "none";
}

export function canEditDocumentContent(
  user: Pick<PortalUser, "id" | "is_platform_admin">,
  document: Pick<PortalDocument, "uploader_user_id" | "visibility">,
  shares: Pick<DocumentShare, "user_id" | "permission">[],
): boolean {
  return getDocumentAccessLevel(user, document, shares) === "edit";
}

// Only the owner or a platform admin manages who a private document is
// shared with -- an "Edit" collaborator can co-author content but not
// change who else can see it.
export function canManageDocumentSharing(
  user: Pick<PortalUser, "id" | "is_platform_admin">,
  document: Pick<PortalDocument, "uploader_user_id">,
): boolean {
  return document.uploader_user_id === user.id || Boolean(user.is_platform_admin);
}
