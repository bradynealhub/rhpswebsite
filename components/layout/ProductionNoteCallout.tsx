import type { ProductionNoteContent } from "@/content/types";

// Visually distinct gating disclaimer, per doc §4.16: "should render as a
// visually distinct callout block at the bottom of the page, not small-print
// text." Deliberately loud (bordered, contrasting) rather than a footer note.
export function ProductionNoteCallout({ content }: { content: ProductionNoteContent }) {
  return (
    <section className="bg-charcoal">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-lg border-2 border-copperAccent bg-warmStone p-8">
          <p className="font-body text-sm font-bold uppercase tracking-wide text-copperAccent">
            {content.heading}
          </p>
          <p className="mt-4 font-body leading-relaxed text-charcoal">
            {content.body}
          </p>
        </div>
      </div>
    </section>
  );
}
