import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  specialistContext,
  specialistCta,
  specialistFit,
  specialistHero,
  specialistMechanics,
  specialistMeta,
  specialistWhoItsFor,
} from "@/content/capabilities/acute-specialist-lines";

export const metadata: Metadata = pageMetadata({
  title: specialistMeta.metaTitle,
  description: specialistMeta.metaDescription,
  path: specialistMeta.path,
});

export default function AcuteSpecialistLinesPage() {
  return (
    <main>
      <Hero content={specialistHero} />
      <ContentBand content={specialistContext} tone="light" />
      <ContentBand content={specialistMechanics} tone="stone" />
      <ContentBand content={specialistFit} tone="light" />
      <EntryMatrix content={specialistWhoItsFor} />
      <CtaBand content={specialistCta} />
    </main>
  );
}
