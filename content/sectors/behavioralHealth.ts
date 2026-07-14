import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.4 Sector: Behavioral Health & Recovery Programs.
//
// GATED PAGE: per the doc's own reviewer note, this entire page depends on
// two UNCONFIRMED items — Behavioral Health & Recovery as a sector in its
// own right, and as a named capability line. Built and routable, but
// deliberately excluded from lib/siteConfig's primaryNav and marked noindex
// until Brady confirms both. Do not link to this page from any other page's
// nav or matrix beyond the explicit "(Proposed, pending confirmation)"
// mentions already present in other content modules.
//
// (2026-07-13) repositioning: matches homepage.ts / about.ts / hospitals.ts
// / votech.ts — Brady flagged an unresolved legal question about RHPS
// helping capture grant funding and then being paid, from that same
// funding, to deliver the service it funds, plus an honesty concern. This
// page's old Capture/Deliver twofold explainer was the most acute instance
// of that honesty problem on the site: its captureBody asserted, as
// established fact, that "RHPS's founding practitioners have captured RHTP
// and aligned state grant dollars themselves, on behalf of rural
// organizations" — an active RHPS organizational track record Brady says
// doesn't exist yet. That specific claim is dropped, not softened, per the
// site's "no empty rooms" rule. Individual founders' real prior-career
// experience in state RHTP grant administration is a different, still-true
// claim and is preserved. Hero, Meta, and CTA copy that asserted the same
// fused "we capture AND deliver, same team" model were reworked the same
// way as the other sector pages: service delivery (patient-controlled,
// privacy-first care coordination) leads, funding-capture help is a
// secondary, unpaired capability. This pass does not touch the page's
// patient-consent / privacy-first framing, which is a separate, important
// topic addressed elsewhere in the doc — only the capture+deliver framing
// changed. Gating status (noindex, excluded from primaryNav) is untouched;
// this is a copy pass only.
//
// (2026-07-14) voice pass, matching homepage.ts's third pass, with one
// specific flagged fix: behavioralHealthMeta.primaryCta and
// behavioralHealthCta's headline/buttonLabel previously read "Talk to RHPS
// about your program's coordination gaps" — "coordination gap(s)" is on
// the site's list of terms to avoid (reframe as "the space between
// referral and care"). Replaced with "the space between referral and care
// in your program" throughout. behavioralHealthStakes now opens with an
// illustrative scenario (explicitly not a claimed real case) putting the
// "referral vs. care received" throughline in this sector's own terms —
// a referral made to an outpatient program vs. a first appointment
// actually kept. behavioralHealthApproach gets one added sentence of
// local-control language (RHPS builds around the hospital, program, and
// providers a community already trusts). The specific consent-mechanics
// sentence in behavioralHealthApproach ("a patient decides who can see
// their treatment history...") is preserved verbatim per the prior pass's
// note that this page's patient-consent framing is a separate, deliberate
// topic not to be touched by a copy pass. CRITICAL, unchanged: this
// page's gating status and its "proposed service line, still being
// confirmed" hedge on the Behavioral Health & Recovery matrix item are
// left exactly as strong as they were — this pass does not imply a
// confirmed or currently-offered service. Hard rules preserved: no
// invented outcomes data, no named partners, no operating track record.

export const behavioralHealthMeta: PageMeta = {
  metaTitle: "Behavioral Health & Recovery Programs | RHPS",
  metaDescription:
    "RHPS delivers patient-controlled, privacy-first care coordination for behavioral health and recovery programs, directly, built by practitioners, not sold as software. We can also help identify grant funding where it applies.",
  primaryCta: "Talk to RHPS about the space between referral and care in your program",
  path: "/sectors/behavioral-health",
};

export const behavioralHealthHero: HeroContent = {
  headline:
    "RHPS delivers patient-controlled, privacy-first care coordination for behavioral health and recovery programs, directly, run by practitioners who stand behind the work, not sold as software.",
  subhead:
    "Where a program wants help identifying and pursuing the grant funding it's eligible for, RHPS can support that too — but the core of what we do is delivering coordination built around one rule: a patient's sensitive records move only with that patient's own permission.",
};

