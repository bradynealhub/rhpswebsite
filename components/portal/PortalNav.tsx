"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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

export function PortalNav({
  user,
  newLeadsCount = 0,
}: {
  user: Pick<PortalUser, "email" | "name" | "is_platform_admin" | "tier">;
  newLeadsCount?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // Nav visibility only -- the real check is server-side in
  // app/portal/api/scout/sso/route.ts. See lib/scoutSso.ts's header comment.
  const canOpenScout = user.tier === "Founding Operator" || Boolean(user.is_platform_admin);

  async function handleLogout() {
    await fetch("/portal/api/auth/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <header style={{ borderBottom: "1px solid var(--color-divider)" }}>
      <div className="nav mx-auto max-w-6xl px-6 py-3">
        <Link href="/portal" className="flex items-center gap-2" style={{ marginRight: "8px" }}>
          <Image src="/images/brand/rhps-logo.png" alt="RHPS" width={160} height={64} className="h-9 w-auto" priority />
          <span className="nav-brand" style={{ fontSize: "16px" }}>
            RHPS
          </span>
        </Link>
        <span className="tag tag-outline">Portal</span>

        <nav aria-label="Portal" className="flex items-center gap-5" style={{ marginLeft: "20px" }}>
          <Link href="/portal/leads" className={`nav-link ${pathname?.startsWith("/portal/leads") ? "on" : ""}`}>
            Leads
            {newLeadsCount > 0 ? <span className="tag tag-accent-2">{newLeadsCount}</span> : null}
          </Link>
          <Link
            href="/portal/opportunities"
            className={`nav-link ${pathname?.startsWith("/portal/opportunities") ? "on" : ""}`}
          >
            Opportunities
          </Link>
          <Link href="/portal/documents" className={`nav-link ${pathname?.startsWith("/portal/documents") ? "on" : ""}`}>
            Documents
          </Link>
          {user.is_platform_admin ? (
            <Link href="/portal/admin/users" className={`nav-link ${pathname?.startsWith("/portal/admin") ? "on" : ""}`}>
              Admin
            </Link>
          ) : null}
          {canOpenScout ? (
            <a href="/portal/api/scout/sso" target="_blank" rel="noopener noreferrer" className="nav-link">
              RHT Scout &#8599;
            </a>
          ) : null}
        </nav>

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
