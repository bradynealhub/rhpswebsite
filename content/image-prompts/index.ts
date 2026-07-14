import type { PagePromptManifest } from "./types";
import { homepageImagePrompts, homepageImagePromptsMobileL2 } from "./homepage";

// Registry the generation script looks up by slug. Extend this as each
// page's prompt manifest is written (doc §4.2-4.4 for the rest of the core
// four, then §5 template assignment for the remaining 13 pages).
export const imagePromptManifests: Record<string, PagePromptManifest> = {
  homepage: homepageImagePrompts,
  "homepage-mobile": homepageImagePromptsMobileL2,
};
