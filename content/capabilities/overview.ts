import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy originally transcribed verbatim from
// RHPS_Website_Content_and_Layout_Strategy_v3.docx §4.8 Capabilities
// Overview ("What We Do"), then repositioned (2026-07-13) to match
// homepage.ts: "overviewFit" carried the site's most explicit "twofold
// model, two halves handled as one engagement" language — rewritten around
// direct delivery, with funding-capture help as a secondary, unpaired
// capability. The state-agencies entry in "overviewWhoItsFor" was also
// de-paired for the same reason. See homepage.ts's header comment for the
// full rationale.
//
// (2026-07-14) voice pass, matching homepage.ts's third pass. "overviewContext"
// gets an illustrative (not claimed-real) patient scene before the funding
// paragraph, and that funding paragraph itself is reworded: it previously
// read "the narrow window to capture that funding and the staffing to
// deliver against it once captured", describing rural organizations'
// problem in general rather than RHPS's own model, but it echoed the exact
// capture-then-deliver-same-cycle pairing the prior pass retired — replaced
// with the referral-vs-care-received framing used elsewhere on the site.
// Also broadened "the gap" in "overviewContext" to chronic disease,
// behavioral health, and workforce pipelines, consistent with the existing
// six-line menu (no new services implied). "overviewFit" picks up explicit
// local-control language (RHPS builds around providers a community already
// knows, rather than replacing them) and the same referral-vs-care-received
// phrasing. The six-line capability list in "overviewMechanics" and its
// literal "consent and coordination layer" technical description were left
// untouched, per instruction not to disrupt that list. No structural
// changes; hard rules (no track record, no named partners, Behavioral
// Health still marked proposed, funding-capture still secondary and
// unpaired) preserved.

export const overviewMeta: PageMeta = {
  metaTitle: "Capabilities, RHPS (Rural Health Provider Services)",
  metaDescription:
    "RHPS offers a menu of direct-delivery services for rural hospitals, behavioral health programs, state agencies, training partners, and EMS, delivered by practitioners. Organizations choose what they need.",
  primaryCta: "Start a conversation about which capability fits",
  path: "/capabilities",
};

export const overviewHero: HeroContent = {
  headline:
    "No two rural organizations have the same gap to close. RHPS was not built as one thing to buy.",
  subhead:
    "Six capability lines deliver direct services for rural hospitals, behavioral health programs, state agencies, training partners, and EMS. An organization selects what applies to it. Nothing here is bundled, and nothing is mandatory.",
};

export const overviewContext: BandContent = {
  headline:
    "Rural hospitals, behavioral health programs, VoTech centers, and state agencies are not all missing the same thing.",
  body: "A critical access hospital losing discharge follow-up capacity needs coordination, not a specialist pipeline. A VoTech center training the next generation of rural clinicians needs simulation infrastructure, not case management. A state RHTP grant administrator needs delivery capacity it can verify, not a placement platform.\n\nPicture a rural patient handed a discharge plan, a referral slip, and a list of phone numbers, and left with the job of turning all three into an actual appointment. That gap, between what a patient is told to do and what actually reaches them, sits underneath every line below, whether it shows up after a hospital discharge, in chronic disease management, in behavioral health, or in a training pipeline that never quite reaches the people who need it.\n\nUnder the federal Rural Health Transformation Program, a $50 billion, five-year program now moving through 39 of 50 states, real funding is moving toward closing gaps like this. Funding alone doesn't close it: an award still has to turn into services a patient actually receives, and that narrower problem, not the funding opportunity itself, is what most rural organizations are short-staffed for.\n\nRHPS treats that as a menu problem, not a package problem. Menu, not mandate: an organization chooses what it needs, and its choice does not change whether a patient still gets care. It changes only how that care is coordinated and paid for.",
};

