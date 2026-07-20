-- Migration number: 0005 	 2026-07-20T16:59:51.000Z
--
-- Adds a CRM layer the portal didn't have: companies (organizations),
-- contacts (people at those organizations), and leads (inbound inquiries --
-- most immediately, the public-site contact form). A lead is deliberately
-- NOT an opportunity: it's unqualified, has no owner or funder attached
-- yet, and its only required content is "who reached out and what did they
-- say." Someone triages it (claim, mark Contacted/Qualified/Disqualified)
-- and only when it's worth pursuing does it convert into a real
-- opportunity -- see convertLeadToOpportunity in lib/portalDb.ts.
--
-- companies/contacts are shared, normalized records (not denormalized onto
-- leads/opportunities) so the same hospital or program officer can be
-- reattached across multiple leads and opportunities over time rather than
-- re-typed -- the same reasoning the 0004 opportunity redesign applied to
-- funder/program_name.

CREATE TABLE companies (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  website     TEXT,
  notes       TEXT,
  created_at  TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at  TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
-- Case-insensitive lookup for find-or-create on submission, not a uniqueness
-- guarantee (two real organizations can legitimately share a display name).
CREATE INDEX idx_companies_name ON companies(name COLLATE NOCASE);

CREATE TABLE contacts (
  id          TEXT PRIMARY KEY,
  company_id  TEXT REFERENCES companies(id),
  name        TEXT NOT NULL,
  title       TEXT,
  email       TEXT,
  phone       TEXT,
  notes       TEXT,
  created_at  TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at  TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_contacts_company ON contacts(company_id);
-- Find-or-create dedupe key when a new inbound message reuses an email
-- already on file.
CREATE INDEX idx_contacts_email ON contacts(email COLLATE NOCASE);

CREATE TABLE leads (
  id                        TEXT PRIMARY KEY,
  contact_id                TEXT NOT NULL REFERENCES contacts(id),
  status                    TEXT NOT NULL DEFAULT 'New'
                               CHECK (status IN ('New', 'Contacted', 'Qualified', 'Disqualified', 'Converted')),
  source                    TEXT NOT NULL DEFAULT 'Website contact form',
  -- The role/path the person self-selected (or typed) on the contact form
  -- pathfinder, e.g. "Rural health system or hospital" -- kept verbatim,
  -- not an enum, since the form already lets people type their own.
  inquiry_role              TEXT,
  -- The inbound message itself, preserved as-submitted (read-only in the
  -- UI) -- `notes` below is for the founder's own working notes, kept
  -- separate so the two never get confused.
  message                   TEXT NOT NULL,
  owner_user_id             TEXT REFERENCES portal_users(id),
  notes                     TEXT,
  disqualify_reason         TEXT,
  converted_opportunity_id  TEXT REFERENCES opportunities(id),
  created_at                TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at                TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_leads_contact ON leads(contact_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_owner ON leads(owner_user_id);

-- Opportunities gain the same company/contact attachment leads have, plus a
-- lineage pointer back to the lead that spawned them (NULL for
-- directly-created opportunities, e.g. a grant a founder identifies
-- without an inbound inquiry).
ALTER TABLE opportunities ADD COLUMN company_id TEXT REFERENCES companies(id);
ALTER TABLE opportunities ADD COLUMN contact_id TEXT REFERENCES contacts(id);
ALTER TABLE opportunities ADD COLUMN source_lead_id TEXT REFERENCES leads(id);
CREATE INDEX idx_opportunities_company ON opportunities(company_id);
