import type { PagePromptManifest } from "./types";

// Transcribed verbatim from RHPS_Frontier_Visual_System_and_Image_Prompt_Guide.docx
// §4.1 Homepage: "Two Paths, Becoming One, Reaching Many" (radial template).
export const homepageImagePrompts: PagePromptManifest = {
  slug: "homepage",
  layers: [
    {
      layer: "l0",
      opaque: true,
      size: "1536x1024",
      prompt:
        "A soft, wide gradient wash blending pale hazy mist blue-grey at the top into warm stone beige at the bottom, like early morning fog lifting off open plains at dawn. Completely abstract: no horizon line, no objects, no silhouettes, no texture beyond the gradient itself. Extremely smooth, calm, and spacious, evoking distance and openness rather than any specific place. Institutional and quiet, not decorative.",
    },
    {
      layer: "l1",
      opaque: false,
      size: "1536x1024",
      prompt:
        "A single horizontal band of gently overlapping hill silhouettes near the bottom third of the frame, rendered as smooth, flat, abstract gradient shapes in deep evergreen forest green fading lighter toward the horizon. Minimalist topographic illustration style, no literal buildings, farms, crops, roads, or texture inside the shapes, just clean overlapping curved silhouettes suggesting distance and layered elevation. Set against a flat pure white background so the shape can be cleanly extracted.",
    },
    {
      layer: "l2",
      opaque: false,
      size: "1536x1024",
      prompt:
        "Two separate smooth ribbon-like paths rising from the bottom two corners of the frame, one in muted slate blue-navy and one in deep evergreen forest green, each curving gracefully inward and upward until they meet and merge into a single unified path a little past the vertical center. From that merge point, the now-single path continues upward and then fans out into five or six thin radiating lines that spread toward the top edge of the frame like the paths in a route map, each ending in a small soft circle. One of the radiating lines and its end-circle is rendered in warm burnished copper-terracotta as the single accent; every other line stays in the blue or green tones. Flat vector illustration, clean and precise linework, generous negative space, no ground plane, no other objects. Set against a flat pure white background so the shape can be cleanly extracted.",
    },
    {
      layer: "l3",
      opaque: false,
      size: "1536x1024",
      prompt:
        "A sparse scatter of small circular nodes of varying sizes, roughly eight to twelve, loosely clustered in the upper right portion of an otherwise empty frame, connected to nothing, in muted slate blue-navy and deep evergreen forest green with one or two in warm burnished copper-terracotta. Extremely minimal, like a faint constellation or a data-visualization scatter plot. No lines connecting them in this layer (the connecting lines live in L2). Set against a flat pure white background so the shapes can be cleanly extracted.",
    },
  ],
};

// Mobile note (doc §4.1): a separate 1024x1536 portrait variant of L2 only,
// merge point moved lower, only two or three radiating lines instead of
// five or six. Generated as a distinct manifest so the pipeline can target
// it independently once the desktop set is approved.
export const homepageImagePromptsMobileL2: PagePromptManifest = {
  slug: "homepage-mobile",
  layers: [
    {
      layer: "l2",
      opaque: false,
      size: "1024x1536",
      prompt:
        "Two separate smooth ribbon-like paths rising from the bottom two corners of the frame, one in muted slate blue-navy and one in deep evergreen forest green, each curving gracefully inward and upward until they meet and merge into a single unified path in the lower half of the frame. From that merge point, the now-single path continues upward and then fans out into only two or three thin radiating lines that spread toward the top edge of the frame like the paths in a route map, each ending in a small soft circle. One of the radiating lines and its end-circle is rendered in warm burnished copper-terracotta as the single accent; the other line(s) stay in the blue or green tones. Flat vector illustration, clean and precise linework, generous negative space, no ground plane, no other objects, deliberately sparse for a narrow vertical frame. Set against a flat pure white background so the shape can be cleanly extracted.",
    },
  ],
};
