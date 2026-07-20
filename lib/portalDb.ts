import { getCloudflareContext } from "@opennextjs/cloudflare";
import type {
  DocumentApprovalWithApprover,
  DocumentCommentWithAuthor,
  DocumentFolder,
  DocumentShareWithUser,
  DocumentStatus,
  DocumentVersion,
  DocumentVisibility,
  DocumentWithUploader,
  MyDocument,
  OpportunityActivityType,
  OpportunityActivityWithAuthor,
  OpportunityStage,
  OpportunityWithOwner,
  PortalInvite,
  PortalTier,
  PortalUser,
  SharePermission,
} from "./portalTypes";

export async function getPortalDb(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  return env.PORTAL_DB;
}

export async function findUserByEmail(email: string): Promise<PortalUser | null> {
  const db = await getPortalDb();
  const row = await db
    .prepare("SELECT * FROM portal_users WHERE email = ?")
    .bind(email.trim().toLowerCase())
    .first<PortalUser>();
  return row ?? null;
}

export async function findUserById(id: string): Promise<PortalUser | null> {
  const db = await getPortalDb();
  const row = await db.prepare("SELECT * FROM portal_users WHERE id = ?").bind(id).first<PortalUser>();
  return row ?? null;
}

export async function listUsers(): Promise<PortalUser[]> {
  const db = await getPortalDb();
  const { results } = await db.prepare("SELECT * FROM portal_users ORDER BY created_at ASC").all<PortalUser>();
  return results;
}

export async function createUser(input: {
  id: string;
  email: string;
  name: string;
  tier: PortalTier;
  isPlatformAdmin: boolean;
  passwordHash?: string | null;
}): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare(
      `INSERT INTO portal_users (id, email, name, password_hash, tier, is_platform_admin, status)
       VALUES (?, ?, ?, ?, ?, ?, 'Active')`,
    )
    .bind(
      input.id,
      input.email.trim().toLowerCase(),
      input.name,
      input.passwordHash ?? null,
      input.tier,
      input.isPlatformAdmin ? 1 : 0,
    )
    .run();
}

export async function setUserPasswordAndConsumeInvite(userId: string, inviteId: string, passwordHash: string): Promise<void> {
  const db = await getPortalDb();
  await db.batch([
    db
      .prepare("UPDATE portal_users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
      .bind(passwordHash, userId),
    db.prepare("UPDATE portal_invites SET used_at = CURRENT_TIMESTAMP WHERE id = ?").bind(inviteId),
  ]);
}

export async function setUserStatus(userId: string, status: "Active" | "Deactivated"): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare("UPDATE portal_users SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(status, userId)
    .run();
}

export async function createInvite(input: {
  id: string;
  userId: string;
  createdByUserId: string;
  expiresAt: string;
}): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare(
      `INSERT INTO portal_invites (id, user_id, created_by_user_id, expires_at)
       VALUES (?, ?, ?, ?)`,
    )
    .bind(input.id, input.userId, input.createdByUserId, input.expiresAt)
    .run();
}

export async function findValidInvite(inviteId: string): Promise<PortalInvite | null> {
  const db = await getPortalDb();
  const row = await db
    .prepare(
      `SELECT * FROM portal_invites
       WHERE id = ? AND used_at IS NULL AND expires_at > CURRENT_TIMESTAMP`,
    )
    .bind(inviteId)
    .first<PortalInvite>();
  return row ?? null;
}

const OPPORTUNITY_WITH_OWNER_SELECT = `
  SELECT opportunities.*, portal_users.name AS owner_name, portal_users.email AS owner_email
  FROM opportunities
  JOIN portal_users ON portal_users.id = opportunities.owner_user_id
`;

export async function listOpportunities(): Promise<OpportunityWithOwner[]> {
  const db = await getPortalDb();
  const { results } = await db
    .prepare(`${OPPORTUNITY_WITH_OWNER_SELECT} ORDER BY opportunities.created_at DESC`)
    .all<OpportunityWithOwner>();
  return results;
}

export async function getOpportunityById(id: string): Promise<OpportunityWithOwner | null> {
  const db = await getPortalDb();
  const row = await db
    .prepare(`${OPPORTUNITY_WITH_OWNER_SELECT} WHERE opportunities.id = ?`)
    .bind(id)
    .first<OpportunityWithOwner>();
  return row ?? null;
}

