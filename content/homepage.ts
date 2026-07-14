import type {
  BandContent,
  CredibilityContent,
  CtaContent,
  EntryMatrixContent,
  FranchiseTeaserContent,
  HeroContent,
  PageMeta,
} from "./types";

// Copy originally transcribed verbatim from
// RHPS_Website_Content_and_Layout_Strategy_v3.docx §4.1 Homepage, then given
// several revision passes:
//
// (2026-07-12) tone: casual/slang phrasing ("receipts"), grievance-toned
// word choices ("owed" -> "eligible for"), combative negation framing
// ("not a pitch deck").
//
// (2026-07-13, first pass) hero reworked to lead with a thesis instead of a
// flat problem list; Stakes/Proof reordered so the site didn't hinge
// entirely on the RHTP $50B program + Oklahoma figures.
//
// (2026-07-13, second pass) repositioning: Brady flagged an unresolved
// legal question — whether RHPS helping an organization capture grant
// funding and then being paid, from that same funding, to deliver the
// service it funds raises a real conflict-of-interest / procurement-law
// issue that needs actual legal review, not a copy fix. Rather than wait on
// that, the site's core thesis moved off the "capture funding + deliver it,
// same team" framing entirely. RHPS now leads with the services it
// delivers — directly, or through delivery partners — with funding capture
// kept as a real but secondary, unpaired capability, per Brady's explicit
// direction: "funding capture stays, but not as prominent." The old
// "Proof / In Practice" band asserted an operating track record Brady says
// RHPS doesn't actually have yet ("we don't have any experience getting it
// done") — dropped rather than softened again, per the site's own "no
// empty rooms" rule: a section that can't be filled with something true
// today doesn't ship. "Partners we trust to deliver" stays generic — no
// real named partners exist yet.
//
// (2026-07-14, third pass) voice pass, per Brady's review of a rural-health
// policy positioning brief: reframed around a patient-first opening
// (illustrative, not a claimed real case — the site has no track record to
// cite yet), the "referral vs. care received" distinction as a recurring
// throughline, explicit local-control language (RHPS builds around
// providers a community already knows rather than replacing them), and
// broadened "the gap" beyond post-discharge coordination to the same
// pattern showing up in chronic disease, behavioral health, and workforce
// pipelines — all categories RHPS's existing capability menu already
// covers, so nothing here claims a new service. Jargon audit: no
// corporate/SaaS terminology was present to begin with (no changes needed
// on that front). Hard rules preserved: no invented outcomes data, no
// named partners, no operating track record.

export const homepageMeta: PageMeta = {
  metaTitle: "RHPS | Direct Services for Rural Hospitals, Health Systems, and Agencies",
  metaDescription:
    "RHPS delivers discharge placement, specialist access, case management, training and simulation, and workforce support to rural health systems, directly or through delivery partners we trust, run by people who have done this work themselves.",
  primaryCta: "Start a Conversation",
  path: "/",
};

export const homepageHero: HeroContent = {
  headline:
    "A referral is not the same thing as care received. RHPS closes that gap for rural patients.",
  subhead:
    "No rural family should have to assemble their own healthcare system just because of where they live. RHPS delivers discharge placement, specialist access, case management, training, and workforce support directly, or through partners we trust, so what a patient is told they need is what actually reaches them.",
};

export const homepageStakes: BandContent = {
  eyebrow: "Where Care Breaks Down",
  headline:
    "A discharge order is not the same thing as a patient who actually gets the follow-up care they were told they need.",
  body: "Picture a rural patient leaving the hospital after a cardiac event. The discharge plan calls for a cardiology follow-up, medication management, and nutrition support. The nearest cardiologist is more than an hour away. The patient leaves with a stack of paperwork, a handful of phone numbers, and the job of assembling the rest of their own care.\n\nThe referral was made. The care was not yet delivered. That same gap, between what a patient is told to do and what actually happens next, shows up across rural health: after a hospital discharge, in chronic disease management, in behavioral health and recovery, in workforce and training pipelines that never quite reach the people who need them. Federal and state programs, including the five-year, $50 billion Rural Health Transformation Program now moving through 39 of 50 states, are putting real funding behind closing gaps like this. Funding alone doesn't close it. Someone still has to make sure the patient gets there.",
};

