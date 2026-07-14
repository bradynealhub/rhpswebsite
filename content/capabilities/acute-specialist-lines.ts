import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.10 Capability: Acute Specialist Lines, then repositioned (2026-07-13)
// off the Capture/Deliver twofold framing (legal + honesty concerns, see
// homepage.ts's header comment for the full rationale): "specialistFit"
// moved off "RHPS captures that funding... as the first half of the
// model... by the same group" to a direct-delivery framing, with
// funding-capture help kept as a secondary, unpaired capability.
//
// (2026-07-14) voice pass, matching homepage.ts's third pass:
// specialistContext (already patient-grounded from the prior pass) lightly
// sharpened so the closing line names the "referral vs. care received"
// distinction directly; specialistFit adds explicit local-control language
// (the line runs to specialists and health systems a hospital already
// refers to, not a new network meant to replace those relationships) and
// the same "care completed" throughline. Also caught and fixed two residual
// spots where funding-capture had drifted back into paired phrasing with
// delivery, contrary to the hard rule that funding-capture stay a
// secondary, unpaired mention: specialistMeta's metaDescription dropped
// "paired with the funding that pays for it," and specialistCta's headline
// dropped "and funding it" — both echoed the "capture funding + deliver it,
// same engagement" framing the 2026-07-13 pass was meant to remove
// site-wide; funding help still appears, just kept to its own sentence in
// specialistFit as before. No banned vocabulary (full-stack, capture
// engine, monetization, etc.) was present otherwise. Hard rules preserved:
// no claimed operating track record, no named partners.

export const specialistMeta: PageMeta = {
  metaTitle: "Acute Specialist Lines | RHPS",
  metaDescription:
    "RHPS builds and staffs direct specialist connections for rural hospitals whose patients cannot reach acute specialist care locally, delivered by practitioners who have run rural hospitals and treated these same patients themselves.",
  primaryCta: "Start a conversation about your specialist access gaps",
  path: "/capabilities/acute-specialist-lines",
};

export const specialistHero: HeroContent = {
  eyebrow: "Capability / Acute Specialist Lines",
  headline:
    "A rural patient who needs a specialist does not stop needing one because the nearest one is three hours away.",
  subhead:
    "RHPS connects rural patients to the acute specialist care they cannot reach locally, built and coordinated by practitioners who have run rural hospitals and treated these same patients themselves, not a referral directory or a booking tool.",
};

export const specialistContext: BandContent = {
  headline:
    "Rural and critical access hospitals routinely see patients whose acute needs exceed what an on-site team can treat: a stroke that needs neurology, a cardiac event that needs interventional cardiology, a complex fracture that needs orthopedic surgery no one on staff performs locally.",
  body: "In an urban system, the next step is a hallway away. In a rural one, it is a referral that may take weeks to schedule, a drive of hours the patient may not be able to make, or a specialist relationship the hospital has never had reason to build.\n\nThe result is not a staffing problem to be optimized. It is a patient whose care plan stalls at exactly the point it matters most.",
  closingLine:
    "A referral out is not the same as care received. We do not decide how care is delivered. We make sure that when it changes hands, care still reaches the patient, and that the rural provider who identified the need is not left to solve it alone.",
};

export const specialistMechanics: BandContent = {
  headline:
    "RHPS works with a rural hospital or health system to identify where its acute specialist gaps actually sit, by service line, by frequency, by what already routes out of the community informally, and builds a direct connection into specialist care for those specific gaps.",
  body: "That connection is staffed and maintained by RHPS, not handed off as a list of phone numbers.\n\nConcretely, that means: establishing a working line into specialist coverage for the gaps a given hospital names as its priority; coordinating the handoff, scheduling, and any telehealth or travel logistics a referral requires; and closing the loop back to the referring rural provider so the patient's original care team knows what happened and what comes next. The work is practitioner-run: coordinated by people who have sat on the referring side of exactly this problem, not a software layer sold to hospitals to manage on their own.",
};

export const specialistFit: BandContent = {
  headline:
    "Care coordination and specialist referral are an established category. RHPS is not claiming to have invented it.",
  body: "What RHPS adds is a bench that has run the rural side of this exact problem: specialist lines built and staffed directly by practitioners, not handed to a hospital as a list of vendors to manage on its own. The line runs to specialists and health systems a hospital already refers to, informally or otherwise, not a new network meant to replace those relationships — the goal is a referral that ends in care completed, not a name and a phone number the patient has to chase down alone.\n\nSpecialist access gaps are frequently the kind of need state RHTP grant dollars and aligned funding streams are built to address. RHPS can also help identify and pursue that funding, for organizations that want that support, so a grant a hospital wins is not left waiting on a program the hospital has to build from nothing. That capability sits alongside service delivery, not ahead of it.",
};

export const specialistWhoItsFor: EntryMatrixContent = {
  headline:
    "Acute Specialist Lines is built primarily for rural and critical access hospitals and health systems working to close specific, named specialist gaps for their patients.",
  intro:
    "It is also directly relevant to state health agencies and RHTP grant administrators evaluating how specialist access funding gets translated into an operating service, and to EMS and first-responder agencies whose acute transport and triage decisions depend on where specialist care is actually reachable.\n\nSee the Hospitals & Health Systems, State Agencies, and EMS & First Responders sector pages for how this capability fits into each audience's specific version of the funding-and-delivery problem.",
  groups: [
    {
      label: "See how this fits your organization",
      items: [
        { label: "Hospitals & Health Systems", href: "/sectors/hospitals" },
        {
          label: "State Health Agencies & RHTP Programs",
          href: "/sectors/state-agencies",
        },
        { label: "EMS & First Responder Agencies", href: "/sectors/ems" },
      ],
    },
  ],
};

export const specialistCta: CtaContent = {
  headline:
    "If your hospital has a specialist gap you can already name, cardiology, neurology, orthopedics, or another service line your patients routinely have to leave the community for, start a conversation with RHPS about what actually closing it would take.",
  body: "Start a conversation about your specialist access gaps.",
  buttonLabel: "Start a conversation about your specialist access gaps",
  buttonHref: "/contact",
};
