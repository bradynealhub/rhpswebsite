import { NextResponse } from "next/server";
import { Resend } from "resend";

// Default (Node.js) runtime — the OpenNext Cloudflare adapter runs the
// whole app in a single Worker via Node.js compat mode; the Vercel-specific
// "edge" runtime export isn't the right knob here.
type ContactPayload = {
  name?: unknown;
  organization?: unknown;
  role?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please email us directly instead." },
      { status: 503 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = asString(body.name);
  const organization = asString(body.organization);
  const role = asString(body.role);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const message = asString(body.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "RHPS Website <contact@rhps.health>",
      to: toEmail,
      reply_to: email,
      subject: `New RHPS contact form submission from ${name}`,
      text: [
        `Name: ${name}`,
        `Organization: ${organization}`,
        `Role: ${role}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "What they're trying to accomplish:",
        message,
      ].join("\n"),
    });
  } catch (err) {
    console.error("Resend send failed", err);
    return NextResponse.json({ error: "Failed to send your message. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
