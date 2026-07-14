import Link from "next/link";
import type { CtaContent } from "@/content/types";

// "CTA/Contact Band" — one low-friction next action, sized to what RHPS can
// actually deliver today. Never a hard close.
export function CtaBand({ content }: { content: CtaContent }) {
  return (
    <section className="bg-evergreen text-warmStone">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        {content.eyebrow ? (
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-mistBlue">
            {content.eyebrow}
          </p>
        ) : null}
        <h2 className="font-headline text-3xl font-bold">
          {content.headline}
        </h2>
        {content.body ? (
          <p className="mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-warmStone/90">
            {content.body}
          </p>
        ) : null}
        <Link
          href={content.buttonHref}
          className="mt-8 inline-block rounded-md bg-warmStone px-6 py-3 font-body font-semibold text-evergreen transition-opacity hover:opacity-90"
        >
          {content.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