export const homepageDelivery: BandContent = {
  eyebrow: "How We Deliver",
  headline:
    "Every service is delivered directly, or through a partner we trust, so care reaches the patient instead of stopping at a referral.",
  body: "RHPS practitioners, people who have run rural hospitals and treated rural patients themselves, deliver discharge placement, specialist access, case management, training, and workforce support directly wherever we have the capacity to do so. Where we don't yet, we work through delivery partners we trust to do the work right, rather than leaving an organization, or a patient, without an answer.\n\nRHPS builds around the providers and organizations a rural community already knows, not around replacing them. The goal is care closer to home, delivered by people the community already trusts, with technology that supports those relationships instead of standing in for them.\n\nRHPS can also help identify and pursue the funding that pays for these services, for organizations that want that support. That capability sits alongside service delivery — it is not a requirement to work with us.",
};

export const homepageMatrix: EntryMatrixContent = {
  eyebrow: "Find Your Path",
  headline: "Enter by who you are, or by what you need",
  groups: [
    {
      label: "By Sector",
      items: [
        { label: "Hospitals & Health Systems", href: "/sectors/hospitals" },
        {
          label: "Behavioral Health & Recovery Programs",
          note: "Proposed, pending confirmation",
          href: "/sectors/behavioral-health",
        },
        {
          label: "State Agencies & RHTP Administrators",
          href: "/sectors/state-agencies",
        },
        {
          label: "VoTech & Clinical Training Partners",
          href: "/sectors/votech",
        },
        { label: "EMS & First Responder Agencies", href: "/sectors/ems" },
      ],
    },
    {
      label: "By Capability",
      items: [
        {
          label: "Discharge Placement Platform",
          href: "/capabilities/discharge-placement",
        },
        {
          label: "Acute Specialist Lines",
          href: "/capabilities/acute-specialist-lines",
        },
        {
          label: "Case Management for Rural Oklahoma",
          href: "/capabilities/case-management",
        },
        {
          label: "Medical Training & Simulation",
          href: "/capabilities/medical-training-simulation",
        },
        {
          label: "Workforce Strengthening",
          href: "/capabilities/workforce-strengthening",
        },
        {
          label: "Behavioral Health & Recovery",
          note: "Proposed, pending confirmation",
          href: "/sectors/behavioral-health",
        },
      ],
    },
  ],
};

export const homepageFranchise: FranchiseTeaserContent = {
  eyebrow: "Forthcoming",
  headline: '"The State of Rural Health Transformation"',
  body: "RHPS is preparing an annual publication examining how RHTP funding is being captured and spent across the states, and what is and isn't reaching rural patients as a result. It has not been published yet.",
  ctaLabel: "Notify me when it publishes",
  ctaHref: "/insights",
};

export const homepageCredibility: CredibilityContent = {
  eyebrow: "Who's Behind This",
  headline: "A room of practitioners",
  marquee: [
    "[Name, Title, one specific, checkable credential, e.g. former CEO of a named rural hospital system]",
    "[Name, Title, one specific, checkable credential, e.g. physician with a named clinical specialty and a stated number of years in rural practice]",
    "[Name, Title, one specific, checkable credential, e.g. state RHTP grant capture record with a specific dollar figure and state named]",
  ],
  body: "RHPS was convened by practitioners who had each already spent a career on one piece of this problem, hospital operations, clinical care, funding capture, before ever being in a room together. RHPS has not yet formed a legal entity; the founding group works together under a founding working agreement.",
  ctaLine: "See the full team, organized by domain of expertise, on Our People.",
  ctaHref: "/our-people",
};

export const homepageCta: CtaContent = {
  eyebrow: "Get in Touch",
  headline: "Start a conversation",
  body: "If you run a rural hospital or health system, a behavioral health program, a state RHTP office, a VoTech center, or an EMS agency, and want to talk through what it would take to make sure your patients' care doesn't stop at a referral, reach out directly.",
  buttonLabel: "Start a Conversation",
  buttonHref: "/contact",
};
