import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.9 Capability: Discharge Placement Platform, then repositioned
// (2026-07-13) off the Capture/Deliver twofold framing (legal + honesty
// concerns, see homepage.ts's header comment for the full rationale):
// "dischargeFit" moved off "RHPS captures the grant funding... the
// platform is how that funding becomes a placement" to a direct-delivery
// framing, with funding-capture help kept as a secondary, unpaired
// capability.
//
// (2026-07-14) voice pass, matching homepage.ts's third pass: dischargeContext
// (already patient-grounded from the prior pass) lightly sharpened to name
// the "referral vs. care received" distinction directly rather than only
// implying it; dischargeFit now carries that same throughline ("care
// completed, not a name on a list") and adds explicit local-control language
// — the platform is built around the home health agencies, therapy
// practices, and specialists a hospital already refers to and trusts, not a
// network meant to replace them. The literal "patient-held consent and
// coordination layer" phrase in dischargeMechanics describes real technical
// architecture (patient-directed exchange standards), not a competitive
// moat claim, and is left untouched per the voice brief's own carve-out.
// No banned vocabulary (full-stack, capture engine, monetization, etc.) was
// present in this file to begin with. Hard rules preserved: no claimed
// operating track record, no named partners, funding-capture stays
// secondary and unpaired.

export const dischargeMeta: PageMeta = {
  metaTitle: "Discharge Placement Platform | RHPS",
  metaDescription:
    "RHPS's Discharge Placement Platform connects hospital discharge follow-up needs directly to the providers who can meet them, and is evolving toward a patient-held consent and coordination layer that travels with the patient across providers.",
  primaryCta: "Start a conversation about your discharge follow-up gaps",
  path: "/capabilities/discharge-placement",
};

export const dischargeHero: HeroContent = {
  eyebrow: "Capability / Discharge Placement Platform",
  headline:
    "A hospital discharge is not the end of care. It is a handoff, and handoffs fail when no one owns them.",
  subhead:
    "The Discharge Placement Platform is where hospitals post discharge follow-up needs and the providers who can meet them pick up the work directly. It is built toward a coordination layer that keeps a patient's consent and care record with them as they move between providers.",
};

export const dischargeContext: BandContent = {
  headline:
    "A rural hospital can discharge a patient in an afternoon and still not know, days later, whether that patient ever saw a home health nurse, picked up durable medical equipment, or made it to a follow-up appointment.",
  body: "The care those patients need usually exists somewhere in the region. What breaks down is the handoff: finding out which provider has capacity, confirming they can take the case, and getting the referral, records, and consent to the right place before the patient falls through.\n\nIn a rural hospital, that handoff work typically lands on whoever has a free hour: a case manager already carrying a full caseload, a discharge planner working a phone list built from memory. This is not a staffing failure specific to any one hospital. It is a coordination problem that scales with how thin the surrounding provider network already is.",
  closingLine:
    "A discharge order is a referral, not care received. We do not decide how care is delivered. We make sure that when it changes hands, hospital to home, hospital to a rehab bed, hospital to specialist follow-up, care still reaches the patient.",
};

export const dischargeMechanics: BandContent = {
  headline:
    "At its core, the Discharge Placement Platform is a placement marketplace.",
  body: "Hospitals and health systems post discharge follow-up needs, home health, durable medical equipment, therapy, specialist follow-up, behavioral health referral, and the providers participating on the platform see relevant open needs and pick them up directly, rather than waiting on a phone tree or a fax. RHPS practitioners, not a call center, staff both sides of that exchange: confirming a need is placement-ready, vetting which providers are positioned to take it, and staying accountable for the placement once it is made.\n\nThe platform's technical direction is moving beyond matching toward something more durable: a patient-held consent and coordination layer, built on open, standards-based patient-directed exchange, so a patient's consent and the relevant pieces of their care record travel with them as they move from the hospital to whichever provider picks up their care, rather than staying locked inside any single system. That layer is in active development. Today's placement marketplace is the foundation it is being built on top of, not a finished product being described ahead of itself.",
};

export const dischargeFit: BandContent = {
  headline:
    "Care coordination and discharge placement are an established part of how health systems already operate; RHPS did not invent the category.",
  body: "What RHPS is building is a rural-specific, practitioner-run version of it: a platform staffed and delivered directly by people who have run rural hospitals themselves, not a standalone tool sold to organizations that are already short on the capacity to implement one. It is built around the home health agencies, therapy practices, and specialists a hospital already refers to and trusts, not a network meant to replace those relationships — the platform's job is to make sure a referral to one of those providers turns into care completed, not a name on a list nobody follows up on.\n\nRHPS can also help identify and pursue the grant funding available to rural health systems for care coordination and discharge follow-up, for organizations that want that support. That capability sits alongside the platform itself, not ahead of it.",
};

export const dischargeWhoItsFor: EntryMatrixContent = {
  headline:
    "The Discharge Placement Platform is built for rural and critical access hospitals and health systems managing discharge follow-up with limited case management capacity, and for the provider organizations, home health agencies, therapy practices, specialists, behavioral health and recovery programs, who want direct visibility into discharge needs they are positioned to meet.",
  intro:
    "See how this fits your organization specifically: Hospitals & Health Systems, Behavioral Health & Recovery Programs, and EMS & First Responder Agencies.",
  groups: [
    {
      label: "See how this fits your organization",
      items: [
        { label: "Hospitals & Health Systems", href: "/sectors/hospitals" },
        {
          label: "Behavioral Health & Recovery Programs",
          note: "sector page pending confirmation",
        },
        { label: "EMS & First Responder Agencies", href: "/sectors/ems" },
      ],
    },
  ],
};

export const dischargeCta: CtaContent = {
  headline:
    "If your hospital or health system is losing track of patients after discharge, talk with us about what the Discharge Placement Platform would look like against your current follow-up gaps.",
  body: "If you're a provider organization with open capacity for discharge referrals, tell us what you can take on and we'll evaluate fit.",
  buttonLabel: "Start a conversation about your discharge follow-up gaps",
  buttonHref: "/contact",
};
