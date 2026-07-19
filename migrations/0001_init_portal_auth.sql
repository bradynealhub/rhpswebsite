-- Migration number: 0001 	 2026-07-19T16:32:17.959Z
--
-- Portal auth schema. See RHPS Portal plan (~/.claude/plans/it-s-working-well-let-s-wobbly-russell.md)
-- section A for the full rationale on every design decision below.

CREATE TABLE portal_users (
  id                 TEXT PRIMARY KEY,
  email              TEXT NOT NULL UNIQUE,
  name               TEXT NOT NULL,
  -- NULL until the invite is consumed and the user sets their own password.
  password_hash      TEXT,
  tier               TEXT NOT NULL CHECK (tier IN ('Founding Operator', 'Advisory Council', 'Contributor')),
  is_platform_admin  INTEGER NOT NULL DEFAULT 0 CHECK (is_platform_admin IN (0, 1)),
  status             TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Deactivated')),
  created_at         TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updated_at         TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

-- Database-backed, not JWT: a platform admin revoking a user's access means
-- deleting their rows here, which takes effect on their very next request.
-- A bare JWT can't be revoked without a separate blocklist mechanism.
CREATE TABLE portal_sessions (
  id            TEXT PRIMARY KEY, -- opaque random token; this IS the cookie value
  user_id       TEXT NOT NULL REFERENCES portal_users(id),
  created_at    TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  expires_at    TEXT NOT NULL,
  last_seen_at  TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_portal_sessions_user_id ON portal_sessions(user_id);

-- Covers both new-account setup and admin-triggered password resets: a
-- reset is just a fresh row for an existing user_id, invalidating (leaving
-- unused, non-expired) any prior ones.
CREATE TABLE portal_invites (
  id                   TEXT PRIMARY KEY, -- opaque token; this IS the /portal/setup/[token] secret
  user_id              TEXT NOT NULL REFERENCES portal_users(id),
  created_by_user_id   TEXT NOT NULL REFERENCES portal_users(id),
  expires_at           TEXT NOT NULL,
  used_at              TEXT,
  created_at           TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);
CREATE INDEX idx_portal_invites_user_id ON portal_invites(user_id);
