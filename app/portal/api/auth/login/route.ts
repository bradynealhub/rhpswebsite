import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/passwordHash";
import { findUserByEmail } from "@/lib/portalDb";
import { createSessionForUser, setSessionCookies } from "@/lib/portalSession";

type LoginPayload = { email?: unknown; password?: unknown };

export async function POST(request: Request) {
  let body: LoginPayload;
  try {
    body = (await request.json()) as LoginPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await findUserByEmail(email);

  // Same generic error whether the account doesn't exist, was never
  // activated (no password set yet), or is deactivated -- don't leak which.
  if (!user || !user.password_hash || user.status !== "Active") {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const { token, csrfToken, expiresAt } = await createSessionForUser(user.id);
  await setSessionCookies(token, csrfToken, expiresAt);

  return NextResponse.json({ ok: true });
}