export const overviewMechanics: EntryMatrixContent = {
  headline: "Each line below is a distinct engagement.",
  intro:
    "An organization can take one, several, or eventually all six; none depends on adopting the others.",
  groups: [
    {
      label: "Capabilities",
      items: [
        {
          label: "Discharge Placement Platform",
          note: "the anchor of the menu",
          description:
            "Hospitals post discharge follow-up needs directly; participating providers pick them up. The technical direction is moving toward a patient-held, portable consent and coordination layer that travels with the patient across providers, rather than living inside any single hospital's system.",
          href: "/capabilities/discharge-placement",
        },
        {
          label: "Acute Specialist Lines",
          description:
            "Connects rural patients to specialists they cannot reach locally, closing a gap that otherwise means delayed or forgone care.",
          href: "/capabilities/acute-specialist-lines",
        },
        {
          label: "Case Management for Rural Oklahoma",
          description:
            "Coordinated case management that reduces gaps and guesswork in patient follow-up, named for its current, literal operating scope.",
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
            "Builds and sustains the people who actually deliver rural care, including first responders, addressing the staffing side of the gap directly rather than assuming it will fill itself.",
          href: "/capabilities/workforce-strengthening",
        },
        {
          label: "Behavioral Health & Recovery",
          note: "proposed, not yet confirmed",
          description:
            "A prospective line built around patient-controlled, privacy-aware consent handling for behavioral health and substance use records. Listed here as a stated design priority under evaluation, not a service currently offered.",
        },
      ],
    },
  ],
};

export const overviewFit: BandContent = {
  headline: "Every line on this menu is delivered directly, or through a partner we trust.",
  body: "RHPS practitioners, people who have run rural hospitals and treated rural patients themselves, deliver the services above directly wherever we have the capacity to do so. Where we don't yet, we work through delivery partners we trust, rather than leaving an organization, or a patient, without an answer, and rather than leaving a referral to become the patient's job to chase down.\n\nRHPS builds around the providers and organizations a rural community already knows, not around replacing them. The technology behind each of these lines is there to support those relationships, not stand in for them.\n\nRHPS can also help identify and pursue the funding, including RHTP subrecipient opportunities, that pays for these services, for organizations that want that support. That capability sits alongside service delivery, not ahead of it, and it is not a requirement to work with us.",
};

export const overviewWhoItsFor: EntryMatrixContent = {
  headline: "This menu serves five audiences, each with its own path into the site.",
  intro:
    "Visit the sector page that matches your organization for the mechanics specific to your decision, or continue below to talk through which lines apply.",
  groups: [
    {
      label: "Who It's For",
      items: [
        {
          label: "Rural and Critical Access Hospitals / Health Systems",
          description:
            "Discharge Placement Platform, Acute Specialist Lines, Case Management for Rural Oklahoma.",
          href: "/sectors/hospitals",
        },
        {
          label: "Behavioral Health and Recovery Programs",
          note: "sector page pending confirmation",
          description:
            "Case Management for Rural Oklahoma today; Behavioral Health & Recovery once confirmed.",
        },
        {
          label: "State Health Agencies and RHTP Grant Administrators",
          description:
            "Funding-capture support, evaluated alongside any of the delivery lines above.",
          href: "/sectors/state-agencies",
        },
        {
          label: "VoTech Centers and Clinical Training Partners",
          description: "Medical Training & Simulation, Workforce Strengthening.",
          href: "/sectors/votech",
        },
        {
          label: "EMS and First-Responder Agencies",
          description:
            "Workforce Strengthening, with Acute Specialist Lines relevant where transport and specialist access intersect.",
          href: "/sectors/ems",
        },
      ],
    },
  ],
};

export const overviewCta: CtaContent = {
  headline: "Not sure which lines apply to your organization?",
  body: "Start a conversation about which capability fits. A founding practitioner reviews every inquiry directly; there is no queue and no sales process, only a conversation about what your organization actually needs from the menu above.",
  buttonLabel: "Start a conversation about which capability fits",
  buttonHref: "/contact",
};