export type OpportunityInput = {
  title: string;
  funder: string;
  programName: string | null;
  stage: OpportunityStage;
  ownerUserId: string;
  probability: number | null;
  amountRequestedCents: number | null;
  amountAwardedCents: number | null;
  loiDeadline: string | null;
  submissionDeadline: string | null;
  decisionDate: string | null;
  awardStartDate: string | null;
  notes: string | null;
};

export async function createOpportunity(input: OpportunityInput & { id: string }): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare(
      `INSERT INTO opportunities (
         id, title, funder, program_name, stage, owner_user_id, probability,
         amount_requested_cents, amount_awarded_cents, loi_deadline, submission_deadline,
         decision_date, award_start_date, notes
       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      input.id,
      input.title,
      input.funder,
      input.programName,
      input.stage,
      input.ownerUserId,
      input.probability,
      input.amountRequestedCents,
      input.amountAwardedCents,
      input.loiDeadline,
      input.submissionDeadline,
      input.decisionDate,
      input.awardStartDate,
      input.notes,
    )
    .run();
}

export async function updateOpportunity(id: string, input: OpportunityInput): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare(
      `UPDATE opportunities
       SET title = ?, funder = ?, program_name = ?, stage = ?, owner_user_id = ?, probability = ?,
           amount_requested_cents = ?, amount_awarded_cents = ?, loi_deadline = ?, submission_deadline = ?,
           decision_date = ?, award_start_date = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
    )
    .bind(
      input.title,
      input.funder,
      input.programName,
      input.stage,
      input.ownerUserId,
      input.probability,
      input.amountRequestedCents,
      input.amountAwardedCents,
      input.loiDeadline,
      input.submissionDeadline,
      input.decisionDate,
      input.awardStartDate,
      input.notes,
      id,
    )
    .run();
}

// Records the explicit go/no-go call as its own event (who, when, why) --
// separate from a plain stage change so that reasoning survives even if
// the opportunity later moves through other stages.
export async function recordGoNoGoDecision(input: {
  id: string;
  stage: "Pursuing" | "No-Go";
  decidedByUserId: string;
  notes: string | null;
}): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare(
      `UPDATE opportunities
       SET stage = ?, go_no_go_decided_at = CURRENT_TIMESTAMP, go_no_go_decided_by_user_id = ?,
           go_no_go_notes = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
    )
    .bind(input.stage, input.decidedByUserId, input.notes, input.id)
    .run();
}

export async function countOpportunitiesByStage(): Promise<Record<OpportunityStage, number>> {
  const db = await getPortalDb();
  const { results } = await db
    .prepare("SELECT stage, COUNT(*) AS count FROM opportunities GROUP BY stage")
    .all<{ stage: OpportunityStage; count: number }>();
  const counts: Record<OpportunityStage, number> = {
    Identified: 0,
    Qualifying: 0,
    Pursuing: 0,
    Submitted: 0,
    Awarded: 0,
    Declined: 0,
    "No-Go": 0,
  };
  for (const row of results) counts[row.stage] = row.count;
  return counts;
}

// --- Opportunity activities (CRM-standard touch log: notes, calls,
// emails, meetings, tasks) --------------------------------------------

export async function listOpportunityActivities(opportunityId: string): Promise<OpportunityActivityWithAuthor[]> {
  const db = await getPortalDb();
  const { results } = await db
    .prepare(
      `SELECT opportunity_activities.*, portal_users.name AS author_name
       FROM opportunity_activities
       JOIN portal_users ON portal_users.id = opportunity_activities.author_user_id
       WHERE opportunity_activities.opportunity_id = ?
       ORDER BY opportunity_activities.created_at DESC`,
    )
    .bind(opportunityId)
    .all<OpportunityActivityWithAuthor>();
  return results;
}

export async function addOpportunityActivity(input: {
  id: string;
  opportunityId: string;
  authorUserId: string;
  activityType: OpportunityActivityType;
  body: string;
  dueDate: string | null;
}): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare(
      `INSERT INTO opportunity_activities (id, opportunity_id, author_user_id, activity_type, body, due_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .bind(input.id, input.opportunityId, input.authorUserId, input.activityType, input.body, input.dueDate)
    .run();
}

export async function setOpportunityActivityCompleted(activityId: string, completed: boolean): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare("UPDATE opportunity_activities SET completed = ? WHERE id = ?")
    .bind(completed ? 1 : 0, activityId)
    .run();
}

