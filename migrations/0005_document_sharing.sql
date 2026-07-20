-- Migration number: 0005 	 2026-07-20T17:00:00.000Z
--
-- Private documents + selective sharing. Every document already has an
-- owner (uploader_user_id); this adds a visibility switch and an explicit
-- grant list so a document can be kept private to its owner and then
-- shared with specific platform users instead of being visible to
-- everyone by default.
--
-- Default 'Shared' preserves the existing behavior for every document
-- already in the table (the org-wide grant/document library) -- nothing
-- already filed there becomes invisible to anyone. New documents choose
-- their own visibility at creation time (see NewPrivateDocumentForm /
-- DocumentUploadForm's visibility field); private documents created going
-- forward default to 'Private' and are only reachable via the "My
-- Documents" area, never the shared folder browser.
ALTER TABLE documents ADD COLUMN visibility TEXT NOT NULL DEFAULT 'Shared' CHECK (visibility IN ('Private', 'Shared'));

-- One row per (document, user) grant. 'Edit' can co-author (live edit a
-- richtext doc, upload new file versions, submit for review); 'View' can
-- open and comment but not change content -- enforced server-side both in
-- the Server Actions (lib/portalPermissions.ts's getDocumentAccessLevel)
-- and, for the live collaborative editor, per-connection in
-- documentRoom.ts (a 'View' grant still gets the full WebSocket sync feed,
-- its own outgoing edits are just never applied).
CREATE TABLE document_shares (
  id                 TEXT PRIMARY KEY,
  document_id        TEXT NOT NULL REFERENCES documents(id),
  user_id            TEXT NOT NULL REFERENCES portal_users(id),
  permission         TEXT NOT NULL CHECK (permission IN ('View', 'Edit')),
  shared_by_user_id  TEXT NOT NULL REFERENCES portal_users(id),
  created_at         TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  UNIQUE (document_id, user_id)
);
CREATE INDEX idx_document_shares_document ON document_shares(document_id);
CREATE INDEX idx_document_shares_user ON document_shares(user_id);
