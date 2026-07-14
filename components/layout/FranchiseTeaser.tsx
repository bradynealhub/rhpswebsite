import Link from "next/link";
import type { FranchiseTeaserContent } from "@/content/types";

// "Signature Franchise Teaser" (Homepage) — introduces the flagship annual
// report honestly as forthcoming. Must never imply the report exists yet.
export function FranchiseTeaser({
  content,
}: {
  content: FranchiseTeaserContent;
}) {
  return (
    <section className="bg-charcoal text-warmStone">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-mistBlue">
          {content.eyebrow}
        </p>
        <h2 className="font-headline text-3xl font-bold">
          {content.headline}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-warmStone/80">
          {content.body}
        </p>
        <Link
          href={content.ctaHref}
          className="mt-8 inline-block rounded-md bg-copperAccent px-6 py-3 font-body font-semibold text-charcoal transition-opacity hover:opacity-90"
        >
          {content.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
