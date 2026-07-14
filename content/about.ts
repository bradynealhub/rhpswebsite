import type {
  BandContent,
  CredibilityContent,
  CtaContent,
  HeroContent,
  PageMeta,
} from "./types";

// Copy originally transcribed verbatim from
// RHPS_Website_Content_and_Layout_Strategy_v3.docx §4.15 About / Approach,
// then given several revision passes:
//
// (2026-07-13, first pass) tone: "owed" -> "eligible for", chest-thumping
// hero closer softened.
//
// (2026-07-13, second pass) repositioning: matches the same change made to
// homepage.ts — Brady flagged an unresolved legal question about RHPS
// helping capture grant funding and then being paid, from that same
// funding, to deliver the service it funds, plus an honesty concern (RHPS
// doesn't yet have a track record of actually completing that cycle). The
// page moved off "The Model" (a Capture/Deliver twofold explainer) to "How
// We Work" (direct service delivery, or trusted partners, with funding
// help as a secondary, unpaired capability). "Twofold, not single-point"
// dropped from the brand pillars list for the same reason. Claims that
// RHPS is currently, actively capturing/delivering against RHTP funding
// were softened throughout — those asserted an operating track record that
// hasn't happened yet; individual founders' real prior career experience
// (running hospitals, treating patients, RHTP grant administration
// background) is a different, still-true claim and is preserved.
//
// Section shape per the doc's Layout System spec, adapted: Hero -> The
// problem we saw (origin band) -> How we work -> Brand pillars band ->
// Where we work today (evidence band) -> Founding bench (credibility band,
// no names) -> CTA.
//
// Hard rule preserved: no individual names or bios anywhere on this page.
// The founding bench is described only collectively; the marquee list is
// intentionally empty (see homepage.ts's homepageCredibility for the
// contrasting placeholder-marquee pattern used where names are eventually
// expected). The Our People cross-link below carries the doc's own §7
// sentence about where individual practitioners are introduced.
//
// (2026-07-14) voice pass, matching homepage.ts's third pass: "aboutOrigin"
// opens with the patient-facing version of the gap (previously stated only
// as an internal capability gap); "aboutApproach" picks up homepage.ts's
// local-control language (RHPS builds around providers a community already
// knows, rather than replacing them) and adds a "care completed, not just
// referred" pillar. See homepage.ts's header comment for full rationale.

export const aboutMeta: PageMeta = {
  metaTitle: "About / Approach | RHPS, Rural Health Provider Services",
  metaDescription:
    "RHPS is a group of practitioners delivering discharge placement, specialist access, case management, training, and workforce support to rural health systems, directly or through delivery partners we trust, from day one.",
  primaryCta: "Start a conversation with RHPS",
  path: "/about",
};

export const aboutHero: HeroContent = {
  headline:
    "RHPS delivers the services rural health systems need, directly or through partners we trust, run by people who have done this work themselves.",
  subhead:
    "RHPS is formed by people who have run rural hospitals and treated rural patients themselves, designed from the outset as a model built for national scale, not a local program that might expand later.",
};

export const aboutOrigin: BandContent = {
  headline: "The problem we saw",
  body: "A rural patient discharged with nowhere confirmed to go. A rural clinic that can't reach the specialist a patient needs. A rural workforce too thin to fill the next shift. The founding group behind RHPS did not arrive at this model from a whiteboard; its members include people who have run rural hospitals, a practicing physician, and people with direct experience in state Rural Health Transformation Program (RHTP) grant administration, each of whom had already spent a career on one piece of this same problem.\n\nThat vantage point showed the same gap from multiple directions: rural systems often can't build every capability they need in-house, whether that's discharge follow-up, specialist access, training capacity, or workforce support, and building each one from scratch is slow and expensive for an organization already stretched thin. What a patient is told they need and what actually reaches them are too often two different things.\n\nRHPS was organized to close that gap directly, delivering the services rural organizations need, under a founding working agreement among its practitioner members. No legal entity has been formed yet.",
};

export const aboutApproach: BandContent = {
  headline: "How we work",
  body: "RHPS delivers services directly wherever we have the practitioner capacity to do so: discharge placement, specialist access, case management, training and simulation, and workforce support. Where we don't yet have that capacity, we work through delivery partners we trust, rather than leaving an organization, or a patient, without an answer.\n\nRHPS builds around the providers a rural community already knows, not around replacing them. The aim is care that actually reaches the patient, delivered close to home, not a referral that becomes their responsibility to chase down.\n\nRHPS can also help identify and pursue the funding that pays for these services, for organizations that want that support. That capability sits alongside service delivery, not ahead of it.\n\nOrganizations choose what they need from the menu.",
};

export const aboutPillars: BandContent = {
  headline: "Brand pillars",
  bullets: [
    "Direct delivery, real practitioners.",
    "Practitioners, not consultants.",
    "Provides and stands behind the work.",
    "Care completed, not just referred.",
    "Patient-first, always.",
    "Menu, not a mandate.",
    "National by design.",
  ],
};

export const aboutEvidence: BandContent = {
  headline: "Where we work today",
  body: "RHPS's founding practitioners are currently based in Oklahoma. That is a statement of current scope, not of ambition.\n\nOklahoma's Year 1 RHTP award is $223.5 million, the fifth largest in the nation, and the procurement windows have typically run six to eight weeks. Nationally, 39 of 50 states have already released at least one RHTP subrecipient funding opportunity as of July 2026, under a federal program built to distribute $50 billion over five years.",
};

export const aboutCredibility: CredibilityContent = {
  eyebrow: "Founding Bench",
  headline: "Founding bench",
  marquee: [],
  body: "RHPS was founded by a bench of eight practitioners, including individuals who have run rural hospitals, a practicing physician, and people with direct experience in state RHTP grant administration.\n\nRHPS is not yet publishing individual names or biographies for its founding practitioners.",
  ctaLine:
    "The practitioners who built it, organized by the domain of the problem each one covers, are introduced on the Our People page.",
  ctaHref: "/our-people",
};

export const aboutCta: CtaContent = {
  headline: "Start a conversation with RHPS",
  body: "RHPS is early. It is a founding group of practitioners working under a founding working agreement, not a long-established institution.\n\nThis page describes how we work.",
  buttonLabel: "Start a conversation with RHPS",
  buttonHref: "/contact",
};
