export type LayerSlug = "l0" | "l1" | "l2" | "l3";

export type LayerPrompt = {
  layer: LayerSlug;
  // Written WITHOUT the standing style suffix — scripts/generate-hero-images.ts
  // appends STYLE_SUFFIX to every call, per doc §2.3.
  prompt: string;
  size: "1536x1024" | "1024x1536";
  // L0 (Atmosphere) stays opaque as the base layer. L1-L3 are generated
  // against a flat matting background (per-prompt, usually pure white) and
  // then background-removed by the pipeline to produce a transparent PNG.
  opaque: boolean;
};

export type PagePromptManifest = {
  slug: string; // matches public/images/heroes/<slug>/
  layers: LayerPrompt[];
};
