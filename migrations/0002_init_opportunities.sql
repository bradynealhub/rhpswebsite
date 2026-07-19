-- Migration number: 0002 	 2026-07-19T17:01:28.332Z
--
-- Core domain schema: opportunities (grant/funding pipeline) and documents
-- (both doc_type='file' uploads and doc_type='richtext' live-edited docs).
-- Written together, ahead of the document features themselves, so
-- opportunity_documents can carry a real foreign key to documents from the
-- start. See plan (~/.claude/plans/it-s-working-well-let-s-wobbly-russell.md)
-- sections B/C for the full rationale on every design decision below.

CREATE TABLE opportunities (
  id             TEXT PRIMARY KEY,
  title          TEXT NOT NULL,
  funder         TEXT NOT NULL,
  stage          TEXT NOT NULL DEFAULT 'Identified'
                   CHECK (stage IN ('Identified', 'Pursuing', 'Submitted', 'Won', 'Lost')),
  owner_user_id  TEXT NOT NULL REFERENCES portal_users(id),
  deadline       TEXT,
  amount_cents   INTEGER,
  notes          TEXT,
  created_at     TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at     TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_opportunities_owner ON opportunities(owner_user_id);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);

-- doc_type distinguishes Yjs-authored live documents from uploaded file
-- attachments (PDFs, spreadsheets) -- both need identical review/comment/
-- approval plumbing, so they share one table rather than two families.
-- No top-level r2_key: for 'richtext' the live state lives in the
-- DocumentRoom Durable Object (step 5); for 'file' the current file is
-- just the latest document_versions row (current_version).
CREATE TABLE documents (
  id                TEXT PRIMARY KEY,
  title             TEXT NOT NULL,
  description       TEXT,
  doc_type          TEXT NOT NULL CHECK (doc_type IN ('richtext', 'file')),
  status            TEXT NOT NULL DEFAULT 'Draft'
                       CHECK (status IN ('Draft', 'In Review', 'Approved', 'Rejected')),
  uploader_user_id  TEXT NOT NULL REFERENCES portal_users(id),
  current_version   INTEGER NOT NULL DEFAULT 0,
  created_at        TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at        TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_documents_status ON documents(status);

CREATE TABLE document_versions (
  id                  TEXT PRIMARY KEY,
  document_id         TEXT NOT NULL REFERENCES documents(id),
  version             INTEGER NOT NULL,
  created_by_user_id  TEXT NOT NULL REFERENCES portal_users(id),
  created_at          TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  -- populated when documents.doc_type = 'file':
  r2_key              TEXT,
  original_filename   TEXT,
  mime_type           TEXT,
  size_bytes          INTEGER,
  -- populated when documents.doc_type = 'richtext' (snapshot at "submit for review"):
  snapshot_html       TEXT,
  snapshot_text       TEXT,
  yjs_state_vector    BLOB,
  UNIQUE (document_id, version)
);

CREATE TABLE document_comments (
  id               TEXT PRIMARY KEY,
  document_id      TEXT NOT NULL REFERENCES documents(id),
  author_user_id   TEXT NOT NULL REFERENCES portal_users(id),
  body             TEXT NOT NULL,
  resolved         INTEGER NOT NULL DEFAULT 0 CHECK (resolved IN (0, 1)),
  created_at       TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_document_comments_document ON document_comments(document_id);

CREATE TABLE document_approvals (
  id                 TEXT PRIMARY KEY,
  document_id        TEXT NOT NULL REFERENCES documents(id),
  document_version   INTEGER NOT NULL,
  approver_user_id   TEXT NOT NULL REFERENCES portal_users(id),
  decision           TEXT NOT NULL CHECK (decision IN ('Approved', 'Rejected')),
  note               TEXT,
  created_at         TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_document_approvals_document ON document_approvals(document_id);

CREATE TABLE opportunity_documents (
  opportunity_id  TEXT NOT NULL REFERENCES opportunities(id),
  document_id     TEXT NOT NULL REFERENCES documents(id),
  created_at      TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  PRIMARY KEY (opportunity_id, document_id)
);
