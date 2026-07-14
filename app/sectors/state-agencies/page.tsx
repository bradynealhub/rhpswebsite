import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  stateAgenciesApproach,
  stateAgenciesCta,
  stateAgenciesHero,
  stateAgenciesMatrix,
  stateAgenciesMeta,
  stateAgenciesProof,
  stateAgenciesStakes,
} from "@/content/sectors/state-agencies";

export const metadata: Metadata = pageMetadata({
  title: stateAgenciesMeta.metaTitle,
  description: stateAgenciesMeta.metaDescription,
  path: stateAgenciesMeta.path,
});

export default function StateAgenciesSectorPage() {
  return (
    <main>
      <Hero content={stateAgenciesHero} />
      <ContentBand content={stateAgenciesStakes} tone="light" />
      <EntryMatrix content={stateAgenciesMatrix} />
      <ContentBand content={stateAgenciesApproach} tone="stone" />
      <ContentBand content={stateAgenciesProof} tone="light" />
      <CtaBand content={stateAgenciesCta} />
    </main>
  );
}
