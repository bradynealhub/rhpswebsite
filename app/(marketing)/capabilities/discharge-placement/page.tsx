import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  dischargeContext,
  dischargeCta,
  dischargeFit,
  dischargeHero,
  dischargeMechanics,
  dischargeMeta,
  dischargeWhoItsFor,
} from "@/content/capabilities/discharge-placement";

export const metadata: Metadata = pageMetadata({
  title: dischargeMeta.metaTitle,
  description: dischargeMeta.metaDescription,
  path: dischargeMeta.path,
});

export default function DischargePlacementPage() {
  return (
    <main>
      <Hero content={dischargeHero} />
      <ContentBand content={dischargeContext} tone="light" />
      <ContentBand content={dischargeMechanics} tone="stone" />
      <ContentBand content={dischargeFit} tone="light" />
      <EntryMatrix content={dischargeWhoItsFor} />
      <CtaBand content={dischargeCta} />
    </main>
  );
}
