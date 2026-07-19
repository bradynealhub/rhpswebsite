import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/passwordHash";
import { findValidInvite, setUserPasswordAndConsumeInvite } from "@/lib/portalDb";

type SetupPayload = { token?: unknown; password?: unknown };

const MIN_PASSWORD_LENGTH = 12;

export async function POST(request: Request) {
  let body: SetupPayload;
  try {
    body = (await request.json()) as SetupPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!token) {
    return NextResponse.json({ error: "Missing setup token." }, { status: 400 });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json(
      { error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` },
      { status: 400 },
    );
  }

  const invite = await findValidInvite(token);
  if (!invite) {
    return NextResponse.json({ error: "This setup link is invalid or has expired." }, { status: 400 });
  }

  const passwordHash = await hashPassword(password);
  await setUserPasswordAndConsumeInvite(invite.user_id, invite.id, passwordHash);

  return NextResponse.json({ ok: true });
}
