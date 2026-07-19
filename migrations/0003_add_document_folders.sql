-- Migration number: 0003 	 2026-07-19T18:16:20.961Z
--
-- Folders for organizing documents (both doc_type='file' uploads and
-- doc_type='richtext' live docs, once those exist) -- nestable, per
-- Brady's "sharing files and folders" request. NULL parent_folder_id means
-- top-level. documents.folder_id is nullable so a document can also sit
-- outside any folder (e.g. attached directly to an opportunity without
-- being filed anywhere).

CREATE TABLE document_folders (
  id                  TEXT PRIMARY KEY,
  name                TEXT NOT NULL,
  parent_folder_id    TEXT REFERENCES document_folders(id),
  created_by_user_id  TEXT NOT NULL REFERENCES portal_users(id),
  created_at          TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at          TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_document_folders_parent ON document_folders(parent_folder_id);

ALTER TABLE documents ADD COLUMN folder_id TEXT REFERENCES document_folders(id);
CREATE INDEX idx_documents_folder ON documents(folder_id);
