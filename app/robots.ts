import type { MetadataRoute } from "next";
import { hiddenRoutes } from "@/lib/siteConfig";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

// Belt-and-suspenders alongside each gated page's own `robots: {index:
// false}` metadata (lib/metadata.ts) — disallow crawling the hidden routes
// outright, generated from the same siteConfig list so there's one source
// of truth for what's gated.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: hiddenRoutes.map((route) => route.href),
    },
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
