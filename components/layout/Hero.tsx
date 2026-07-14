import type { HeroContent } from "@/content/types";
import { HeroText } from "./HeroText";

// Solid institutional field — no illustration, no gradient, no floating
// card. System-wide rule (Layout System doc): hero never leads with
// geography or numbers — it has to work if the reader stops there.
export function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="flex min-h-[50vh] items-center justify-center bg-charcoal">
      <HeroText content={content} />
    </section>
  );
}
