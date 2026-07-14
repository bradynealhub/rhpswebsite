import Link from "next/link";
import type { EntryMatrixContent } from "@/content/types";

// Covers "Matrix Entry Points" (Homepage), "Find Your Sector" (Sectors
// Overview), and "Relevant capability matrix (subset)" (Sector pages) —
// same job in each case: give the visitor a menu of links into the rest of
// the site, grouped by axis.
export function EntryMatrix({ content }: { content: EntryMatrixContent }) {
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
        {content.intro ? (
          <p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-charcoal/80">
            {content.intro}
          </p>
        ) : null}
        <div className="mt-10 grid gap-10 sm:grid-cols-2">
          {content.groups.map((group) => (
            <div key={group.label}>
              <h3 className="font-headline text-lg font-bold text-slateBlue">
                {group.label}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href ?? "#"}
                      className="block rounded-md border border-charcoal/10 px-4 py-3 font-body text-charcoal transition-colors hover:border-evergreen hover:bg-warmStone"
                    >
                      <span className="font-semibold">{item.label}</span>
                      {item.note ? (
                        <span className="ml-2 text-sm italic text-charcoal/60">
                          ({item.note})
                        </span>
                      ) : null}
                      {item.description ? (
                        <span className="mt-1 block text-sm text-charcoal/70">
                          {item.description}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
