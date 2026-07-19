import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  insightsCoverage,
  insightsHero,
  insightsMeta,
  insightsNotify,
  insightsWhy,
} from "@/content/insights";

export const metadata: Metadata = pageMetadata({
  title: insightsMeta.metaTitle,
  description: insightsMeta.metaDescription,
  path: insightsMeta.path,
});

export default function InsightsPage() {
  return (
    <main>
      <Hero content={insightsHero} />
      <ContentBand content={insightsWhy} tone="light" />
      <ContentBand content={insightsCoverage} tone="stone" />
      <CtaBand content={insightsNotify} />
    </main>
  );
}
