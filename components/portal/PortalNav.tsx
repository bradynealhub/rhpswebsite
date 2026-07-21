"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PortalUser } from "@/lib/portalTypes";

export function PortalNav({
  user,
  newLeadsCount = 0,
}: {
  user: Pick<PortalUser, "email" | "name" | "is_platform_admin" | "tier">;
  newLeadsCount?: number;
}) {
  const router = useRouter();
  // Nav visibility only -- the real check is server-side in
  // app/portal/api/scout/sso/route.ts. See lib/scoutSso.ts's header comment.
  const canOpenScout = user.tier === "Founding Operator" || Boolean(user.is_platform_admin);

  async function handleLogout() {
    await fetch("/portal/api/auth/logout", { method: "POST" });
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <header className="border-b border-charcoal/10 bg-warmStone">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <nav aria-label="Portal" className="flex items-center gap-6">
          <Link href="/portal" className="flex items-center gap-2">
            <Image
              src="/images/brand/rhps-logo.png"
              alt="RHPS"
              width={160}
              height={64}
              className="h-10 w-auto"
              priority
            />
            <span className="font-body text-xs font-semibold uppercase tracking-wide text-charcoal/50">
              Portal
            </span>
          </Link>
          <Link href="/portal/leads" className="flex items-center gap-1.5 font-body text-sm text-charcoal hover:text-evergreen">
            Leads
            {newLeadsCount > 0 ? (
              <span className="rounded-full bg-copperAccent px-1.5 py-0.5 font-body text-xs font-semibold text-white">
                {newLeadsCount}
              </span>
            ) : null}
          </Link>
          <Link href="/portal/opportunities" className="font-body text-sm text-charcoal hover:text-evergreen">
            Opportunities
          </Link>
          <Link href="/portal/documents" className="font-body text-sm text-charcoal hover:text-evergreen">
            Documents
          </Link>
          {user.is_platform_admin ? (
            <Link href="/portal/admin/users" className="font-body text-sm text-charcoal hover:text-evergreen">
              Admin
            </Link>
          ) : null}
          {canOpenScout ? (
            <a
              href="/portal/api/scout/sso"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-charcoal hover:text-evergreen"
            >
              RHT Scout &#8599;
            </a>
          ) : null}
        </nav>
        <div className="flex items-center gap-4">
          <span className="font-body text-sm text-charcoal/70">
            {user.name} &middot; {user.email}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-charcoal/20 px-3 py-1.5 font-body text-sm text-charcoal hover:border-evergreen"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
