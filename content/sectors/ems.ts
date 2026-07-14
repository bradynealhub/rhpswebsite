import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.7 Sector: EMS & First Responder Agencies, then given a revision pass:
//
// (2026-07-13) repositioning: matches homepage.ts / about.ts / hospitals.ts —
// moved off the Capture/Deliver twofold framing (legal + honesty concerns,
// see homepage.ts's header comment for the full rationale). This page's
// hero and meta description were the most explicit case of the fused claim
// on any sector page: both literally said RHPS "pairs RHTP funding capture
// with direct workforce strengthening and hands-on clinical training" —
// rewritten to lead with the training/workforce delivery work RHPS actually
// does, with funding-capture help repositioned as something an agency can
// add on, not something paired into the offer by default.
//
// emsTwofold (Capture half / Delivery half, with a "pursue funding capture
// and training together, or start with one and add the other later"
// closing line) is replaced by emsApproach: direct delivery first, funding
// help as a secondary, unpaired capability, with the "menu, not a mandate"
// idea preserved in the body.
//
// The Proof band claimed RHPS's practitioners are "directly engaged in
// pursuing RHTP subrecipient funding today," giving the group "first-hand,
// current familiarity with exactly this capture process" — an active
// capture track record RHPS doesn't have yet. Softened to the same
// Oklahoma-based operational/training credibility used on hospitals.ts and
// state-agencies.ts, with the Oklahoma award and procurement-window facts
// left unchanged.
//
// (2026-07-14) voice pass, matching homepage.ts's third pass: emsStakes now
// opens with an illustrative rural-county scenario (explicitly not a
// claimed real case) to show the gap in patient terms before the funding
// stats; emsHero and emsApproach pick up homepage.ts's local-control
// language (RHPS builds around the crew, medical director, and protocols an
// agency already runs on, rather than replacing them). The page's existing
// "grant dollars alone do not build a bigger team" framing already carried
// the "referral vs. care received" throughline in EMS-specific terms
// (funding secured is not the same as a crew trained to use it) — left
// intact and made explicit in one place rather than re-derived. Jargon
// audit: no banned terminology was present; none introduced. Hard rules
// preserved: no invented outcomes data, no named partners, no operating
// track record.

export const emsMeta: PageMeta = {
  metaTitle: "EMS & First Responder Agencies | RHPS",
  metaDescription:
    "RHPS delivers hands-on clinical training and workforce strengthening directly to rural EMS agencies, so they can take on expanded scope, including community paramedicine, without adding headcount. We can also help identify RHTP funding where it applies.",
  primaryCta: "Start a conversation about your agency's capacity and RHTP eligibility",
  path: "/sectors/ems",
};

export const emsHero: HeroContent = {
  headline:
    "EMS agencies are being asked to do more with the crew they already have. Grant dollars alone do not build a bigger team or train the one you have.",
  subhead:
    "RHPS delivers direct workforce strengthening and hands-on clinical training, built around the crew and protocols your agency already runs on, not a replacement for them, so a first responder agency can take on expanded scope, including community paramedicine, without adding headcount it does not have. RHPS can also help identify and pursue the RHTP funding that pays for it, for agencies that want that support.",
};

export const emsStakes: BandContent = {
  headline:
    "For most rural EMS and first responder agencies, that funding is arriving faster than the workforce available to use it.",
  body: "Picture a rural county where a 911 call for chest pain has meant a twenty-minute wait for the nearest ALS unit. A new RHTP award funds a community paramedicine program meant to close that gap. The money clears. The medics who would run the program are the same three or four already covering every call, every shift, every mutual-aid request, with no hours left over to stand up something new. A grant awarded is not the same thing as a program a community can count on.\n\nThe federal Rural Health Transformation Program is a $50 billion, five-year program, and as of July 2026, 39 of 50 states have released at least one subrecipient funding opportunity under it. Community paramedicine, mobile integrated health, and expanded follow-up care are being asked of agencies running on that same thin crew. The constraint most agencies face right now is not whether funding exists. It is whether anyone on staff has the hours to pursue it, and whether the crew has the training to safely take on the expanded work once it's funded.",
};

export const emsMatrix: EntryMatrixContent = {
  headline: "Two parts of the RHPS menu apply directly to first responder agencies.",
  groups: [
    {
      label: "Capabilities",
      items: [
        {
          label: "Workforce Strengthening",
          description:
            "Building and sustaining the people who deliver rural care, including first responders. This is the anchor service for EMS: capacity planning, retention support, and expanded-scope training built around the staffing an agency actually has, not the staffing a grant application assumes it has.",
          href: "/capabilities/workforce-strengthening",
        },
        {
          label: "Medical Training & Simulation",
          description:
            "Hands-on clinical training delivered through the Blue Room simulated training platform, built for VoTech centers and training-limited rural communities. For EMS crews, this means scenario-based skills training that doesn't require pulling a medic off shift for a week to travel to it.",
          href: "/capabilities/medical-training-simulation",
        },
      ],
    },
  ],
};

export const emsApproach: BandContent = {
  headline: "What working with RHPS actually looks like for your agency",
  body: "RHPS practitioners, not a training vendor, deliver the workforce strengthening and Blue Room simulation training your agency needs directly: capacity planning, retention support, and expanded-scope training built around the staffing an agency actually has, not the staffing a grant application assumes it has. Training is scheduled around actual shift rotations, not the other way around. The goal is a crew that can safely take on expanded scope, not a certificate that sits in a binder.\n\nRHPS builds around the crew, medical director, and protocols your agency already has, not around replacing them. A grant secured is not the same thing as a program your community can rely on; the aim is a crew that can actually deliver the expanded scope, not just a funded line item for it.\n\nWhere your agency wants help identifying and pursuing the RHTP subrecipient funding that can pay for workforce development, training infrastructure, or community paramedicine program design, RHPS can support that too. That capability sits alongside service delivery, not ahead of it — an agency can start with training or workforce support alone and add funding help later, depending on what capacity actually allows this year.",
};

export const emsProof: BandContent = {
  headline:
    "RHTP procurement windows have run roughly six to eight weeks from opening to close, a tight timeline for an agency without dedicated grant staff.",
  body: "States must obligate Year 1 RHTP funds by October 30, 2026, and CMS announces Year 2 funding by October 31, 2026, which sets a real, near-term clock on when this money is usable. Oklahoma's Year 1 RHTP award, at $223.5 million, is the 5th largest in the nation, giving a sense of the scale states are working with. RHPS's founding practitioners are currently based in Oklahoma, with direct experience in rural hospital operations and clinical training, in exactly the environment these RHTP timelines are running in.",
};

export const emsCta: CtaContent = {
  headline:
    "If your agency is being asked to expand scope without an expanded roster, the first step is a direct conversation, not a proposal.",
  body: "RHPS practitioners will walk through your current crew capacity, what funding may be available under your state's RHTP process, and whether workforce strengthening, Blue Room training, or both make sense for where your agency is today.",
  buttonLabel: "Start a conversation about your agency's capacity and RHTP eligibility",
  buttonHref: "/contact",
};
