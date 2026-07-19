import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { MarqueeHighlights } from "@/components/layout/MarqueeHighlights";
import { RosterSection } from "@/components/layout/RosterSection";
import { ProductionNoteCallout } from "@/components/layout/ProductionNoteCallout";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  ourPeopleConvening,
  ourPeopleCta,
  ourPeopleHero,
  ourPeopleMarquee,
  ourPeopleMeta,
  ourPeopleProductionNote,
  ourPeopleRoster,
} from "@/content/ourPeople";

// GATED PAGE — see content/ourPeople.ts. Real but noindexed and left out of
// lib/siteConfig's primaryNav until Brady confirms names/credentials/consent.
export const metadata: Metadata = pageMetadata({
  title: ourPeopleMeta.metaTitle,
  description: ourPeopleMeta.metaDescription,
  path: ourPeopleMeta.path,
  noindex: true,
});

export default function OurPeoplePage() {
  return (
    <main>
      <Hero content={ourPeopleHero} />
      <ContentBand content={ourPeopleConvening} tone="light" />
      <MarqueeHighlights content={ourPeopleMarquee} />
      <RosterSection content={ourPeopleRoster} />
      <ProductionNoteCallout content={ourPeopleProductionNote} />
      <CtaBand content={ourPeopleCta} />
    </main>
  );
}
