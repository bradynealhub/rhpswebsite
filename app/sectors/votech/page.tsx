import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { EntryMatrix } from "@/components/layout/EntryMatrix";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  votechApproach,
  votechCta,
  votechHero,
  votechMatrix,
  votechMeta,
  votechProof,
  votechStakes,
} from "@/content/sectors/votech";

export const metadata: Metadata = pageMetadata({
  title: votechMeta.metaTitle,
  description: votechMeta.metaDescription,
  path: votechMeta.path,
});

export default function VoTechSectorPage() {
  return (
    <main>
      <Hero content={votechHero} />
      <ContentBand content={votechStakes} tone="light" />
      <EntryMatrix content={votechMatrix} />
      <ContentBand content={votechApproach} tone="stone" />
      <ContentBand content={votechProof} tone="light" />
      <CtaBand content={votechCta} />
    </main>
  );
}
