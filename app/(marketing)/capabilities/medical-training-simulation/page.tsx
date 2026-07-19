import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  trainingContext,
  trainingCta,
  trainingFit,
  trainingHero,
  trainingMechanics,
  trainingMeta,
  trainingWhoItsFor,
} from "@/content/capabilities/medical-training-simulation";

export const metadata: Metadata = pageMetadata({
  title: trainingMeta.metaTitle,
  description: trainingMeta.metaDescription,
  path: trainingMeta.path,
});

export default function MedicalTrainingSimulationPage() {
  return (
    <main>
      <Hero content={trainingHero} />
      <ContentBand content={trainingContext} tone="light" />
      <ContentBand content={trainingMechanics} tone="stone" />
      <ContentBand content={trainingFit} tone="light" />
      <EntryMatrix content={trainingWhoItsFor} />
      <CtaBand content={trainingCta} />
    </main>
  );
}