export const behavioralHealthStakes: BandContent = {
  body: "Picture a patient referred from a hospital emergency department to an outpatient recovery program forty minutes away. The referral is entered, a case file is opened, and the patient leaves with a phone number. Whether that patient ever makes the first appointment, and whether the treatment history that matters starts with them or from a blank intake form, depends on someone actively closing that distance. A referral is not the same thing as care received, and behavioral health and recovery programs feel that gap as directly as any part of rural health.\n\nThe federal Rural Health Transformation Program is moving $50 billion to states over five years, and states are not waiting to spend it. As of July 2026, 39 of 50 states have already released at least one funding opportunity under the program. Behavioral health and recovery programs are competing for a share of that money on the same compressed timeline as every other rural provider, usually without a grant-writing staff member to spare. CMS requires states to obligate their Year 1 funds by October 30, 2026, and announces Year 2 funding the following day. A program that waits until it has the staff to apply is choosing to miss the window, not to apply later.",
};

export const behavioralHealthMatrix: EntryMatrixContent = {
  headline: "What Applies to Your Program",
  intro:
    "Three parts of the RHPS menu are built around the constraints behavioral health and recovery programs actually operate under.",
  groups: [
    {
      label: "Capabilities",
      items: [
        {
          label: "Behavioral Health & Recovery",
          note: "a proposed service line, still being confirmed",
          description:
            "The design priority behind it is patient-controlled handling of behavioral health and substance use records, so a program can share exactly what a patient permits and nothing more.",
          href: "/sectors/behavioral-health",
        },
        {
          label: "Discharge Placement & Coordination",
          description:
            "The same patient-held consent approach extends to how a patient's care history follows them between a rural hospital, a recovery program, and any specialists or case managers involved, without anyone outside that circle seeing more than the patient has agreed to.",
          href: "/capabilities/discharge-placement",
        },
        {
          label: "Case Management for Rural Oklahoma",
          description:
            "Coordinated follow-up that turns a patient's discharge or referral into the appointment, bed, or service they actually reach next, closing the space between referral and care rather than just logging that a referral was made.",
          href: "/capabilities/case-management",
        },
      ],
    },
  ],
};

export const behavioralHealthApproach: BandContent = {
  headline: "How RHPS works with behavioral health and recovery programs",
  body: "RHPS practitioners deliver care coordination directly for behavioral health and recovery programs, not handed to a subcontractor or licensed out as software. For these programs specifically, that starts with how sensitive records move: a patient decides who can see their treatment history, and that permission travels with them rather than living inside one program's file cabinet or one vendor's database. We do not decide how care is delivered. We make sure that when a patient moves between a hospital, a recovery program, and follow-up services, care still reaches them, and their own choices about who sees their records travel with them.\n\nRHPS builds around the hospital, recovery program, and providers a community already trusts, not around replacing them; the aim is that a referral into your program becomes a kept appointment, not a new outside system standing between a patient and the people they already rely on.\n\nWhere a program wants help identifying and pursuing the RHTP or aligned state grant dollars it's eligible for, RHPS can also help with that, drawing on founding practitioners' direct experience in state RHTP grant administration. That capability sits alongside service delivery, not ahead of it.",
};

export const behavioralHealthProof: BandContent = {
  body: "Oklahoma's Year 1 RHTP award is $223.5 million, the fifth largest in the nation, distributed through state procurement windows that have run roughly six to eight weeks from opportunity to deadline, an early public benchmark for how compressed these windows can be. CMS's calendar, by contrast, is fixed nationally: Year 1 funds must be obligated by October 30, 2026, and Year 2 funding is announced the day after. A program deciding whether it has the capacity to compete for this money is deciding against a clock that does not move.",
};

export const behavioralHealthCta: CtaContent = {
  headline: "Start with a conversation about the space between referral and care in your program, not a funding pitch.",
  body: "The fastest useful step is a direct conversation about where a referral is turning into care your patients actually receive today, and where it isn't, and what delivering against that gap, with patient-controlled records, would look like. Where your program also wants help identifying and pursuing RHTP or aligned state funding, we'll cover that in the same conversation, and tell you plainly whether we can help.",
  buttonLabel: "Talk to RHPS about the space between referral and care in your program",
  buttonHref: "/contact",
};
