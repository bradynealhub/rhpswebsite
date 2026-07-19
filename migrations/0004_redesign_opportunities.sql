-- Migration number: 0004 	 2026-07-19T20:06:16.189Z
--
-- Redesigns opportunities to actually model a grant-pursuit pipeline
-- (informed by how open-source CRMs like Twenty/EspoCRM structure deals,
-- and by how dedicated grant-pipeline tools like Instrumentl structure
-- funding opportunities specifically -- LOI vs. proposal deadlines,
-- probability, requested vs. awarded amounts are standard fields there
-- that the original 5-field version was missing entirely). Original
-- schema conflated "the funder" with "the specific program", had exactly
-- one deadline field, no probability/forecast concept, no explicit go/
-- no-go decision record, and no activity/contact-touch history -- all
-- named gaps in the original design.
--
-- SQLite can't alter a CHECK constraint in place, so this recreates the
-- table (standard SQLite pattern) rather than a plain ALTER TABLE.

CREATE TABLE opportunities_new (
  id                          TEXT PRIMARY KEY,
  title                       TEXT NOT NULL,
  funder                      TEXT NOT NULL,
  program_name                TEXT,
  -- 7 stages (the "5-7 stages with clear exit criteria" sweet spot CRM
  -- guidance converges on): a lead moves through an explicit go/no-go
  -- decision before real effort is spent, then LOI/proposal work, then a
  -- funder decision. No-Go is distinct from Declined: one is our call,
  -- the other is the funder's.
  stage                       TEXT NOT NULL DEFAULT 'Identified'
                                CHECK (stage IN ('Identified', 'Qualifying', 'Pursuing', 'Submitted', 'Awarded', 'Declined', 'No-Go')),
  owner_user_id               TEXT NOT NULL REFERENCES portal_users(id),
  probability                 INTEGER CHECK (probability IS NULL OR (probability >= 0 AND probability <= 100)),
  amount_requested_cents      INTEGER,
  amount_awarded_cents        INTEGER,
  loi_deadline                TEXT,
  submission_deadline         TEXT,
  decision_date                TEXT,
  award_start_date            TEXT,
  go_no_go_decided_at         TEXT,
  go_no_go_decided_by_user_id TEXT REFERENCES portal_users(id),
  go_no_go_notes              TEXT,
  notes                       TEXT,
  created_at                  TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at                  TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

INSERT INTO opportunities_new (
  id, title, funder, stage, owner_user_id, amount_requested_cents, submission_deadline, notes, created_at, updated_at
)
SELECT
  id, title, funder,
  CASE stage
    WHEN 'Won' THEN 'Awarded'
    WHEN 'Lost' THEN 'Declined'
    ELSE stage
  END,
  owner_user_id, amount_cents, deadline, notes, created_at, updated_at
FROM opportunities;

DROP TABLE opportunities;
ALTER TABLE opportunities_new RENAME TO opportunities;

CREATE INDEX idx_opportunities_owner ON opportunities(owner_user_id);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);

-- CRM-standard "log every touch" pattern (EspoCRM/Twenty et al: calls,
-- emails, meetings, tasks against a deal) -- the activity/relationship
-- history the original design had no way to record at all.
CREATE TABLE opportunity_activities (
  id                TEXT PRIMARY KEY,
  opportunity_id    TEXT NOT NULL REFERENCES opportunities(id),
  author_user_id    TEXT NOT NULL REFERENCES portal_users(id),
  activity_type     TEXT NOT NULL CHECK (activity_type IN ('Note', 'Call', 'Email', 'Meeting', 'Task')),
  body              TEXT NOT NULL,
  due_date          TEXT,
  completed         INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0, 1)),
  created_at        TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_opportunity_activities_opportunity ON opportunity_activities(opportunity_id);
