import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { CredibilityBand } from "@/components/layout/CredibilityBand";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  aboutApproach,
  aboutCredibility,
  aboutCta,
  aboutEvidence,
  aboutHero,
  aboutMeta,
  aboutOrigin,
  aboutPillars,
} from "@/content/about";

export const metadata: Metadata = pageMetadata({
  title: aboutMeta.metaTitle,
  description: aboutMeta.metaDescription,
  path: aboutMeta.path,
});

export default function AboutPage() {
  return (
    <main>
      <Hero content={aboutHero} />
      <ContentBand content={aboutOrigin} tone="light" />
      <ContentBand content={aboutApproach} tone="stone" />
      <ContentBand content={aboutPillars} tone="light" />
      <ContentBand content={aboutEvidence} tone="stone" />
      <CredibilityBand content={aboutCredibility} />
      <CtaBand content={aboutCta} />
    </main>
  );
}
