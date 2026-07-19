import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  behavioralHealthApproach,
  behavioralHealthCta,
  behavioralHealthHero,
  behavioralHealthMatrix,
  behavioralHealthMeta,
  behavioralHealthProof,
  behavioralHealthStakes,
} from "@/content/sectors/behavioralHealth";

// GATED PAGE — see content/sectors/behavioralHealth.ts. Real but noindexed
// and left out of lib/siteConfig's primaryNav until Brady confirms
// Behavioral Health & Recovery as a locked sector + capability line.
export const metadata: Metadata = pageMetadata({
  title: behavioralHealthMeta.metaTitle,
  description: behavioralHealthMeta.metaDescription,
  path: behavioralHealthMeta.path,
  noindex: true,
});

export default function BehavioralHealthSectorPage() {
  return (
    <main>
      <Hero content={behavioralHealthHero} />
      <ContentBand content={behavioralHealthStakes} tone="light" />
      <EntryMatrix content={behavioralHealthMatrix} />
      <ContentBand content={behavioralHealthApproach} tone="stone" />
      <ContentBand content={behavioralHealthProof} tone="light" />
      <CtaBand content={behavioralHealthCta} />
    </main>
  );
}
