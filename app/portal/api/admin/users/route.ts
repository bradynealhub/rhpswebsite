import { NextResponse } from "next/server";
import { createInvite, createUser, listUsers } from "@/lib/portalDb";
import { PortalForbiddenError, requirePlatformAdmin } from "@/lib/portalPermissions";
import { getCurrentUser, verifyCsrf } from "@/lib/portalSession";
import type { PortalTier } from "@/lib/portalTypes";

const VALID_TIERS: PortalTier[] = ["Founding Operator", "Advisory Council", "Contributor"];
const INVITE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function GET() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  try {
    requirePlatformAdmin(currentUser);
  } catch (err) {
    if (err instanceof PortalForbiddenError) {
      return NextResponse.json({ error: err.message }, { status: 403 });
    }
    throw err;
  }

  const users = await listUsers();
  // Never return password_hash, even to admins.
  const safeUsers = users.map(({ password_hash: _password_hash, ...rest }) => rest);
  return NextResponse.json({ users: safeUsers });
}

type CreateUserPayload = { email?: unknown; name?: unknown; tier?: unknown; isPlatformAdmin?: unknown };

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  try {
    requirePlatformAdmin(currentUser);
  } catch (err) {
    if (err instanceof PortalForbiddenError) {
      return NextResponse.json({ error: err.message }, { status: 403 });
    }
    throw err;
  }

  if (!(await verifyCsrf(request))) {
    return NextResponse.json({ error: "Invalid CSRF token." }, { status: 403 });
  }

  let body: CreateUserPayload;
  try {
    body = (await request.json()) as CreateUserPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const tier = typeof body.tier === "string" ? (body.tier as PortalTier) : undefined;
  const isPlatformAdmin = body.isPlatformAdmin === true;

  if (!email || !name || !tier || !VALID_TIERS.includes(tier)) {
    return NextResponse.json({ error: "email, name, and a valid tier are required." }, { status: 400 });
  }

  const userId = crypto.randomUUID();
  await createUser({ id: userId, email, name, tier, isPlatformAdmin });

  const inviteId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + INVITE_DURATION_MS).toISOString();
  await createInvite({ id: inviteId, userId, createdByUserId: currentUser.id, expiresAt });

  return NextResponse.json({ ok: true, setupPath: `/portal/setup/${inviteId}` });
}
