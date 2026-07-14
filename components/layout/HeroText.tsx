import type { HeroContent } from "@/content/types";

// Institutional-report-cover treatment: solid dark field, confident
// typography, a single thin copper rule as the only ornament. No
// illustration competing with the headline, no floating card — the earlier
// pastel-gradient-plus-translucent-panel version read as generic SaaS
// landing-page styling, not an institutional cover, regardless of what
// artwork sat behind it. Used identically across every page's hero so the
// site reads as one coherent system from page one, not sixteen blank
// pages waiting on imagery.

// Headlines in this content set range from a short ~110-character homepage
// statement to 200+ character sentence-length hero copy on sector pages.
// Scale down as length grows so every hero reads as one deliberate
// statement, not a shouted paragraph.
function headlineSizeClass(headline: string): string {
  const length = headline.length;
  if (length > 180) return "text-xl sm:text-2xl md:text-3xl";
  if (length > 120) return "text-2xl sm:text-3xl md:text-4xl";
  if (length > 70) return "text-3xl sm:text-4xl";
  return "text-4xl sm:text-5xl";
}

export function HeroText({ content }: { content: HeroContent }) {
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center">
      <div className="mx-auto mb-6 h-px w-12 bg-copperAccent" aria-hidden="true" />
      {content.eyebrow ? (
        <p className="mb-4 font-body text-sm font-semibold uppercase tracking-wide text-mistBlue">
          {content.eyebrow}
        </p>
      ) : null}
      <h1
        className={`text-balance font-headline font-bold leading-[1.15] text-warmStone ${headlineSizeClass(content.headline)}`}
      >
        {content.headline}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-pretty font-body text-base leading-relaxed text-warmStone/70 sm:text-lg">
        {content.subhead}
      </p>
    </div>
  );
}
