import Link from "next/link";
import type { CredibilityContent } from "@/content/types";

// "Credibility band" — practitioner credibility asserted collectively, per
// the hard rule: no individual names, bios, or headshots on any page except
// the gated Our People page, and even there only as explicit placeholders.
// The bracketed marquee lines are intentional placeholders, not a bug.
export function CredibilityBand({ content }: { content: CredibilityContent }) {
  return (
    <section className="bg-warmStone">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-copperAccent">
          {content.eyebrow}
        </p>
        <h2 className="font-headline text-3xl font-bold text-charcoal">
          {content.headline}
        </h2>
        <ul className="mt-8 space-y-3">
          {content.marquee.map((line) => (
            <li
              key={line}
              className="rounded-md border border-dashed border-slateBlue/40 bg-white px-4 py-3 font-body italic text-charcoal/60"
            >
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-8 font-body text-lg leading-relaxed text-charcoal/80">
          {content.body}
        </p>
        <Link
          href={content.ctaHref}
          className="mt-4 inline-block font-body font-semibold text-evergreen underline underline-offset-4 hover:text-evergreen/80"
        >
          {content.ctaLine}
        </Link>
      </div>
    </section>
  );
}
