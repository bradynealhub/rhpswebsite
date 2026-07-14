import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// The site is fully static (no ISR/revalidate routes), so no incremental
// cache override is configured — nothing to skip an R2 bucket for.
export default defineCloudflareConfig();
