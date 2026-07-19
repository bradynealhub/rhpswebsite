import { NextResponse } from "next/server";
import { destroyCurrentSession } from "@/lib/portalSession";

export async function POST() {
  await destroyCurrentSession();
  return NextResponse.json({ ok: true });
}
