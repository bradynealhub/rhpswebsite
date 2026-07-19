import "server-only";
import { cookies } from "next/headers";
import { getPortalDb } from "./portalDb";
import type { PortalUser } from "./portalTypes";

// See RHPS Portal plan, section A, for the full rationale behind every
// decision in this file (DB-backed sessions over JWT, SameSite=Lax +
// double-submit CSRF over Strict, sliding expiry).
const SESSION_COOKIE = "portal_session";
const CSRF_COOKIE = "portal_csrf";
const CSRF_HEADER = "x-portal-csrf";

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const TOUCH_THRESHOLD_MS = 60 * 60 * 1000; // throttle last_seen_at writes to ~hourly

function randomToken(byteLength = 32): string {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const cookieBase = {
  path: "/portal",
  secure: true,
  sameSite: "lax" as const,
};

export async function createSessionForUser(
  userId: string,
): Promise<{ token: string; csrfToken: string; expiresAt: Date }> {
  const db = await getPortalDb();
  const token = randomToken();
  const csrfToken = randomToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await db
    .prepare("INSERT INTO portal_sessions (id, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(token, userId, expiresAt.toISOString())
    .run();

  return { token, csrfToken, expiresAt };
}

export async function setSessionCookies(token: string, csrfToken: string, expiresAt: Date): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, { ...cookieBase, httpOnly: true, expires: expiresAt });
  // Deliberately NOT httpOnly -- the double-submit CSRF pattern requires
  // client-side JS to read this value and echo it back in a request header.
  jar.set(CSRF_COOKIE, csrfToken, { ...cookieBase, httpOnly: false, expires: expiresAt });
}

export async function clearSessionCookies(): Promise<void> {
  const jar = await cookies();
  jar.delete({ name: SESSION_COOKIE, path: "/portal" });
  jar.delete({ name: CSRF_COOKIE, path: "/portal" });
}

// Reads the session cookie, validates it against portal_sessions +
// portal_users, and does a throttled sliding-expiry touch. Returns null for
// any invalid/expired/deactivated case -- callers redirect to /portal/login.
export async function getCurrentUser(): Promise<PortalUser | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const db = await getPortalDb();
  const row = await db
    .prepare(
      `SELECT portal_users.*, portal_sessions.expires_at AS session_expires_at,
              portal_sessions.last_seen_at AS session_last_seen_at
       FROM portal_sessions
       JOIN portal_users ON portal_users.id = portal_sessions.user_id
       WHERE portal_sessions.id = ?`,
    )
    .bind(token)
    .first<PortalUser & { session_expires_at: string; session_last_seen_at: string }>();

  if (!row) return null;
  if (new Date(row.session_expires_at).getTime() <= Date.now()) return null;
  if (row.status !== "Active") return null;

  const lastSeen = new Date(row.session_last_seen_at).getTime();
  if (Date.now() - lastSeen > TOUCH_THRESHOLD_MS) {
    const newExpiresAt = new Date(Date.now() + SESSION_DURATION_MS).toISOString();
    await db
      .prepare("UPDATE portal_sessions SET last_seen_at = CURRENT_TIMESTAMP, expires_at = ? WHERE id = ?")
      .bind(newExpiresAt, token)
      .run();
  }

  const { session_expires_at: _a, session_last_seen_at: _b, ...user } = row;
  return user;
}

export async function destroyCurrentSession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    const db = await getPortalDb();
    await db.prepare("DELETE FROM portal_sessions WHERE id = ?").bind(token).run();
  }
  await clearSessionCookies();
}

// Used by platform-admin "revoke access" / "reset password" flows -- logs a
// user out everywhere immediately, which is the entire point of database-
// backed sessions over a bare JWT.
export async function destroyAllSessionsForUser(userId: string): Promise<void> {
  const db = await getPortalDb();
  await db.prepare("DELETE FROM portal_sessions WHERE user_id = ?").bind(userId).run();
}

// Double-submit CSRF check for mutating routes: the cookie (readable by
// client JS, not httpOnly) must match a header the client echoes it into.
// SameSite=Lax alone doesn't fully close CSRF on state-changing requests
// (see plan, section A) -- this is the primary defense for those.
export async function verifyCsrf(request: Request): Promise<boolean> {
  const jar = await cookies();
  const cookieValue = jar.get(CSRF_COOKIE)?.value;
  const headerValue = request.headers.get(CSRF_HEADER);
  if (!cookieValue || !headerValue) return false;
  return cookieValue === headerValue;
}
