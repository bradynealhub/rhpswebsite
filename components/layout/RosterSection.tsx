import type { RosterContent } from "@/content/types";
import { Paragraphs } from "./Paragraphs";

// Our People's domain-grouped roster (§4.16). Every person card renders
// bracketed placeholder text as-is — this page cannot go live with real
// names until Brady supplies confirmed, consented, fact-checked entries.
export function RosterSection({ content }: { content: RosterContent }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20">
        {content.eyebrow ? (
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-wide text-copperAccent">
            {content.eyebrow}
          </p>
        ) : null}
        <h2 className="font-headline text-3xl font-bold text-charcoal">
          {content.headline}
        </h2>
        <Paragraphs
          text={content.intro}
          className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-charcoal/80"
        />
        <div className="mt-12 space-y-14">
          {content.domains.map((domain) => (
            <div key={domain.domain}>
              <h3 className="font-headline text-xl font-bold text-slateBlue">
                {domain.domain}
              </h3>
              <p className="mt-2 max-w-2xl font-body text-sm text-charcoal/60">
                {domain.description}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {domain.people.map((person, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className="rounded-lg border border-dashed border-slateBlue/40 bg-warmStone p-5"
                  >
                    <p className="font-body font-semibold italic text-charcoal/70">
                      {person.name}
                    </p>
                    <p className="mt-2 font-body text-sm italic text-charcoal/60">
                      {person.credential}
                    </p>
                    <p className="mt-3 font-body text-xs uppercase tracking-wide text-copperAccent">
                      {person.tier}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
