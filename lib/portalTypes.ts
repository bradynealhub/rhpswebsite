// Shared portal types. Tier vocabulary matches content/ourPeople.ts's
// existing public-site roster tiers, reused here for consistency (see plan,
// section A).
export type PortalTier = "Founding Operator" | "Advisory Council" | "Contributor";
export type PortalUserStatus = "Active" | "Deactivated";

export type PortalUser = {
  id: string;
  email: string;
  name: string;
  password_hash: string | null;
  tier: PortalTier;
  is_platform_admin: 0 | 1;
  status: PortalUserStatus;
  created_at: string;
  updated_at: string;
};

export type PortalSession = {
  id: string;
  user_id: string;
  created_at: string;
  expires_at: string;
  last_seen_at: string;
};

export type PortalInvite = {
  id: string;
  user_id: string;
  created_by_user_id: string;
  expires_at: string;
  used_at: string | null;
  created_at: string;
};

// 7-stage grant pipeline (see migrations/0004_redesign_opportunities.sql
// for the rationale): a go/no-go decision point before proposal effort is
// spent, LOI vs. submission deadlines tracked separately, and No-Go (our
// call) kept distinct from Declined (the funder's call).
export type OpportunityStage = "Identified" | "Qualifying" | "Pursuing" | "Submitted" | "Awarded" | "Declined" | "No-Go";

export type Opportunity = {
  id: string;
  title: string;
  funder: string;
  program_name: string | null;
  stage: OpportunityStage;
  owner_user_id: string;
  probability: number | null;
  amount_requested_cents: number | null;
  amount_awarded_cents: number | null;
  loi_deadline: string | null;
  submission_deadline: string | null;
  decision_date: string | null;
  award_start_date: string | null;
  go_no_go_decided_at: string | null;
  go_no_go_decided_by_user_id: string | null;
  go_no_go_notes: string | null;
  notes: string | null;
  company_id: string | null;
  contact_id: string | null;
  source_lead_id: string | null;
  created_at: string;
  updated_at: string;
};

// Denormalized read shape (opportunities JOIN portal_users, companies,
// contacts) for list/detail views that need owner/company/contact display
// without extra round trips.
export type OpportunityWithOwner = Opportunity & {
  owner_name: string;
  owner_email: string;
  company_name: string | null;
  contact_name: string | null;
  contact_title: string | null;
  contact_email: string | null;
  contact_phone: string | null;
};

// --- Companies & contacts (shared CRM records attached to leads and
// opportunities) -------------------------------------------------------

export type Company = {
  id: string;
  name: string;
  website: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Contact = {
  id: string;
  company_id: string | null;
  name: string;
  title: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

// --- Leads (inbound, unqualified inquiries -- most immediately, the
// public-site contact form. Deliberately a separate model from Opportunity:
// no owner, no funder, no forecast until someone triages and, if it's
// worth pursuing, converts it.) ----------------------------------------

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Disqualified" | "Converted";

export type Lead = {
  id: string;
  contact_id: string;
  status: LeadStatus;
  source: string;
  inquiry_role: string | null;
  message: string;
  owner_user_id: string | null;
  notes: string | null;
  disqualify_reason: string | null;
  converted_opportunity_id: string | null;
  created_at: string;
  updated_at: string;
};

// Denormalized read shape (leads JOIN contacts JOIN companies, LEFT JOIN
// owner) for list/detail views.
export type LeadWithDetails = Lead & {
  contact_name: string;
  contact_title: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  company_id: string | null;
  company_name: string | null;
  owner_name: string | null;
};

export type OpportunityActivityType = "Note" | "Call" | "Email" | "Meeting" | "Task";

export type OpportunityActivity = {
  id: string;
  opportunity_id: string;
  author_user_id: string;
  activity_type: OpportunityActivityType;
  body: string;
  due_date: string | null;
  completed: 0 | 1;
  created_at: string;
};

export type OpportunityActivityWithAuthor = OpportunityActivity & { author_name: string };

export type OpportunityLink = {
  id: string;
  opportunity_id: string;
  url: string;
  label: string | null;
  created_by_user_id: string;
  created_at: string;
};

export type OpportunityLinkWithAuthor = OpportunityLink & { created_by_name: string };

export type DocType = "richtext" | "file";
export type DocumentStatus = "Draft" | "In Review" | "Approved" | "Rejected";

// 'Shared' is the org-wide library's existing behavior (visible to every
// portal user) -- 'Private' documents are visible only to their owner,
// platform admins, and whoever they've been explicitly shared with (see
// document_shares / lib/portalPermissions.ts's getDocumentAccessLevel).
export type DocumentVisibility = "Private" | "Shared";

export type PortalDocument = {
  id: string;
  title: string;
  description: string | null;
  doc_type: DocType;
  status: DocumentStatus;
  uploader_user_id: string;
  current_version: number;
  folder_id: string | null;
  visibility: DocumentVisibility;
  created_at: string;
  updated_at: string;
};

export type DocumentWithUploader = PortalDocument & { uploader_name: string; current_mime_type: string | null };

export type DocumentFolder = {
  id: string;
  name: string;
  parent_folder_id: string | null;
  created_by_user_id: string;
  created_at: string;
  updated_at: string;
};

export type DocumentVersion = {
  id: string;
  document_id: string;
  version: number;
  created_by_user_id: string;
  created_at: string;
  r2_key: string | null;
  original_filename: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  snapshot_html: string | null;
  snapshot_text: string | null;
  yjs_state_vector: ArrayBuffer | null;
};

export type DocumentComment = {
  id: string;
  document_id: string;
  author_user_id: string;
  body: string;
  resolved: 0 | 1;
  created_at: string;
};

export type DocumentCommentWithAuthor = DocumentComment & { author_name: string };

export type DocumentApproval = {
  id: string;
  document_id: string;
  document_version: number;
  approver_user_id: string;
  decision: "Approved" | "Rejected";
  note: string | null;
  created_at: string;
};

export type DocumentApprovalWithApprover = DocumentApproval & { approver_name: string };

export type SharePermission = "View" | "Edit";

export type DocumentShare = {
  id: string;
  document_id: string;
  user_id: string;
  permission: SharePermission;
  shared_by_user_id: string;
  created_at: string;
};

export type DocumentShareWithUser = DocumentShare & { user_name: string; user_email: string };
