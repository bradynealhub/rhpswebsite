import type {
  BandContent,
  CtaContent,
  HeroContent,
  MarqueeHighlightsContent,
  PageMeta,
  ProductionNoteContent,
  RosterContent,
} from "./types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.16 Our People.
//
// GATED PAGE: every name/credential/tier value below is an explicit
// bracketed placeholder, not an invented detail — see productionNote. This
// page is built and routable but deliberately excluded from lib/siteConfig's
// primaryNav and marked noindex until Brady supplies real, consented,
// fact-checked entries. Do not fill in placeholder values without that.
//
// (2026-07-14) reviewed for voice consistency against the rural-health
// policy positioning brief that drove homepage.ts/about.ts's third pass (see
// homepage.ts's header comment for full rationale). Light consistency check
// only, per the hard rule above: the RosterPerson placeholder data (names,
// credentials, tiers) was left exactly as-is. None of the avoid-list
// vocabulary is present, and the descriptive prose (hero, Convening band,
// domain descriptions, production note) already reads consistently with the
// updated voice — e.g. "funding that rural organizations are eligible for
// but rarely receive" already matches the "eligible for" phrasing used
// elsewhere. No changes made.

export const ourPeopleMeta: PageMeta = {
  metaTitle: "Our People | RHPS",
  metaDescription:
    "How RHPS came together: practitioners in clinical and hospital operations, funding and policy capture, technology and coordination, and workforce training, organized by the piece of the problem each person already knew before RHPS existed.",
  primaryCta: "Contact RHPS",
  path: "/our-people",
};

export const ourPeopleHero: HeroContent = {
  headline: "The people who already knew this problem.",
  subhead:
    "RHPS did not begin with an idea and a search for a team. It began with a room: practitioners who had each already spent a career on one piece of rural health, brought together because the problem in front of them was already familiar to everyone at the table.",
};

export const ourPeopleConvening: BandContent = {
  headline: "The Convening",
  body: "RHPS did not start with a founder, a slide deck, and a hiring plan. It started with a room.\n\nThe people in that room had already spent careers on separate pieces of the same problem: running rural hospitals through closures, reopenings, and everything in between; treating patients in communities where the nearest specialist is hours away; building the systems that move a discharged patient to the right next place instead of the nearest open bed; and capturing the state and federal funding that rural organizations are eligible for but rarely receive. None of them arrived because someone recruited them into an idea. They arrived because the problem on the table was one they already knew, from the inside, before RHPS existed.\n\nThat is the origin this page documents: a convening, not an invention. What follows is organized the way the group itself is organized, by the piece of the problem each person already owned, not by title or tenure.",
};

export const ourPeopleMarquee: MarqueeHighlightsContent = {
  headline: "Before the full roster, three points of the table:",
  items: [
    "[One specific, checkable credential, e.g., former CEO of a named rural hospital system that navigated closure and reopening]",
    "[One specific, checkable credential, e.g., practicing physician with a named, verifiable rural health system affiliation]",
    "[One specific, checkable credential, e.g., operator who secured a named, dollar-figure state or federal grant award on behalf of a named rural organization]",
  ],
  note: "Full names, credentials, and sourcing for each person appear below, organized by domain.",
};

export const ourPeopleRoster: RosterContent = {
  headline: "How This Roster Is Organized",
  intro:
    "The roster below is grouped by the domain of the problem each person works on, not by founder or advisor rank. Within each domain group, a tier label under each person's name identifies their current relationship to RHPS: Founding Operator (part of the founding working group), Advisory Council (a formal advisory relationship), or Contributor (active, ongoing involvement short of a founding or advisory role). The domain groupings, not the tier labels, are the primary structure of this page, because they are the more accurate description of how this group was built.",
  domains: [
    {
      domain: "Clinical & Hospital Operations",
      description:
        "People whose expertise is running rural hospitals and delivering direct patient care.",
      people: [
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., former administrator of a named rural hospital]",
          tier: "Domain: Clinical & Hospital Operations, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., practicing physician, named specialty, named rural service area]",
          tier: "Domain: Clinical & Hospital Operations, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., former chief nursing officer at a named rural facility]",
          tier: "Domain: Clinical & Hospital Operations, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
      ],
    },
    {
      domain: "Funding & Policy Capture",
      description:
        "People whose expertise is securing and administering state and federal funding, including RHTP grant capture, on behalf of rural organizations.",
      people: [
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., led a named organization's successful RHTP subrecipient funding application]",
          tier: "Domain: Funding & Policy Capture, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., former state agency official responsible for a named rural health funding program]",
          tier: "Domain: Funding & Policy Capture, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., managed grant compliance and reporting for a named multi-year federal award]",
          tier: "Domain: Funding & Policy Capture, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
      ],
    },
    {
      domain: "Technology & Coordination",
      description:
        "People whose expertise is the systems and standards that move a patient's consent and care record across providers.",
      people: [
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., built a named discharge coordination or care-transition system]",
          tier: "Domain: Technology & Coordination, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., led health data interoperability work using a named standard, e.g. HL7 FHIR, at a named organization]",
          tier: "Domain: Technology & Coordination, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., former CIO or CMIO at a named rural or regional health system]",
          tier: "Domain: Technology & Coordination, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
      ],
    },
    {
      domain: "Workforce & Training",
      description:
        "People whose expertise is building and sustaining the rural clinical and first-responder workforce, including hands-on simulation training.",
      people: [
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., led simulation-based clinical training programs using the Blue Room platform at a named VoTech center]",
          tier: "Domain: Workforce & Training, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., former director of a named EMS or first-responder training program]",
          tier: "Domain: Workforce & Training, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
        {
          name: "[Name, Title]",
          credential: "[One specific, checkable credential, e.g., built a named rural clinical workforce pipeline or residency partnership]",
          tier: "Domain: Workforce & Training, Tier: [Founding Operator / Advisory Council / Contributor]",
        },
      ],
    },
  ],
};

export const ourPeopleProductionNote: ProductionNoteContent = {
  heading: "Production Note, Read Before Publishing",
  body: "This page is a structural draft, not a published roster. It cannot go live until every bracketed placeholder above is replaced with a real name, a specific and independently verifiable credential, and that individual's explicit, on-the-record consent to be named publicly on this site. Every entry will be fact-checked before publication. No name, credential, institution, or affiliation on this page today is real; every one is marked as a placeholder pending confirmation.",
};

// Doc §4.16 gives a Primary CTA ("Contact RHPS") but, unlike every other
// page, writes no dedicated CTA-band body copy for this page — only the
// button label is specified, so body is intentionally omitted rather than
// invented.
export const ourPeopleCta: CtaContent = {
  headline: "Contact RHPS",
  buttonLabel: "Contact RHPS",
  buttonHref: "/contact",
};
