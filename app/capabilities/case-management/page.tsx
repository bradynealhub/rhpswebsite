import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  caseMgmtContext,
  caseMgmtCta,
  caseMgmtFit,
  caseMgmtHero,
  caseMgmtMechanics,
  caseMgmtMeta,
  caseMgmtWhoItsFor,
} from "@/content/capabilities/case-management";

export const metadata: Metadata = pageMetadata({
  title: caseMgmtMeta.metaTitle,
  description: caseMgmtMeta.metaDescription,
  path: caseMgmtMeta.path,
});

export default function CaseManagementPage() {
  return (
    <main>
      <Hero content={caseMgmtHero} />
      <ContentBand content={caseMgmtContext} tone="light" />
      <ContentBand content={caseMgmtMechanics} tone="stone" />
      <ContentBand content={caseMgmtFit} tone="light" />
      <EntryMatrix content={caseMgmtWhoItsFor} />
      <CtaBand content={caseMgmtCta} />
    </main>
  );
}
