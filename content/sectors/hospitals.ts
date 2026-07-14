import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy originally transcribed verbatim from
// RHPS_Website_Content_and_Layout_Strategy_v3.docx §4.3 Sector: Rural &
// Critical Access Hospitals, then given revision passes:
//
// (2026-07-13, first pass) tone: the hero/stakes opening led with
// alarmist, presumptuous framing ("every board asks whether the hospital
// will still be open," "keeping your board up at night") — reframed as an
// observational statement of the same structural gap. "owed" -> "eligible
// for".
//
// (2026-07-13, second pass) repositioning: matches homepage.ts — moved off
// the Capture/Deliver twofold framing (legal + honesty concerns, see that
// file's header comment) to service-first: RHPS delivers discharge
// placement and case management directly, funding help is a secondary,
// unpaired capability. The Proof band's Oklahoma procurement-environment
// facts are unchanged — those describe the state program, not an RHPS
// track record claim, so they didn't need the same correction.
//
// (2026-07-14, third pass) voice pass, per Brady's review of a rural-health
// policy positioning brief, matching the same pass on homepage.ts and
// about.ts: hospitalsStakes now opens with an illustrative patient
// scenario before the funding-window facts (explicitly not a claimed real
// case — RHPS has no operating track record yet), using the "referral vs.
// care received" framing established on homepage.ts as a throughline.
// hospitalsApproach adds explicit local-control language (RHPS builds
// around the providers a hospital already relies on, not around replacing
// them). This page stays the sector-page template other sector pages were
// modeled on — hospitalsMatrix's "menu, not mandate" framing and the
// funding-as-secondary-capability structure from the prior pass are
// preserved unchanged. No banned-vocabulary terms (full-stack, capture
// engine, monetization, coordination gap, etc.) were present in this file
// to begin with. Hard rules preserved: no claimed operating track record,
// no named partners, no individual names.

export const hospitalsMeta: PageMeta = {
  metaTitle: "Rural & Critical Access Hospitals | RHPS",
  metaDescription:
    "RHPS delivers discharge placement and case management work to rural hospitals, directly, as practitioners who have run rural hospitals themselves, so a discharge order turns into care the patient actually receives. We can also help identify grant funding where it applies.",
  primaryCta: "Talk to RHPS about your hospital's discharge and case management gaps",
  path: "/sectors/hospitals",
};

export const hospitalsHero: HeroContent = {
  headline:
    "RHPS delivers the discharge placement and case management work rural hospitals need, directly, run by people who have run rural hospitals themselves.",
  subhead:
    "Where a hospital wants help identifying and pursuing the grant funding that can pay for this work, RHPS can support that too — but the core of what we do is delivering the service itself, so a discharge or a referral is followed by care, not left for the patient to chase down.",
};

export const hospitalsStakes: BandContent = {
  eyebrow: "Where Discharge Breaks Down",
  headline:
    "A discharge order is not the same thing as a patient who actually gets the follow-up care they were told they need.",
  body: "Picture a patient leaving your hospital after a cardiac admission. The discharge plan calls for a cardiology follow-up, medication management, and nutrition support. The nearest cardiologist is more than an hour away. The patient leaves with a stack of paperwork, a handful of phone numbers, and the job of assembling the rest of their own care.\n\nThe discharge order was written. The care was not yet delivered. That same gap shows up elsewhere in a hospital's work too: a specialist referral that never gets scheduled, a staffing shortfall that turns into a care gap. It's also what shows up later, in readmission numbers and follow-up compliance, long after the discharge itself is behind you.\n\nThe federal Rural Health Transformation Program is a five-year, $50 billion program built to put new money behind closing gaps like this. As of July 2026, 39 of the 50 states have already released at least one subrecipient funding opportunity under it. CMS requires states to obligate their Year 1 dollars by October 30, 2026, and will announce Year 2 funding by October 31, 2026. Funding alone doesn't close the gap between a discharge order and a patient who actually gets there. For a hospital that has never had the staff to pursue a grant like this, the money is real and available. So is the deadline.",
};

export const hospitalsMatrix: EntryMatrixContent = {
  headline: "What your hospital can put to work",
  intro:
    "Two of these answer the felt need directly. The rest round out what a rural hospital typically needs alongside them.",
  groups: [
    {
      label: "Capabilities",
      items: [
        {
          label: "Discharge Placement",
          note: "direct answer",
          description:
            "Coordinating where a patient goes after they leave your hospital, so a discharge isn't a dead end. The model is evolving toward giving the patient a portable record of their own care needs and consent, one that travels with them to the next provider instead of getting re-created at every stop.",
          href: "/capabilities/discharge-placement",
        },
        {
          label: "Case Management for Rural Oklahoma",
          note: "direct answer",
          description:
            "Coordinated follow-up that closes the gaps and guesswork after a patient leaves your care. Named for where it currently runs; built to extend to other states as the model does.",
          href: "/capabilities/case-management",
        },
        {
          label: "Acute Specialist Lines",
          description:
            "Connecting your patients to specialists they cannot reach locally, without your hospital having to recruit or house that specialty itself.",
          href: "/capabilities/acute-specialist-lines",
        },
        {
          label: "Workforce Strengthening",
          description:
            "Building and sustaining the people who deliver rural care, so a staffing gap doesn't become a care gap.",
          href: "/capabilities/workforce-strengthening",
        },
      ],
    },
  ],
};

export const hospitalsApproach: BandContent = {
  headline: "What working with RHPS actually looks like for your hospital",
  body: "RHPS practitioners deliver discharge placement and case management work directly: coordinating where a patient goes after they leave your hospital, and following up so that patient doesn't fall through the gap between your hospital and whatever comes next. We do not decide how care is delivered at your hospital, and we build around the providers and organizations your hospital already relies on, not around replacing them. We make sure that when care changes hands, whether that's a discharge, a transfer, or a referral, it reaches the patient instead of stopping at the referral itself.\n\nWhere your hospital wants help identifying and pursuing the Rural Health Transformation Program or aligned state grant dollars it's eligible for, RHPS can support that too. That capability sits alongside service delivery, not ahead of it.",
};

export const hospitalsProof: BandContent = {
  headline: "What this looks like in practice",
  body: "In Oklahoma, where the founding group is currently based, the state's Year 1 Rural Health Transformation Program award is $223.5 million, the fifth-largest in the nation, and its procurement windows for subrecipient funding have run roughly six to eight weeks from opening to close. Those are the conditions rural hospitals are operating under right now, in Oklahoma and, as more of the 39 states move, elsewhere too: short windows, hard federal deadlines, and awards large enough to matter, for a hospital that has a delivery partner ready to move.\n\nDischarge placement and case management are built for exactly that environment: getting from a discharge order to care the patient actually receives, inside the timeline a hospital is already working against.",
};

export const hospitalsCta: CtaContent = {
  headline: "Start with a conversation, not a proposal.",
  body: "The fastest useful step is a direct conversation about where your discharge and follow-up gaps actually are, and what it would take to make sure a discharge order turns into care your patient actually receives. We'll tell you plainly what we see and what's realistic on your timeline, not a boilerplate proposal.",
  buttonLabel: "Talk to RHPS about your hospital's discharge and case management gaps",
  buttonHref: "/contact",
};
