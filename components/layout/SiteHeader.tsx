"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { primaryNav, siteName } from "@/lib/siteConfig";

// Nav is generated from lib/siteConfig.ts's primaryNav only, so the two
// gated pages (Our People, Behavioral Health) never surface here regardless
// of what content modules exist for them.
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-charcoal/10 bg-warmStone">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <Image
            src="/images/brand/rhps-logo.png"
            alt={siteName}
            width={260}
            height={104}
            className="h-[72px] w-auto"
            priority
          />
        </Link>

        <nav aria-label="Primary" className="hidden gap-8 md:flex">
          {primaryNav.map((group) => (
            <div key={group.label} className="group relative">
              <button
                type="button"
                className="font-body text-base font-semibold text-charcoal"
                aria-haspopup="true"
              >
                {group.label}
              </button>
              <div className="invisible absolute left-0 top-full z-20 w-72 rounded-md border border-charcoal/10 bg-white p-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded px-3 py-2 font-body text-base text-charcoal hover:bg-warmStone"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90 sm:inline-block"
          >
            Start a Conversation
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-charcoal/20 p-2 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav id="mobile-nav" aria-label="Primary (mobile)" className="border-t border-charcoal/10 bg-warmStone md:hidden">
          <div className="space-y-6 px-6 py-6">
            {primaryNav.map((group) => (
              <div key={group.label}>
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                  {group.label}
                </p>
                <ul className="mt-2 space-y-1">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded px-2 py-2 font-body text-charcoal hover:bg-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block rounded-md bg-evergreen px-4 py-3 text-center font-body text-sm font-semibold text-warmStone"
            >
              Start a Conversation
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