// --- Folders ---------------------------------------------------------

export async function listFolders(parentFolderId: string | null): Promise<DocumentFolder[]> {
  const db = await getPortalDb();
  const { results } = await (parentFolderId
    ? db
        .prepare("SELECT * FROM document_folders WHERE parent_folder_id = ? ORDER BY name ASC")
        .bind(parentFolderId)
    : db.prepare("SELECT * FROM document_folders WHERE parent_folder_id IS NULL ORDER BY name ASC")
  ).all<DocumentFolder>();
  return results;
}

export async function getFolderById(id: string): Promise<DocumentFolder | null> {
  const db = await getPortalDb();
  const row = await db.prepare("SELECT * FROM document_folders WHERE id = ?").bind(id).first<DocumentFolder>();
  return row ?? null;
}

// Full ancestor chain, root-first, for breadcrumb rendering.
export async function getFolderPath(folderId: string): Promise<DocumentFolder[]> {
  const path: DocumentFolder[] = [];
  let current = await getFolderById(folderId);
  while (current) {
    path.unshift(current);
    current = current.parent_folder_id ? await getFolderById(current.parent_folder_id) : null;
  }
  return path;
}

export async function createFolder(input: {
  id: string;
  name: string;
  parentFolderId: string | null;
  createdByUserId: string;
}): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare(
      `INSERT INTO document_folders (id, name, parent_folder_id, created_by_user_id)
       VALUES (?, ?, ?, ?)`,
    )
    .bind(input.id, input.name, input.parentFolderId, input.createdByUserId)
    .run();
}

// --- Documents ---------------------------------------------------------

const DOCUMENT_WITH_UPLOADER_SELECT = `
  SELECT documents.*, portal_users.name AS uploader_name
  FROM documents
  JOIN portal_users ON portal_users.id = documents.uploader_user_id
`;

// Private documents always have folder_id NULL (see migrations/0005) --
// without the visibility filter, a root-level listDocuments(null) call
// would surface every user's private documents at the top of the shared
// library. This is the shared-folder-browser query only; "My Documents"
// uses listMyDocuments instead.
export async function listDocuments(folderId: string | null): Promise<DocumentWithUploader[]> {
  const db = await getPortalDb();
  const { results } = await (folderId
    ? db
        .prepare(
          `${DOCUMENT_WITH_UPLOADER_SELECT} WHERE documents.folder_id = ? AND documents.visibility = 'Shared' ORDER BY documents.created_at DESC`,
        )
        .bind(folderId)
    : db.prepare(
        `${DOCUMENT_WITH_UPLOADER_SELECT} WHERE documents.folder_id IS NULL AND documents.visibility = 'Shared' ORDER BY documents.created_at DESC`,
      )
  ).all<DocumentWithUploader>();
  return results;
}

export async function getDocumentById(id: string): Promise<DocumentWithUploader | null> {
  const db = await getPortalDb();
  const row = await db
    .prepare(`${DOCUMENT_WITH_UPLOADER_SELECT} WHERE documents.id = ?`)
    .bind(id)
    .first<DocumentWithUploader>();
  return row ?? null;
}

// Live-edited documents start with no version at all (current_version=0)
// -- unlike file uploads, a richtext document's content lives entirely in
// its DocumentRoom Durable Object until the first "submit for review"
// writes a snapshot. See plan, section B.
export async function createRichTextDocument(input: {
  id: string;
  title: string;
  description: string | null;
  uploaderUserId: string;
  folderId: string | null;
  visibility?: DocumentVisibility;
}): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare(
      `INSERT INTO documents (id, title, description, doc_type, status, uploader_user_id, current_version, folder_id, visibility)
       VALUES (?, ?, ?, 'richtext', 'Draft', ?, 0, ?, ?)`,
    )
    .bind(
      input.id,
      input.title,
      input.description,
      input.uploaderUserId,
      input.folderId,
      input.visibility ?? "Shared",
    )
    .run();
}

