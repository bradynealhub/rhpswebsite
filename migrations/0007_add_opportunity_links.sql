-- Migration number: 0007 	 2026-07-21T02:00:00.000Z
--
-- Reference links attached to an opportunity (NOFO pages, funder portals,
-- application systems) -- the URL equivalent of opportunity_documents
-- (migration 0002), which already existed but had never been wired up to
-- any UI until now. No cap on how many of either an opportunity can carry.

CREATE TABLE opportunity_links (
  id                 TEXT PRIMARY KEY,
  opportunity_id     TEXT NOT NULL REFERENCES opportunities(id),
  url                TEXT NOT NULL,
  label              TEXT,
  created_by_user_id TEXT NOT NULL REFERENCES portal_users(id),
  created_at         TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_opportunity_links_opportunity ON opportunity_links(opportunity_id);
