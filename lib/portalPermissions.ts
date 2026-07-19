import type { PortalUser } from "./portalTypes";

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
