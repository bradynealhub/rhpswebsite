"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PortalUser } from "@/lib/portalTypes";

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// Slim top bar: brand + user only. Section navigation (Documents,
// Opportunities, Leads, folders, ...) lives in the persistent left
// sidebar (PortalSidebar) -- see the app shell in app/portal/(app)/layout.tsx.
export function PortalNav({
  user,
}: {
  user: Pick<PortalUser, "email" | "name" | "is_platform_admin" | "tier">;
}) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/portal/api/auth/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <header style={{ borderBottom: "1px solid var(--color-divider)", flex: "none" }}>
      <div className="nav px-4 py-2.5">
        <Link href="/portal" className="flex items-center gap-2" style={{ marginRight: "8px" }}>
          <Image src="/images/brand/rhps-logo.png" alt="RHPS" width={160} height={64} className="h-9 w-auto" priority />
          <span className="nav-brand" style={{ fontSize: "16px" }}>
            RHPS
          </span>
        </Link>
        <span className="tag tag-outline">Portal</span>

        <div className="flex items-center gap-3" style={{ marginLeft: "auto" }}>
          <span className="text-muted" style={{ fontSize: "13px" }}>
            {user.name}
          </span>
          <button type="button" onClick={handleLogout} className="btn btn-secondary">
            Log out
          </button>
          <span className="avatar" style={{ width: "30px", height: "30px", fontSize: "12px", background: "var(--color-accent-700)" }}>
            {initialsOf(user.name)}
          </span>
        </div>
      </div>
    </header>
  );
}
