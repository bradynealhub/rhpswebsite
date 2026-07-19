import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  workforceContext,
  workforceCta,
  workforceFit,
  workforceHero,
  workforceMechanics,
  workforceMeta,
  workforceWhoItsFor,
} from "@/content/capabilities/workforce-strengthening";

export const metadata: Metadata = pageMetadata({
  title: workforceMeta.metaTitle,
  description: workforceMeta.metaDescription,
  path: workforceMeta.path,
});

export default function WorkforceStrengtheningPage() {
  return (
    <main>
      <Hero content={workforceHero} />
      <ContentBand content={workforceContext} tone="light" />
      <ContentBand content={workforceMechanics} tone="stone" />
      <ContentBand content={workforceFit} tone="light" />
      <EntryMatrix content={workforceWhoItsFor} />
      <CtaBand content={workforceCta} />
    </main>
  );
}
