import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.11 Capability: Case Management for Rural Oklahoma, then repositioned
// (2026-07-13) off the Capture/Deliver twofold framing (legal + honesty
// concerns, see homepage.ts's header comment for the full rationale):
// "caseMgmtMeta"'s description and "caseMgmtFit" moved off "funded through
// the grant dollars RHPS captures... the funding and the staffing arrive
// as one relationship" to a direct-delivery framing, with funding-capture
// help kept as a secondary, unpaired capability.
//
// (2026-07-14) voice pass, matching homepage.ts's and about.ts's third
// pass, per Brady's review of a rural-health policy positioning brief.
// This page already opened with a strong patient-grounded "Context" band
// (illustrative scenario, not a claimed real case — preserved as such);
// lightly sharpened rather than replaced. "caseMgmtContext" now states the
// "referral is not the same as care received" throughline explicitly in
// its closing line, and reworded "It is a coordination problem" to "It is
// a continuity problem" to stay clear of coordination-gap-adjacent
// phrasing and to match the "continuity" language already used in
// "caseMgmtMechanics". "caseMgmtMechanics" and "caseMgmtFit" both picked
// up local-control language (this function is built around the hospital's
// and clinic's existing relationships with a patient, not in place of
// them), and "caseMgmtFit" now states "care completed, not merely
// referred" directly. Funding-capture stays a secondary, unpaired mention
// after direct delivery — not re-touched. No hard rules changed: no
// invented outcomes, no named partners, no operating track record.

export const caseMgmtMeta: PageMeta = {
  metaTitle: "Case Management for Rural Oklahoma | RHPS",
  metaDescription:
    "Case Management for Rural Oklahoma: dedicated case managers who track a patient's follow-up path after discharge, referral by referral, delivered directly by RHPS practitioners.",
  primaryCta: "Start a conversation about case management for your organization",
  path: "/capabilities/case-management",
};

export const caseMgmtHero: HeroContent = {
  eyebrow: "Capability / Case Management for Rural Oklahoma",
  headline:
    "A hospital discharge is not the end of care. For a rural patient with no one tracking what happens next, it is often where care quietly stops.",
  subhead:
    "Case Management for Rural Oklahoma assigns a dedicated case manager to follow a patient's path after they leave a hospital bed or an emergency department, appointment by appointment, referral by referral, so a gap in the system does not become a gap in someone's care.",
};

export const caseMgmtContext: BandContent = {
  headline:
    "A discharge plan on paper and a discharge plan a patient actually follows are two different things.",
  body: "In a rural community, the distance between them is wider: the specialist referral might be ninety minutes away, the follow-up appointment might fall during the only shift a patient's ride to work is available, the home health order might never get confirmed because no one called to check.\n\nNone of this is anyone's fault, and none of it is a staffing problem a busy discharge nurse or an overloaded primary care clinic caused on purpose. It is a continuity problem: once a patient leaves the building where the last order was written, no single person is responsible for watching whether the plan on paper becomes the plan they actually follow.",
  closingLine:
    "We do not decide how care is delivered. We make sure that when it changes, hands off, or moves to a different provider, care still reaches the patient — because a referral is not the same thing as care received. That is the job case management exists to do.",
};

export const caseMgmtMechanics: BandContent = {
  headline:
    "A case manager is assigned to a patient's file at the point of referral or discharge, not after something has already gone wrong.",
  body: "From there, the work is direct and specific: confirming the follow-up appointment is actually scheduled, not just ordered; checking whether the patient has a way to get there and whether insurance or paperwork is a barrier before it becomes one; contacting the patient directly to confirm the visit happened; and following up with the referring provider or receiving facility the moment something breaks down, a missed appointment, an unfilled prescription, a referral that stalled, before it turns into a missed diagnosis, a readmission, or a return trip to the emergency department.\n\nThe case manager works with the hospital, specialist, and primary care clinic a patient already has, not around them and not in place of them, and stays a single point of continuity for that patient across however many providers, facilities, and handoffs their care requires. That continuity is the service. It is delivered by RHPS practitioners directly, not routed through a call center or a software dashboard with no one behind it.",
};

export const caseMgmtFit: BandContent = {
  headline:
    "Care coordination and case management are an established practice in healthcare; RHPS is not claiming to have invented either.",
  body: "What RHPS adds is a case management function delivered directly by practitioners, not routed through a call center or a software dashboard with no one behind it, and built around the hospital's and clinic's existing relationships with their patients rather than replacing them. A hospital does not have to build a case management department from a standing start or absorb the cost of one inside an already-thin operating budget. The measure of the function is simple: care completed, not merely referred.\n\nCase management is also one of the service categories rural health transformation funding is designed to pay for, and most rural hospitals and clinics do not have the staff time or the grant-writing capacity to capture that funding themselves. RHPS can help identify and pursue that funding, for organizations that want that support. That capability sits alongside service delivery, not ahead of it.",
};

export const caseMgmtWhoItsFor: EntryMatrixContent = {
  headline:
    "This service is built for organizations whose patients cross-provider, follow-up care is the hardest to hold together with the staff they already have.",
  groups: [
    {
      label: "Who It's For",
      items: [
        {
          label: "Rural and Critical Access Hospitals and Health Systems",
          description:
            "For patients discharged into a follow-up plan with no one at the hospital positioned to confirm it holds.",
          href: "/sectors/hospitals",
        },
        {
          label: "Behavioral Health and Recovery Programs",
          note: "sector page pending confirmation",
          description:
            "For patients whose continuity of care after a treatment episode is often the difference between staying in recovery and returning to crisis.",
        },
        {
          label: "EMS and First-Responder Agencies",
          description:
            "Whose crews are frequently the ones who see, before anyone else, when a patient's follow-up care has quietly stopped happening.",
          href: "/sectors/ems",
        },
      ],
    },
  ],
};

export const caseMgmtCta: CtaContent = {
  headline:
    "If your organization is losing patients between the discharge order and the follow-up visit, that is a specific, solvable problem.",
  body: "Start a conversation with RHPS about what a case management engagement would look like for your patients, what it would take to fund it, and how soon it could be running.",
  buttonLabel: "Start a conversation about case management for your organization",
  buttonHref: "/contact",
};
