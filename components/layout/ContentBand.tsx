import type { BandContent } from "@/content/types";
import { Paragraphs } from "./Paragraphs";

// Covers both the Context/Stakes band and the Proof/Evidence band from the
// Layout System doc: same visual treatment, different content (only sourced
// figures belong in a Proof band, per the system-wide rule).
export function ContentBand({
  content,
  tone = "light",
}: {
  content: BandContent;
  tone?: "light" | "stone";
}) {
  return (
    <section
      className={
        tone === "stone" ? "bg-warmStone" : "bg-white"
      }
    >
      <div className="mx-auto max-w-3xl px-6 py-20">
        {content.eyebrow ? (
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-copperAccent">
            {content.eyebrow}
          </p>
        ) : null}
        {content.headline ? (
          <h2 className="font-headline text-3xl font-bold text-charcoal">
            {content.headline}
          </h2>
        ) : null}
        {content.body ? (
          <Paragraphs
            text={content.body}
            className="mt-6 font-body text-lg leading-relaxed text-charcoal/80"
          />
        ) : null}
        {content.bullets ? (
          <ul className="mt-6 space-y-3">
            {content.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 font-body text-lg leading-relaxed text-charcoal/80"
              >
                <span aria-hidden className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-evergreen" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {content.closingLine ? (
          <p className="mt-6 font-emphasis text-lg text-slateBlue">
            {content.closingLine}
          </p>
        ) : null}
      </div>
    </section>
  );
}
