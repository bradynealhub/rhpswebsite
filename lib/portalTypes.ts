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
  created_at: string;
  updated_at: string;
};

// Denormalized read shape (opportunities JOIN portal_users) for list/detail
// views that need to show the owner's name without a second round trip.
export type OpportunityWithOwner = Opportunity & { owner_name: string; owner_email: string };

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

export type DocType = "richtext" | "file";
export type DocumentStatus = "Draft" | "In Review" | "Approved" | "Rejected";

export type PortalDocument = {
  id: string;
  title: string;
  description: string | null;
  doc_type: DocType;
  status: DocumentStatus;
  uploader_user_id: string;
  current_version: number;
  folder_id: string | null;
  created_at: string;
  updated_at: string;
};

export type DocumentWithUploader = PortalDocument & { uploader_name: string };

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
