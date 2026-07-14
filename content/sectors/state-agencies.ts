import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.5 Sector: State Health Agencies & RHTP Programs, then given a revision
// pass:
//
// (2026-07-13) repositioning: matches homepage.ts / about.ts / hospitals.ts —
// moved off the Capture/Deliver twofold framing (legal + honesty concerns,
// see homepage.ts's header comment for the full rationale) to a
// delivery-and-reporting framing. The old stateAgenciesTwofold explicitly
// argued that "the group that would deliver a state's funded services is
// the same group that understands how to move through a state's
// application and reporting requirements, because it is doing so as a
// matter of course" — the exact fused capture+deliver claim Brady flagged.
// Replaced with stateAgenciesApproach: RHPS's role with a state is delivery
// and reporting, full stop; individual practitioners' separate experience
// helping other rural organizations pursue RHTP subrecipient funding is
// mentioned once, as a secondary fact about the people, not something
// bundled into what RHPS offers a state.
//
// The Proof band went further than hospitals.ts's equivalent: it asserted
// the founding group is "actively working inside a live state RHTP
// procurement process" with "current delivery work ... operating inside
// exactly that timeline" — an active capture-to-delivery track record RHPS
// doesn't have yet. Softened to the same Oklahoma-award/procurement-window
// facts used on hospitals.ts (state program conditions, not an RHPS
// track-record claim), dropping the operating-track-record language.
//
// Hero and meta description were already delivery/reporting-framed with no
// capture claim ("a delivery and reporting partner ... built to mobilize
// inside short procurement windows, deliver the services the funding is
// meant to pay for"), so both are left unchanged.
//
// (2026-07-14) voice pass, per Brady's review of a rural-health policy
// positioning brief, matching the same pass on homepage.ts / about.ts /
// hospitals.ts: stateAgenciesStakes now opens with a brief illustrative
// patient grounding (explicitly not a claimed real case) before the CMS
// timeline facts, tying a state's subrecipient accountability directly to
// the "referral vs. care received" throughline established on
// homepage.ts. stateAgenciesApproach adds explicit local-control language
// (RHPS builds around the providers and organizations a state's
// communities already know and trust, rather than replacing them) and
// notes — without claiming any new service — that the same referral-vs-
// care-received gap shows up in chronic disease management, behavioral
// health, and workforce pipelines, categories already on RHPS's existing
// capability menu (case management, acute specialist lines, workforce
// strengthening). This remains a delivery-and-reporting page written for
// an institutional audience (state agencies, not patients); the prior
// pass's separation of delivery from funding-capture assistance is
// unchanged, and funding capture stays a secondary, unpaired mention. No
// banned-vocabulary terms were present in this file to begin with. Hard
// rules preserved: no claimed operating track record, no named partners,
// no individual names, no legal entity implied.

export const stateAgenciesMeta: PageMeta = {
  metaTitle: "State RHTP Programs | RHPS, A Practitioner-Led Delivery and Reporting Partner",
  metaDescription:
    "RHPS mobilizes inside short RHTP procurement windows, delivers the funded service directly, and reports consistently, a model built for any state RHTP program, not one state's award.",
  primaryCta: "Start a conversation about subrecipient capacity",
  path: "/sectors/state-agencies",
};

export const stateAgenciesHero: HeroContent = {
  headline:
    "State RHTP programs are judged on what their subrecipients deliver, not just on what they were awarded. That accountability does not end when the award is announced.",
  subhead:
    "RHPS is a delivery and reporting partner for state rural health transformation programs, run by practitioners and built to mobilize inside short procurement windows, deliver the services the funding is meant to pay for, and report on that delivery consistently, not sporadically, so that what a state funds turns into care patients actually receive, not just a portfolio of referrals.",
};

export const stateAgenciesStakes: BandContent = {
  headline: "That timeline does not end at the point of award.",
  body: "Picture a rural patient whose discharge plan calls for a cardiology follow-up more than an hour away, or a family waiting on a behavioral health referral that never gets scheduled. A referral is not the same thing as care received, and a state's subrecipients are the last link between a funded program and whether that patient actually gets the care they were told they'd get.\n\nCMS is administering the Rural Health Transformation Program (RHTP) as a $50 billion, five-year program executed through the states. As of July 2026, 39 of 50 states have released at least one subrecipient funding opportunity. States must obligate their Year 1 funds by October 30, 2026, and CMS announces each state's Year 2 funding the following day, October 31, 2026.\n\nA state's selection decisions carry forward past the procurement window itself: a subrecipient that mobilizes slowly, or that stops reporting after intake, becomes work the state has to account for, not just the subrecipient's own shortfall. State agencies are making these selection decisions inside that same short window, with the Year 1 deadline already close behind them.",
};

