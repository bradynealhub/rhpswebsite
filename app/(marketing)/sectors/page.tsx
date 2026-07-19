import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  sectorsOverviewCta,
  sectorsOverviewHero,
  sectorsOverviewIntro,
  sectorsOverviewMatrix,
  sectorsOverviewMeta,
  sectorsOverviewModel,
  sectorsOverviewProof,
  sectorsOverviewStakes,
} from "@/content/sectors/overview";

export const metadata: Metadata = pageMetadata({
  title: sectorsOverviewMeta.metaTitle,
  description: sectorsOverviewMeta.metaDescription,
  path: sectorsOverviewMeta.path,
});

export default function SectorsOverviewPage() {
  return (
    <main>
      <Hero content={sectorsOverviewHero} />
      <ContentBand content={sectorsOverviewIntro} tone="light" />
      <ContentBand content={sectorsOverviewStakes} tone="stone" />
      <EntryMatrix content={sectorsOverviewMatrix} />
      <ContentBand content={sectorsOverviewModel} tone="stone" />
      <ContentBand content={sectorsOverviewProof} tone="light" />
      <CtaBand content={sectorsOverviewCta} />
    </main>
  );
}
