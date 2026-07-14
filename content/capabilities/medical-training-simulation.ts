import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.12 Capability: Medical Training & Simulation, then repositioned
// (2026-07-13) off the Capture/Deliver twofold framing (legal + honesty
// concerns, see homepage.ts's header comment for the full rationale):
// "trainingFit" moved off "RHPS is built to do both" (capture and deliver,
// paired) to a direct-delivery framing, with funding-capture help kept as
// a secondary, unpaired capability.
//
// (2026-07-14) voice pass, matching homepage.ts's and about.ts's third
// pass, per Brady's review of a rural-health policy positioning brief.
// "trainingContext" already closed on a patient-facing consequence
// (illustrative, not a claimed real case) — preserved, lightly sharpened.
// This capability has no literal "referral," so rather than force that
// exact phrase, "trainingFit" now carries the throughline as an analogous
// echo ("a grant award is not the same as a clinician who can perform the
// skill it paid for"), which also doubles as the funding-vs-delivery
// distinction the band already made. "trainingMechanics" picked up
// local-control language (the program is built around the training
// pathway a VoTech center, hospital, or agency already runs, not in place
// of it). Funding-capture stays secondary and unpaired — not re-touched.
// No hard rules changed.

export const trainingMeta: PageMeta = {
  metaTitle: "Medical Training & Simulation | RHPS",
  metaDescription:
    "Hands-on clinical training via the Blue Room simulated training platform, built for VoTech centers, rural hospitals, and EMS agencies with limited access to simulation infrastructure.",
  primaryCta: "Start a conversation about training",
  path: "/capabilities/medical-training-simulation",
};

export const trainingHero: HeroContent = {
  eyebrow: "Capability / Medical Training & Simulation",
  headline:
    "Rural clinicians, EMS crews, and health-science students often train on equipment and scenarios that don't match the emergencies they will actually face.",
  subhead:
    "Medical Training & Simulation puts hands-on, high-fidelity clinical training within reach of the training-limited communities that need it most, delivered through the Blue Room simulated training platform by practitioners who have staffed rural emergency departments themselves.",
};

export const trainingContext: BandContent = {
  headline:
    "A rural VoTech program preparing its next class of EMTs, or a critical access hospital trying to keep a small clinical staff current on low-frequency, high-stakes procedures, often has none of the simulation infrastructure that urban academic medical centers take for granted.",
  body: "That gap is not abstract. The clinician or first responder who has practiced a cardiac arrest, a mass-casualty triage, or a difficult airway on a high-fidelity manikin responds differently than one who is seeing it for the first time on a real patient. When training access is thin, the risk does not fall on an institution's budget.",
  closingLine:
    "It falls on the next patient who needs that skill performed correctly, once, under pressure, in a community with no larger hospital minutes away to fall back on.",
};

export const trainingMechanics: BandContent = {
  headline:
    "RHPS practitioners work with a VoTech center, hospital, or first-responder agency to identify the specific skills gaps its students or staff need to close, then build a simulation curriculum around them using the Blue Room simulated training platform.",
  body: "The program is built around the training pathway the organization already runs, not in place of it. Sessions are scenario-based and hands-on: trainees work through realistic clinical situations, from routine procedures to low-frequency emergencies, under the direction of practitioners who have treated these cases in real rural settings, not classroom instructors reading from a manual. Training is scheduled around the partner organization's actual constraints, a VoTech class calendar, a hospital's shift patterns, an EMS agency's call volume, rather than requiring the organization to send people away or shut down operations to participate.",
};

export const trainingFit: BandContent = {
  headline:
    "Workforce training is an eligible use of rural health grant dollars in a number of states.",
  body: "Medical Training & Simulation is delivered directly by RHPS practitioners: sessions on the calendar, taught by people who know the material because they have practiced it themselves, not a check that sits in an account. A grant award is not the same as a clinician who can perform the skill it paid for. For a VoTech center or health system that qualifies for funding but has no internal pathway to turn a grant award into an actual training program, RHPS can also help identify and pursue that funding, for organizations that want that support. That capability sits alongside the training program itself, not ahead of it.",
};

export const trainingWhoItsFor: EntryMatrixContent = {
  headline:
    "This capability is built primarily for VoTech centers and clinical training partners working to strengthen their health-science programs, and for rural hospitals, health systems, and EMS and first-responder agencies that need an ongoing way to keep clinical and field skills current without sending staff off-site.",
  intro:
    "Visit the VoTech & Training Partners page or the EMS & First Responders page for how this fits your organization specifically.",
  groups: [
    {
      label: "See how this fits your organization",
      items: [
        {
          label: "VoTech Centers & Clinical Training Partners",
          href: "/sectors/votech",
        },
        { label: "Rural & Critical Access Hospitals", href: "/sectors/hospitals" },
        { label: "EMS & First Responder Agencies", href: "/sectors/ems" },
      ],
    },
  ],
};

export const trainingCta: CtaContent = {
  headline:
    "If your VoTech center, hospital, or agency has a specific skills gap you cannot currently train for, talk to us about what a Blue Room simulation program would look like for your team.",
  body: "Start a conversation about training.",
  buttonLabel: "Start a conversation about training",
  buttonHref: "/contact",
};
