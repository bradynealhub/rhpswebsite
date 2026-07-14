import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  emsApproach,
  emsCta,
  emsHero,
  emsMatrix,
  emsMeta,
  emsProof,
  emsStakes,
} from "@/content/sectors/ems";

export const metadata: Metadata = pageMetadata({
  title: emsMeta.metaTitle,
  description: emsMeta.metaDescription,
  path: emsMeta.path,
});

export default function EmsSectorPage() {
  return (
    <main>
      <Hero content={emsHero} />
      <ContentBand content={emsStakes} tone="light" />
      <EntryMatrix content={emsMatrix} />
      <ContentBand content={emsApproach} tone="stone" />
      <ContentBand content={emsProof} tone="light" />
      <CtaBand content={emsCta} />
    </main>
  );
}
