import { NextResponse } from "next/server";
import { createScoutSsoToken } from "@/lib/scoutSso";
import { getCurrentUser } from "@/lib/portalSession";

const SCOUT_URL = "https://rhtpscout.com";

// Only Founding Operators and platform admins get an RHT Scout link -- see
// components/portal/PortalNav.tsx, which only renders the link for those
// users, and this server-side check, which is the actual enforcement (the
// nav link hiding is UX, not security).
export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.redirect(new URL("/portal/login", request.url));

  if (user.tier !== "Founding Operator" && !user.is_platform_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const token = await createScoutSsoToken({ email: user.email, name: user.name });
  return NextResponse.redirect(`${SCOUT_URL}/sso?token=${encodeURIComponent(token)}`);
}