// Writes a frozen snapshot of the live Yjs doc's current content, taken at
// "submit for review" time. version must be current_version + 1.
export async function addRichTextSnapshot(input: {
  versionId: string;
  documentId: string;
  version: number;
  createdByUserId: string;
  html: string;
  text: string;
}): Promise<void> {
  const db = await getPortalDb();
  await db.batch([
    db
      .prepare(
        `INSERT INTO document_versions (id, document_id, version, created_by_user_id, snapshot_html, snapshot_text)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .bind(input.versionId, input.documentId, input.version, input.createdByUserId, input.html, input.text),
    db
      .prepare("UPDATE documents SET current_version = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
      .bind(input.version, input.documentId),
  ]);
}

// Creates the document row and its first version together -- a file
// document always has at least one version by construction.
export async function createFileDocument(input: {
  id: string;
  title: string;
  description: string | null;
  uploaderUserId: string;
  folderId: string | null;
  visibility?: DocumentVisibility;
  versionId: string;
  r2Key: string;
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
}): Promise<void> {
  const db = await getPortalDb();
  await db.batch([
    db
      .prepare(
        `INSERT INTO documents (id, title, description, doc_type, status, uploader_user_id, current_version, folder_id, visibility)
         VALUES (?, ?, ?, 'file', 'Draft', ?, 1, ?, ?)`,
      )
      .bind(
        input.id,
        input.title,
        input.description,
        input.uploaderUserId,
        input.folderId,
        input.visibility ?? "Shared",
      ),
    db
      .prepare(
        `INSERT INTO document_versions (id, document_id, version, created_by_user_id, r2_key, original_filename, mime_type, size_bytes)
         VALUES (?, ?, 1, ?, ?, ?, ?, ?)`,
      )
      .bind(
        input.versionId,
        input.id,
        input.uploaderUserId,
        input.r2Key,
        input.originalFilename,
        input.mimeType,
        input.sizeBytes,
      ),
  ]);
}

// Read-only -- callers that need to build an R2 key before writing (the key
// includes the version number) call this first, then addFileDocumentVersion
// with the version it returned.
export async function getNextDocumentVersionNumber(documentId: string): Promise<number> {
  const db = await getPortalDb();
  const document = await db
    .prepare("SELECT current_version FROM documents WHERE id = ?")
    .bind(documentId)
    .first<{ current_version: number }>();
  if (!document) throw new Error("Document not found.");
  return document.current_version + 1;
}

// Uploads a new version of an existing file document (e.g. a revised
// budget after review feedback). `version` must be exactly what
// getNextDocumentVersionNumber returned for this document beforehand.
export async function addFileDocumentVersion(input: {
  versionId: string;
  documentId: string;
  version: number;
  uploadedByUserId: string;
  r2Key: string;
  originalFilename: string;
  mimeType: string;
  sizeBytes: number;
}): Promise<void> {
  const db = await getPortalDb();
  await db.batch([
    db
      .prepare(
        `INSERT INTO document_versions (id, document_id, version, created_by_user_id, r2_key, original_filename, mime_type, size_bytes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        input.versionId,
        input.documentId,
        input.version,
        input.uploadedByUserId,
        input.r2Key,
        input.originalFilename,
        input.mimeType,
        input.sizeBytes,
      ),
    db
      .prepare("UPDATE documents SET current_version = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
      .bind(input.version, input.documentId),
  ]);
}

export async function listDocumentVersions(documentId: string): Promise<DocumentVersion[]> {
  const db = await getPortalDb();
  const { results } = await db
    .prepare("SELECT * FROM document_versions WHERE document_id = ? ORDER BY version DESC")
    .bind(documentId)
    .all<DocumentVersion>();
  return results;
}

export async function getDocumentVersion(documentId: string, version: number): Promise<DocumentVersion | null> {
  const db = await getPortalDb();
  const row = await db
    .prepare("SELECT * FROM document_versions WHERE document_id = ? AND version = ?")
    .bind(documentId, version)
    .first<DocumentVersion>();
  return row ?? null;
}

export async function updateDocumentStatus(documentId: string, status: DocumentStatus): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare("UPDATE documents SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
    .bind(status, documentId)
    .run();
}

// --- Comments & approvals ---------------------------------------------

export async function listComments(documentId: string): Promise<DocumentCommentWithAuthor[]> {
  const db = await getPortalDb();
  const { results } = await db
    .prepare(
      `SELECT document_comments.*, portal_users.name AS author_name
       FROM document_comments
       JOIN portal_users ON portal_users.id = document_comments.author_user_id
       WHERE document_comments.document_id = ?
       ORDER BY document_comments.created_at ASC`,
    )
    .bind(documentId)
    .all<DocumentCommentWithAuthor>();
  return results;
}

export async function addComment(input: { id: string; documentId: string; authorUserId: string; body: string }): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare(
      `INSERT INTO document_comments (id, document_id, author_user_id, body)
       VALUES (?, ?, ?, ?)`,
    )
    .bind(input.id, input.documentId, input.authorUserId, input.body)
    .run();
}

export async function listApprovals(documentId: string): Promise<DocumentApprovalWithApprover[]> {
  const db = await getPortalDb();
  const { results } = await db
    .prepare(
      `SELECT document_approvals.*, portal_users.name AS approver_name
       FROM document_approvals
       JOIN portal_users ON portal_users.id = document_approvals.approver_user_id
       WHERE document_approvals.document_id = ?
       ORDER BY document_approvals.created_at DESC`,
    )
    .bind(documentId)
    .all<DocumentApprovalWithApprover>();
  return results;
}

// Records the decision and updates the document's status together --
// approve/reject is a single atomic action from the reviewer's perspective.
export async function addApproval(input: {
  id: string;
  documentId: string;
  documentVersion: number;
  approverUserId: string;
  decision: "Approved" | "Rejected";
  note: string | null;
}): Promise<void> {
  const db = await getPortalDb();
  await db.batch([
    db
      .prepare(
        `INSERT INTO document_approvals (id, document_id, document_version, approver_user_id, decision, note)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .bind(input.id, input.documentId, input.documentVersion, input.approverUserId, input.decision, input.note),
    db
      .prepare("UPDATE documents SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?")
      .bind(input.decision, input.documentId),
  ]);
}

// --- Private documents & sharing ---------------------------------------

export async function listDocumentShares(documentId: string): Promise<DocumentShareWithUser[]> {
  const db = await getPortalDb();
  const { results } = await db
    .prepare(
      `SELECT document_shares.*, portal_users.name AS user_name, portal_users.email AS user_email
       FROM document_shares
       JOIN portal_users ON portal_users.id = document_shares.user_id
       WHERE document_shares.document_id = ?
       ORDER BY document_shares.created_at ASC`,
    )
    .bind(documentId)
    .all<DocumentShareWithUser>();
  return results;
}

// Upsert -- re-sharing with someone already on the list just changes their
// permission level rather than erroring on the UNIQUE(document_id, user_id)
// constraint.
export async function shareDocument(input: {
  id: string;
  documentId: string;
  userId: string;
  permission: SharePermission;
  sharedByUserId: string;
}): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare(
      `INSERT INTO document_shares (id, document_id, user_id, permission, shared_by_user_id)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT (document_id, user_id) DO UPDATE SET permission = excluded.permission`,
    )
    .bind(input.id, input.documentId, input.userId, input.permission, input.sharedByUserId)
    .run();
}

export async function revokeDocumentShare(documentId: string, userId: string): Promise<void> {
  const db = await getPortalDb();
  await db
    .prepare("DELETE FROM document_shares WHERE document_id = ? AND user_id = ?")
    .bind(documentId, userId)
    .run();
}

// "My Documents": private documents the viewer owns, plus private
// documents shared with them -- the two are unioned (not a single JOIN)
// because a document only needs to appear once regardless of how many
// shares reference it, and "owner" always wins over any share row that
// might also exist for the same person.
export async function listMyDocuments(userId: string): Promise<MyDocument[]> {
  const db = await getPortalDb();
  const { results } = await db
    .prepare(
      `SELECT documents.*, portal_users.name AS uploader_name, 'owner' AS access
       FROM documents
       JOIN portal_users ON portal_users.id = documents.uploader_user_id
       WHERE documents.visibility = 'Private' AND documents.uploader_user_id = ?

       UNION ALL

       SELECT documents.*, portal_users.name AS uploader_name, document_shares.permission AS access
       FROM document_shares
       JOIN documents ON documents.id = document_shares.document_id
       JOIN portal_users ON portal_users.id = documents.uploader_user_id
       WHERE document_shares.user_id = ? AND documents.uploader_user_id != ?

       ORDER BY created_at DESC`,
    )
    .bind(userId, userId, userId)
    .all<MyDocument>();
  return results;
}
