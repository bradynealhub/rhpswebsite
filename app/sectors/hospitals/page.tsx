import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  hospitalsApproach,
  hospitalsCta,
  hospitalsHero,
  hospitalsMatrix,
  hospitalsMeta,
  hospitalsProof,
  hospitalsStakes,
} from "@/content/sectors/hospitals";

export const metadata: Metadata = pageMetadata({
  title: hospitalsMeta.metaTitle,
  description: hospitalsMeta.metaDescription,
  path: hospitalsMeta.path,
});

export default function HospitalsSectorPage() {
  return (
    <main>
      <Hero content={hospitalsHero} />
      <ContentBand content={hospitalsStakes} tone="light" />
      <EntryMatrix content={hospitalsMatrix} />
      <ContentBand content={hospitalsApproach} tone="stone" />
      <ContentBand content={hospitalsProof} tone="light" />
      <CtaBand content={hospitalsCta} />
    </main>
  );
}
