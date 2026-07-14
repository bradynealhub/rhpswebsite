import type { MarqueeHighlightsContent } from "@/content/types";

// Shared "pacing device" pattern: a few standout, independently-checkable
// credential lines shown before a fuller listing (used by the homepage
// Credibility Band and Our People's roster teaser). Bracketed placeholder
// text renders as-is per the hard placeholder rule.
export function MarqueeHighlights({ content }: { content: MarqueeHighlightsContent }) {
  return (
    <section className="bg-warmStone">
      <div className="mx-auto max-w-3xl px-6 py-16">
        {content.eyebrow ? (
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-copperAccent">
            {content.eyebrow}
          </p>
        ) : null}
        {content.headline ? (
          <h2 className="font-headline text-2xl font-bold text-charcoal">
            {content.headline}
          </h2>
        ) : null}
        <ul className="mt-6 space-y-3">
          {content.items.map((item) => (
            <li
              key={item}
              className="rounded-md border border-dashed border-slateBlue/40 bg-white px-4 py-3 font-body italic text-charcoal/60"
            >
              {item}
            </li>
          ))}
        </ul>
        {content.note ? (
          <p className="mt-6 font-body text-sm text-charcoal/70">{content.note}</p>
        ) : null}
      </div>
    </section>
  );
}
