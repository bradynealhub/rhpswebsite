#!/usr/bin/env python3
"""Background-removal helper for scripts/generate-hero-images.ts.

Uses a simple white chroma-key (alpha = 255 - min(R,G,B)) rather than an
ML segmentation model (e.g. rembg/u2net). The source images are flat vector
illustrations generated against a deliberate pure-white background per the
visual guide's own instruction ("Set against a flat pure white background so
the shape can be cleanly extracted") — a color-key is both more predictable
and, in practice, far more reliable here: a saliency-based photo model reads
pale, low-contrast strokes (the terrain silhouettes, faint accent lines) as
"background" and erases them, which a simple whiteness threshold does not.
"""
import sys

import numpy as np
from PIL import Image


def main() -> None:
    input_path, output_path = sys.argv[1], sys.argv[2]
    img = Image.open(input_path).convert("RGB")
    arr = np.asarray(img).astype(np.int16)  # H, W, 3

    min_channel = arr.min(axis=2)  # H, W — closer to 255 means closer to white
    alpha = np.clip(255 - min_channel, 0, 255).astype(np.uint8)

    rgba = np.dstack([arr.astype(np.uint8), alpha])
    Image.fromarray(rgba, mode="RGBA").save(output_path)


if __name__ == "__main__":
    main()
