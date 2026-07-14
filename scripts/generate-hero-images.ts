#!/usr/bin/env tsx
/**
 * Generates the L0-L3 parallax hero layers for one or more pages via the
 * OpenAI image API, then background-removes L1-L3 (gpt-image doesn't
 * natively output transparent PNGs — see visual guide §2.2) so they can be
 * composited by <ParallaxHero>.
 *
 * Usage:
 *   npm run generate:images -- homepage
 *   npm run generate:images -- homepage --force                 # redo, reusing cached raw source if present
 *   npm run generate:images -- homepage --force --regenerate    # redo, calling OpenAI again too
 *   npm run generate:images -- homepage --force --only=l1,l2    # redo only specific layers
 *   npm run generate:images -- homepage --dry-run
 *
 * Requires OPENAI_API_KEY in .env.local (never committed) and `rembg`
 * Non-opaque layers (L1-L3) keep their pre-matte "<layer>.raw.png" next to
 * the final PNG, so --force can re-run just the matting step (scripts/
 * matte.py, a white chroma-key, not an ML model) without paying for a new
 * OpenAI call — pass --regenerate to force a fresh API call regardless.
 */
import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { imagePromptManifests } from "../content/image-prompts";
import { STYLE_SUFFIX } from "../content/image-prompts/styleSuffix";
import type { LayerPrompt } from "../content/image-prompts/types";

const execFileAsync = promisify(execFile);

const ROOT = path.resolve(__dirname, "..");
const HEROES_DIR = path.join(ROOT, "public", "images", "heroes");

function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

async function checkMattingAvailable(): Promise<boolean> {
  try {
    await execFileAsync("python3", ["-c", "import numpy, PIL"]);
    return true;
  } catch {
    return false;
  }
}

async function generateLayerImage(
  prompt: string,
  size: LayerPrompt["size"],
  apiKey: string,
): Promise<Buffer> {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size,
      n: 1,
      background: "opaque",
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`OpenAI image API error (${res.status}): ${errBody}`);
  }

  const json = (await res.json()) as { data: { b64_json: string }[] };
  const b64 = json.data[0]?.b64_json;
  if (!b64) throw new Error("OpenAI response contained no image data");
  return Buffer.from(b64, "base64");
}

async function matteLayer(rawPath: string, finalPath: string) {
  const matteScript = path.join(ROOT, "scripts", "matte.py");
  await execFileAsync("python3", [matteScript, rawPath, finalPath]);
}

async function run() {
  const args = process.argv.slice(2);
  const force = args.includes("--force");
  const dryRun = args.includes("--dry-run");
  const regenerate = args.includes("--regenerate");
  const onlyArg = args.find((a) => a.startsWith("--only="));
  const only = onlyArg ? new Set(onlyArg.slice("--only=".length).split(",")) : null;
  const slugs = args.filter((a) => !a.startsWith("--"));

  if (slugs.length === 0) {
    console.error(
      "Usage: npm run generate:images -- <page-slug> [<page-slug> ...] [--force] [--regenerate] [--only=l1,l2] [--dry-run]\n" +
        `Known slugs: ${Object.keys(imagePromptManifests).join(", ")}`,
    );
    process.exit(1);
  }

  const unknown = slugs.filter((s) => !imagePromptManifests[s]);
  if (unknown.length > 0) {
    console.error(
      `Unknown slug(s): ${unknown.join(", ")}. Known slugs: ${Object.keys(imagePromptManifests).join(", ")}`,
    );
    process.exit(1);
  }

  loadEnvLocal();
  const apiKey = process.env.OPENAI_API_KEY;
  if (!dryRun && !apiKey) {
    console.error(
      "OPENAI_API_KEY is not set. Add it to .env.local (see .env.example) before running for real, " +
        "or pass --dry-run to preview what would be generated without calling the API.",
    );
    process.exit(1);
  }

  const needsMatting = slugs.some((slug) =>
    imagePromptManifests[slug].layers.some((l) => !l.opaque),
  );
  if (!dryRun && needsMatting && !(await checkMattingAvailable())) {
    console.error(
      'numpy/PIL not importable from python3. Install with: pip install numpy pillow',
    );
    process.exit(1);
  }

  let calls = 0;
  for (const slug of slugs) {
    const manifest = imagePromptManifests[slug];
    const outDir = path.join(HEROES_DIR, slug);
    await mkdir(outDir, { recursive: true });

    for (const layer of manifest.layers) {
      if (only && !only.has(layer.layer)) continue;

      const finalPath = path.join(outDir, `${layer.layer}.png`);
      if (existsSync(finalPath) && !force) {
        console.log(`skip  ${slug}/${layer.layer}.png (exists, use --force to regenerate)`);
        continue;
      }

      const fullPrompt = `${layer.prompt}\n\n${STYLE_SUFFIX}`;

      if (dryRun) {
        console.log(`--- ${slug}/${layer.layer} (${layer.size}, opaque=${layer.opaque}) ---`);
        console.log(fullPrompt);
        console.log();
        continue;
      }

      if (layer.opaque) {
        console.log(`gen   ${slug}/${layer.layer}.png (${layer.size})...`);
        const imageBuffer = await generateLayerImage(fullPrompt, layer.size, apiKey!);
        calls += 1;
        await writeFile(finalPath, imageBuffer);
      } else {
        const rawPath = path.join(outDir, `${layer.layer}.raw.png`);
        if (regenerate || !existsSync(rawPath)) {
          console.log(`gen   ${slug}/${layer.layer}.png (${layer.size})...`);
          const imageBuffer = await generateLayerImage(fullPrompt, layer.size, apiKey!);
          calls += 1;
          await writeFile(rawPath, imageBuffer);
        } else {
          console.log(`reuse ${slug}/${layer.layer}.raw.png (cached, pass --regenerate for a fresh call)`);
        }
        console.log(`matte ${slug}/${layer.layer}.png...`);
        await matteLayer(rawPath, finalPath);
      }
      console.log(`done  ${slug}/${layer.layer}.png`);
    }
  }

  if (!dryRun) {
    console.log(`\n${calls} gpt-image-1 call(s) made. Check current OpenAI image pricing against usage if generating many pages at once.`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