export const stateAgenciesMatrix: EntryMatrixContent = {
  headline:
    "RHTP subrecipient portfolios typically need to demonstrate capacity across more than one category of service.",
  intro:
    "A state does not need to use all of these to work with RHPS. Agencies select what a given award, region, or subrecipient gap actually requires.",
  groups: [
    {
      label: "Capabilities",
      items: [
        {
          label: "Discharge Placement Platform",
          description:
            "A placement marketplace connecting hospital discharge follow-up needs directly to participating providers, moving toward a patient-held, portable consent and coordination layer that travels with the patient across providers.",
          href: "/capabilities/discharge-placement",
        },
        {
          label: "Acute Specialist Lines",
          description:
            "Connecting rural patients to specialists they cannot reach locally, a gap RHTP dollars are frequently directed at closing.",
          href: "/capabilities/acute-specialist-lines",
        },
        {
          label: "Case Management for Rural Oklahoma",
          description:
            "Coordinated case management that reduces gaps and guesswork in patient follow-up; RHPS's current, named service line for this work.",
          href: "/capabilities/case-management",
        },
        {
          label: "Medical Training & Simulation",
          description:
            "Hands-on clinical training delivered through the Blue Room simulated training platform, built for VoTech centers and training-limited rural communities.",
          href: "/capabilities/medical-training-simulation",
        },
        {
          label: "Workforce Strengthening",
          description:
            "Building and sustaining the people who deliver rural care, including first responders.",
          href: "/capabilities/workforce-strengthening",
        },
      ],
    },
  ],
};

export const stateAgenciesApproach: BandContent = {
  headline: "What working with RHPS actually looks like for a state RHTP program",
  body: "RHPS delivers the funded service directly, as practitioners, not as a software platform or a referral list handing the work off to someone else. When a hospital's discharge follow-up capacity is funded, RHPS's participating providers pick up that work. When a training gap is funded, RHPS delivers the training. RHPS builds around the providers and organizations a state's communities already know and trust, rather than replacing them; a state is not managing a vendor relationship one layer removed from the actual care, it is working with the group doing the work, alongside the local providers that work already runs through.\n\nThe same distance between a referral and care received that shows up in post-discharge follow-up turns up elsewhere in a subrecipient portfolio too: in chronic disease management, in behavioral health and recovery referrals, and in workforce and training pipelines that don't reach the people who need them. RHPS's discharge placement, case management, training and simulation, and workforce strengthening work are built against that same pattern, wherever a state's award calls for them.\n\nReporting is treated as part of the service, not an afterthought delivered on request. Silence between an intake call and an annual report is the pattern this model is built to avoid: RHPS produces a consistent, ongoing account of what was delivered, to whom, and against what funded scope, on a cadence a state can rely on for its own reporting to CMS.\n\nSeparately, individual RHPS practitioners have direct experience helping rural organizations identify and pursue RHTP subrecipient funding. That capability sits alongside RHPS's delivery and reporting work for a state; it is not fused into it, and a state does not need it to work with RHPS as a delivery partner.",
};

export const stateAgenciesProof: BandContent = {
  headline: "The environment RHPS is built for is already live in Oklahoma.",
  body: "Oklahoma's Year 1 RHTP award, at $223.5 million, is the 5th largest in the nation, and its subrecipient procurement windows have run roughly six to eight weeks from opening to award. Those are the conditions state RHTP programs are operating under right now, in Oklahoma and, as more of the 39 states move, elsewhere too: short windows, hard federal deadlines, and awards large enough to matter.\n\nRHPS's founding practitioners are currently based in Oklahoma, with direct hospital operations and clinical experience in exactly that environment. That is the basis for a delivery-and-reporting model any state RHTP program can use, not a claim of an already-completed capture-to-delivery cycle. The mechanics of moving from a short procurement window to funded delivery and clean reporting are the same mechanics regardless of which state's program is running the clock.",
};

export const stateAgenciesCta: CtaContent = {
  headline:
    "State RHTP administrators do not need a sales pitch; they need a delivery partner they can vet before a procurement window closes.",
  body: "RHPS's founding practitioners are available for a direct conversation about subrecipient capacity, current work, and how the reporting relationship would function in practice, before any funding decision is made. There is no request attached to that conversation beyond the conversation itself.",
  buttonLabel: "Start a conversation about subrecipient capacity",
  buttonHref: "/contact",
};
