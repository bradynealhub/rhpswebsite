import Link from "next/link";
import { primaryNav, siteName, siteTagline } from "@/lib/siteConfig";

export function SiteFooter() {
  return (
    <footer className="border-t border-charcoal/10 bg-charcoal text-warmStone">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <p className="font-headline text-lg font-bold">{siteName}</p>
        <p className="mt-1 font-body text-sm text-warmStone/70">
          {siteTagline}
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {primaryNav.map((group) => (
            <div key={group.label}>
              <p className="font-body text-sm font-semibold uppercase tracking-wide text-mistBlue">
                {group.label}
              </p>
              <ul className="mt-3 space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-warmStone/80 hover:text-warmStone"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <p className="font-body text-xs text-warmStone/50">
            &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <Link
            href="/portal/login"
            className="font-body text-xs text-warmStone/50 hover:text-warmStone"
          >
            Portal Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
