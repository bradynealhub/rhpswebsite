import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.13 Capability: Workforce Strengthening, then repositioned
// (2026-07-13) off the Capture/Deliver twofold framing (legal + honesty
// concerns, see homepage.ts's header comment for the full rationale):
// "workforceFit" moved off "capturing the funding and building the people
// ... treated as one piece of work" to a direct-delivery framing, with
// funding-capture help kept as a secondary, unpaired capability.
//
// (2026-07-14) voice pass, matching homepage.ts's and about.ts's third
// pass, per Brady's review of a rural-health policy positioning brief.
// "workforceContext" already grounded the gap in patient impact
// (illustrative, not a claimed real case) — preserved, and its closing
// line now carries the throughline as an analogous echo ("a fully funded
// program is not the same as a person on shift to run it"), since this
// capability has no literal "referral" to anchor the exact phrase to.
// "workforceMechanics" and "workforceFit" both picked up local-control
// language (built around the staff and shifts an organization already
// has, not in place of them) and a second funding-vs-delivery echo in
// "workforceFit" ("a grant awarded is not the same as a shift covered").
// Funding-capture stays secondary and unpaired — not re-touched. No hard
// rules changed.

export const workforceMeta: PageMeta = {
  metaTitle: "Workforce Strengthening | RHPS",
  metaDescription:
    "RHPS builds and sustains the rural healthcare workforce, from first responders to clinical staff, closing gaps that funding and facilities alone cannot fix.",
  primaryCta: "Start a conversation about a workforce gap you're trying to close",
  path: "/capabilities/workforce-strengthening",
};

export const workforceHero: HeroContent = {
  eyebrow: "Capability / Workforce Strengthening",
  headline:
    "Rural health systems do not fail for lack of buildings. They fail for lack of people able and willing to stay in them.",
  subhead:
    "Workforce Strengthening builds and sustains the people who keep rural care running, from first responders and EMS crews to the clinical and administrative staff holding a rural facility together, so the workforce delivering rural care is never the next gap in it.",
};

export const workforceContext: BandContent = {
  headline:
    "A rural hospital can have funding, equipment, and a community that needs it, and still not have enough people to keep a given shift covered.",
  body: "That gap is not an abstraction to the patient on the other side of it. A vacant EMS slot is a slower ambulance. An unfilled nursing shift is a longer wait or a diverted transfer. A training-limited program near a rural community is one less clinician who eventually practices there. Workforce shortage is not a staffing statistic.",
  closingLine:
    "It is the reason a patient does or does not get seen. A fully funded program is not the same as a person on shift to run it, and workforce is the piece every other service RHPS delivers, case management, specialist access, training, depends on someone being there to provide.",
};

export const workforceMechanics: BandContent = {
  headline:
    "RHPS practitioners work directly with rural hospitals, EMS and first-responder agencies, and training partners to identify where a workforce gap is costing patients care, then build the specific intervention that closes it.",
  body: "That work is built around the staff and shifts an organization already has, not around replacing them with an outside team: recruitment and retention support for hard-to-fill clinical and administrative roles, structured training pathways for first responders and allied health staff, and continuing education that keeps existing staff current and licensed rather than lost to burnout or lapsed credentials. Where hands-on clinical skills are the gap, Workforce Strengthening runs alongside Medical Training & Simulation, which supplies the simulated training infrastructure those pathways rely on. The work is scoped to what a given organization's workforce actually needs today, not delivered as a standard package applied the same way everywhere.",
};

export const workforceFit: BandContent = {
  headline:
    "Workforce development is an eligible use of RHTP and aligned state grant dollars in a number of states, and it is one of the categories most likely to sit unclaimed simply because a rural organization's staff had no time to chase the application while also covering shifts.",
  body: "RHPS delivers the workforce program itself directly, as practitioners who have staffed rural facilities and trained the people who keep them running. A grant awarded is not the same as a shift covered, and a funded position is not the same as a person trained, willing, and still there a year later. RHPS can also help identify and pursue that funding, for organizations that want that support, so a hospital or agency is not left to shelve a workforce initiative because no one could get to the grant that would have paid for it. That capability sits alongside the workforce program itself, not ahead of it.",
};

export const workforceWhoItsFor: EntryMatrixContent = {
  headline:
    "Workforce Strengthening serves rural and critical access hospitals and health systems building a staffing model that holds up shift to shift, EMS and first-responder agencies working to keep crews staffed and current, and VoTech centers and clinical training partners expanding the pipeline of caregivers who go on to practice rurally.",
  intro:
    "See how this capability fits your organization's broader needs on the Hospitals & Health Systems, EMS & First Responders, and VoTech & Training Partners pages.",
  groups: [
    {
      label: "See how this fits your organization",
      items: [
        { label: "Rural & Critical Access Hospitals", href: "/sectors/hospitals" },
        { label: "EMS & First Responder Agencies", href: "/sectors/ems" },
        {
          label: "VoTech Centers & Clinical Training Partners",
          href: "/sectors/votech",
        },
      ],
    },
  ],
};

export const workforceCta: CtaContent = {
  headline:
    "If a workforce gap, a hard-to-fill role, a first-responder training pipeline, a retention problem no amount of funding alone will fix, is standing between your organization and the care it's supposed to deliver, talk to RHPS about it directly.",
  body: "Start a conversation about a workforce gap you're trying to close.",
  buttonLabel: "Start a conversation about a workforce gap you're trying to close",
  buttonHref: "/contact",
};
