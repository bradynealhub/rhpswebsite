import type { MetadataRoute } from "next";
import { allVisibleRoutes } from "@/lib/siteConfig";

// Built from siteConfig's visible routes only — the two gated routes
// (Our People, Behavioral Health) are never in allVisibleRoutes, so they
// never appear here regardless of what pages exist under app/.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return allVisibleRoutes.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
