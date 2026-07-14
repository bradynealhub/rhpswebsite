import type { TwofoldContent } from "@/content/types";
import { Paragraphs } from "./Paragraphs";

// "The Plan" (Homepage) / "How it works for this sector" (Sector pages) /
// "Fit within the twofold model" (Capability pages) all share this shape:
// an intro paragraph, then Capture/Deliver stated explicitly side by side.
export function TwofoldExplainer({ content }: { content: TwofoldContent }) {
  return (
    <section className="bg-warmStone">
      <div className="mx-auto max-w-4xl px-6 py-20">
        {content.eyebrow ? (
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-copperAccent">
            {content.eyebrow}
          </p>
        ) : null}
        <h2 className="font-headline text-3xl font-bold text-charcoal">
          {content.headline}
        </h2>
        {content.intro ? (
          <Paragraphs
            text={content.intro}
            className="mt-6 font-body text-lg leading-relaxed text-charcoal/80"
          />
        ) : null}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-slateBlue/20 bg-white p-6">
            <h3 className="font-headline text-xl font-bold text-slateBlue">
              {content.captureLabel}
            </h3>
            <Paragraphs
              text={content.captureBody}
              className="mt-3 font-body leading-relaxed text-charcoal/80"
            />
          </div>
          <div className="rounded-lg border border-evergreen/20 bg-white p-6">
            <h3 className="font-headline text-xl font-bold text-evergreen">
              {content.deliverLabel}
            </h3>
            <Paragraphs
              text={content.deliverBody}
              className="mt-3 font-body leading-relaxed text-charcoal/80"
            />
          </div>
        </div>
        {content.closing ? (
          <p className="mt-8 font-emphasis text-lg text-charcoal">
            {content.closing}
          </p>
        ) : null}
      </div>
    </section>
  );
}
