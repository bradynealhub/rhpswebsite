import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { FranchiseTeaser } from "@/components/layout/FranchiseTeaser";
import { CredibilityBand } from "@/components/layout/CredibilityBand";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  homepageCredibility,
  homepageCta,
  homepageDelivery,
  homepageFranchise,
  homepageHero,
  homepageMatrix,
  homepageMeta,
  homepageStakes,
} from "@/content/homepage";

export const metadata: Metadata = pageMetadata({
  title: homepageMeta.metaTitle,
  description: homepageMeta.metaDescription,
  path: homepageMeta.path,
});

export default function HomePage() {
  return (
    <main>
      <Hero content={homepageHero} />
      <ContentBand content={homepageStakes} tone="light" />
      <ContentBand content={homepageDelivery} tone="stone" />
      <EntryMatrix content={homepageMatrix} />
      <FranchiseTeaser content={homepageFranchise} />
      <CredibilityBand content={homepageCredibility} />
      <CtaBand content={homepageCta} />
    </main>
  );
}
