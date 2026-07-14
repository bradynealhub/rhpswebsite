import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { Hero } from "@/components/layout/Hero";
import { ContentBand } from "@/components/layout/ContentBand";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  contactAlternativePaths,
  contactDirectChannelEmail,
  contactExpectations,
  contactHero,
  contactMeta,
  contactPathFinderIntro,
  contactRoleOptions,
} from "@/content/contact";

export const metadata: Metadata = pageMetadata({
  title: contactMeta.metaTitle,
  description: contactMeta.metaDescription,
  path: contactMeta.path,
});

export default function ContactPage() {
  return (
    <main>
      <Hero content={contactHero} />
      <ContactForm intro={contactPathFinderIntro} roles={contactRoleOptions} />
      <ContentBand content={contactExpectations} tone="stone" />
      {contactDirectChannelEmail ? (
        <div className="bg-white">
          <div className="mx-auto max-w-3xl px-6 pb-20">
            <p className="font-body text-lg text-charcoal/70">
              Prefer email? Write to us directly at{" "}
              <a
                href={`mailto:${contactDirectChannelEmail}`}
                className="font-semibold text-evergreen underline underline-offset-4"
              >
                {contactDirectChannelEmail}
              </a>
              .
            </p>
          </div>
        </div>
      ) : null}
      <ContentBand content={contactAlternativePaths} tone="stone" />
    </main>
  );
}
