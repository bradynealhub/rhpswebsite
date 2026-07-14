// Shared shapes for page content modules. Section components in
// components/layout/ render these; copy itself lives only in content/*.ts,
// transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx.

export type PageMeta = {
  metaTitle: string;
  metaDescription: string;
  primaryCta: string;
  path: string;
};

export type HeroContent = {
  eyebrow?: string;
  headline: string;
  subhead: string;
};

export type BandContent = {
  eyebrow?: string;
  headline?: string;
  body?: string;
  bullets?: string[];
  closingLine?: string;
};

export type TwofoldContent = {
  eyebrow?: string;
  headline: string;
  intro?: string;
  captureLabel: string;
  captureBody: string;
  deliverLabel: string;
  deliverBody: string;
  closing?: string;
};

export type MatrixGroup = {
  label: string;
  items: {
    label: string;
    note?: string;
    description?: string;
    href?: string;
  }[];
};

export type EntryMatrixContent = {
  eyebrow?: string;
  headline: string;
  intro?: string;
  groups: MatrixGroup[];
};

export type FranchiseTeaserContent = {
  eyebrow: string;
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
};

export type CredibilityContent = {
  eyebrow: string;
  headline: string;
  marquee: string[];
  body: string;
  ctaLine: string;
  ctaHref: string;
};

export type CtaContent = {
  eyebrow?: string;
  headline: string;
  body?: string;
  buttonLabel: string;
  buttonHref: string;
};

// Our People page only (§4.16) — every name/credential/tier value is a
// bracketed placeholder per the doc's hard placeholder rule, not invented
// content. Do not replace with real names without Brady's explicit
// confirmation + consent per person.
export type RosterPerson = {
  name: string;
  credential: string;
  tier: string;
};

export type RosterDomain = {
  domain: string;
  description: string;
  people: RosterPerson[];
};

export type RosterContent = {
  eyebrow?: string;
  headline: string;
  intro: string;
  domains: RosterDomain[];
};

export type MarqueeHighlightsContent = {
  eyebrow?: string;
  headline?: string;
  items: string[];
  note?: string;
};

export type ProductionNoteContent = {
  heading: string;
  body: string;
};

// Contact page path-finder (§4.17) — each option branches the visitor by
// role and pre-fills the form's Role field on click.
export type ContactRoleOption = {
  role: string;
  description: string;
  ctaLabel: string;
};
