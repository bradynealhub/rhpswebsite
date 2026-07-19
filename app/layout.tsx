import type { Metadata } from "next";
import { Merriweather, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["italic"],
  variable: "--font-source-serif",
  display: "swap",
});

// Without this, OpenNext's Cloudflare adapter treats fully-static pages as
// "SSG forever" and sends a 1-year CDN cache-control header with no
// deploy-time invalidation configured (that needs a Cloudflare API token
// with cache-purge permission we don't have wired up yet) — meaning every
// deploy could silently serve stale content at the edge for up to a year.
// A short revalidate window bounds staleness to this many seconds instead.
export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    default: "RHPS | Rural Healthcare's Funding Problem and Delivery Problem, Solved Together",
    template: "%s | RHPS",
  },
};

// SiteHeader/SiteFooter live in app/(marketing)/layout.tsx, not here, so
// the portal (app/portal/**, outside that route group) never gets the
// marketing chrome. Tried gating on pathname via headers() first, but any
// dynamic API in the root layout forces every page under it into
// server-rendered mode, killing static generation site-wide -- the route
// group keeps the marketing pages statically eligible.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${sourceSans.variable} ${sourceSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
