import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.6 Sector: VoTech & Clinical Training Partners, then given a revision pass:
//
// (2026-07-13) repositioning: matches homepage.ts / about.ts / hospitals.ts —
// Brady flagged an unresolved legal question about RHPS helping capture
// grant funding and then being paid, from that same funding, to deliver the
// service it funds, plus an honesty concern (RHPS doesn't yet have a track
// record of actually completing that cycle). The page moved off the
// Capture/Deliver twofold framing to service-first: RHPS delivers hands-on
// clinical training directly, through practitioners and the Blue Room
// simulation platform, with funding-capture help as a secondary, unpaired
// capability. Hero, Meta, and CTA copy that asserted an active "we capture
// AND deliver, same team" model were softened the same way. The Stakes and
// Matrix bands didn't assert that fused claim, so they're unchanged. The
// Proof band's language about funding capture working best "as a standing
// capability" describes the state program's compressed procurement windows
// in general terms, not an RHPS-specific active track record claim, so it
// didn't need the same correction, matching how hospitalsProof was left
// alone.
//
// (2026-07-14) voice pass, matching homepage.ts's third pass: votechStakes
// now opens with an illustrative scenario (explicitly not a claimed real
// case) showing the "referral vs. care received" gap in workforce-pipeline
// terms — training completed on schedule is not the same as a graduate
// ready to act under rural conditions. votechApproach names that same
// throughline explicitly and keeps its existing local-control line ("RHPS
// does not replace a program's faculty or curriculum authority") as the
// anchor for that framing rather than replacing it. Jargon audit: no
// banned terminology was present ("funding capture" is used descriptively
// here and on homepage.ts/about.ts, not as growth jargon); none
// introduced. Hard rules preserved: no invented outcomes data, no named
// partners, no operating track record.

export const votechMeta: PageMeta = {
  metaTitle: "VoTech & Clinical Training Partners | RHPS",
  metaDescription:
    "RHPS delivers hands-on rural clinical training directly, through practitioners and the Blue Room simulation platform, built for VoTech centers and training partners. We can also help identify grant funding where it applies.",
  primaryCta: "Start a conversation about your training capacity",
  path: "/sectors/votech",
};

export const votechHero: HeroContent = {
  headline:
    "RHPS delivers the hands-on clinical training rural workforce programs need, directly, through practitioners and the Blue Room simulation platform.",
  subhead:
    "Where a training program wants help identifying and pursuing the grant funding that can pay for this work, RHPS can support that too — but the core of what we do is delivering the training itself, so students graduate ready for rural practice.",
};

export const votechStakes: BandContent = {
  headline:
    "CMS requires states to obligate Year 1 funds by October 30, 2026, and to announce Year 2 funding by October 31, 2026, deadlines that move on the state's clock, not a training program's.",
  body: "Picture a nursing student who finishes clinical rotations having covered every item on the checklist, but never once managed a deteriorating patient alone, then takes a first job forty minutes from the nearest specialist. The coursework was completed on schedule. The scenario-based practice that would have prepared that graduate to act under pressure, before a real patient was in front of them, didn't happen. Coursework completed is not the same thing as a graduate ready for rural practice, the same gap that shows up when a referral is made but the care behind it never quite reaches the patient.\n\nThe federal Rural Health Transformation Program is directing $50 billion over five years toward rural health system capacity. As of July 2026, 39 of 50 states have released at least one subrecipient funding opportunity under it. Clinical training and simulation capacity is an eligible use in many of those state plans, but it competes for state agency attention against acute care, specialist access, and infrastructure requests that are easier to score and measure in a grant application.",
};

export const votechMatrix: EntryMatrixContent = {
  headline:
    "RHPS's menu of services is opt-in by design, and two are built directly for training and workforce partners.",
  intro:
    "A training partner works with the capabilities relevant to its program and is not required to take the full menu.",
  groups: [
    {
      label: "Capabilities",
      items: [
        {
          label: "Medical Training & Simulation",
          description:
            "Hands-on clinical training delivered through the Blue Room simulated training platform, built for VoTech centers and training-limited rural communities that need scenario-based practice, not just classroom instruction.",
          href: "/capabilities/medical-training-simulation",
        },
        {
          label: "Workforce Strengthening",
          description:
            "Building and sustaining the people who deliver rural care after they graduate, including first responders, so training investment carries through into a working rural workforce rather than ending at commencement.",
          href: "/capabilities/workforce-strengthening",
        },
      ],
    },
  ],
};

export const votechApproach: BandContent = {
  headline: "What working with RHPS actually looks like for a VoTech center or training partner",
  body: "RHPS practitioners bring the Blue Room simulated training platform directly to a VoTech center or clinical training partner and build scenario-based training around the conditions rural providers actually encounter: limited on-site specialists, longer transport times to higher levels of care, and the need to stabilize and coordinate rather than refer immediately. The goal is a graduate who has practiced the decisions rural practice requires before making them with a real patient. RHPS does not replace a program's faculty or curriculum authority; we add hands-on simulation infrastructure to what the program already teaches, built around the instructors and clinical partnerships the program already relies on.\n\nThe same gap that shows up when a referral doesn't turn into care received shows up in workforce pipelines too: a program can graduate a full class on schedule and still send rural communities providers who haven't practiced the decisions the job actually requires. Closing that gap is the point of the simulation work, not a byproduct of it.\n\nWhere a program wants help identifying and pursuing the state and federal grant dollars available for rural clinical training and simulation capacity, including relevant RHTP subrecipient opportunities, RHPS can also help pursue that funding. That capability sits alongside service delivery, not ahead of it.",
};

export const votechProof: BandContent = {
  headline: "The funding attached to this program is real and moving on a fixed clock.",
  body: "Oklahoma's Year 1 RHTP award was $223.5 million, the fifth-largest in the nation, and procurement windows on awards like it have run roughly six to eight weeks from release to submission deadline, far shorter than the timeline most training programs plan grant-writing around. CMS requires states to obligate Year 1 funds by October 30, 2026, and to announce Year 2 funding by October 31, 2026. Windows this narrow are why funding capture works best as a standing capability, not a project a training program stands up once a year when a notice happens to cross a dean's desk.",
};

export const votechCta: CtaContent = {
  headline: "Start with a conversation about your training capacity, not a funding pitch.",
  body: "The fastest useful step is a direct conversation about where your clinical training and simulation gaps actually are, and what delivering against them, through the Blue Room platform, would look like. Where funding support would help too, we'll cover that in the same conversation.",
  buttonLabel: "Start a conversation about your training capacity",
  buttonHref: "/contact",
};
