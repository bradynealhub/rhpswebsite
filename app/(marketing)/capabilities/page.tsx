import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  overviewContext,
  overviewCta,
  overviewFit,
  overviewHero,
  overviewMechanics,
  overviewMeta,
  overviewWhoItsFor,
} from "@/content/capabilities/overview";

export const metadata: Metadata = pageMetadata({
  title: overviewMeta.metaTitle,
  description: overviewMeta.metaDescription,
  path: overviewMeta.path,
});

export default function CapabilitiesOverviewPage() {
  return (
    <main>
      <Hero content={overviewHero} />
      <ContentBand content={overviewContext} tone="light" />
      <EntryMatrix content={overviewMechanics} />
      <ContentBand content={overviewFit} tone="stone" />
      <EntryMatrix content={overviewWhoItsFor} />
      <CtaBand content={overviewCta} />
    </main>
  );
}
