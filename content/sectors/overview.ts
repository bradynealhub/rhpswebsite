import type {
  BandContent,
  CtaContent,
  EntryMatrixContent,
  HeroContent,
  PageMeta,
} from "../types";

// Copy originally transcribed verbatim from
// RHPS_Website_Content_and_Layout_Strategy_v3.docx §4.2 Sectors Overview
// ("Who We Serve"), then repositioned (2026-07-13) to match homepage.ts:
// this page carried the site's most explicit "capture and deliver, held
// together by the same group" language ("The Same Model, Applied
// Differently"), which is exactly the framing Brady moved the whole site
// off of — see homepage.ts's header comment for the full legal/honesty
// rationale. Reworked around service delivery first, funding-capture help
// as a secondary, unpaired capability. "The founding group's current
// delivery work is concentrated in Oklahoma" (an active-track-record
// claim) softened to "practitioners are currently based in Oklahoma" (a
// true statement about where people are, not what the org has completed).
//
// (2026-07-14) voice pass, matching homepage.ts's third pass: added an
// illustrative (not claimed-real) patient scene to "sectorsOverviewIntro"
// so the page doesn't open purely on organizational language before
// getting to who those organizations are ultimately serving; picked up the
// "referral vs. care received" throughline in "sectorsOverviewIntro",
// "sectorsOverviewStakes", and "sectorsOverviewModel" (the equivalent of
// homepage.ts's homepageDelivery / capabilities/overview.ts's overviewFit
// band on this page); broadened "the gap" to chronic disease, behavioral
// health, and workforce pipelines in "sectorsOverviewIntro", consistent
// with the existing capability menu (no new services implied); added
// explicit local-control language ("RHPS builds around the providers and
// organizations a rural community already knows") to
// "sectorsOverviewModel". Also reworded a line in "sectorsOverviewStakes"
// that echoed the retired "capture funding, then deliver it, same cycle"
// pairing even though it was describing rural organizations' problem in
// general rather than RHPS's own model — replaced with the same
// referral-vs-care-received framing used elsewhere, to keep the page
// consistent with the prior repositioning pass. No structural changes;
// hard rules (no track record, no named partners, Behavioral Health still
// marked proposed) preserved.

export const sectorsOverviewMeta: PageMeta = {
  metaTitle: "Who We Serve | RHPS, Rural Health Provider Services",
  metaDescription:
    "RHPS is organized around the sectors it's built to serve, rural hospitals, behavioral health and recovery programs, state agencies, training partners, and EMS agencies, delivering the services each needs, directly or through trusted delivery partners.",
  primaryCta: "Start a conversation",
  path: "/sectors",
};

export const sectorsOverviewHero: HeroContent = {
  headline:
    "What a rural-serving organization needs looks different depending on where you sit. The services that close those gaps are the same handful, applied differently.",
  subhead:
    "RHPS is organized around the organizations it works with, hospitals, behavioral health programs, state agencies, training partners, and EMS agencies, because the shape of the need changes by sector, even when the services built to meet it don't.",
};

export const sectorsOverviewIntro: BandContent = {
  headline: "Built Around Who You Are",
  body: "Picture a rural patient handed a discharge plan, a referral to a specialist an hour and a half away, and a stack of phone numbers to work through on their own. Whichever organization we're sitting across from, hospital, state agency, VoTech center, EMS unit, that patient is on the other end of the conversation, and a referral is not the same thing as the care they were told they need.\n\nEvery rural-serving organization we talk to opens the conversation the same way: our situation is specific. They're right. A forty-bed hospital losing a specialty line, a state agency managing a subrecipient funding window, and an EMS unit short on paramedics are not facing the same problem day to day.\n\nThey are often facing the same underlying gap: a service their organization needs but can't build or staff on its own, in order to make sure a referral turns into care actually received. That gap shows up after a hospital discharge, but also in chronic disease management, in behavioral health and recovery, and in workforce and training pipelines that never quite reach the people who need them. RHPS delivers a specific, finite set of services that close it, directly or through delivery partners we trust, applied differently depending on who we're working with.\n\nThat's why this site is organized two ways at once: by sector, because the need takes a different shape depending on who you are, and by capability, because the services that close it are specific and finite, not a generic program. Find your sector below, and the capabilities built for it.",
};

export const sectorsOverviewStakes: BandContent = {
  headline: "Why Now",
  body: "The federal Rural Health Transformation Program is a $50 billion, five-year program built to address exactly this gap, and it is already moving: as of July 2026, 39 of the 50 states have released at least one subrecipient funding opportunity under it. States must obligate their Year 1 funds by October 30, 2026, and CMS announces Year 2 funding the day after.\n\nFor every sector below, that timeline isn't background information. It's the window in which real funding decisions are being made right now. An award moving through that window doesn't by itself close the gap between a referral and the care a patient receives; someone still has to turn that funding into services that actually reach them.",
};

export const sectorsOverviewMatrix: EntryMatrixContent = {
  headline: "Find Your Sector",
  groups: [
    {
      label: "Sectors",
      items: [
        {
          label: "Rural & Critical Access Hospitals and Health Systems",
          description:
            "Follow-up capacity, specialist access, and case management for the patients you can't hold onto without help.",
          href: "/sectors/hospitals",
        },
        {
          label: "Behavioral Health & Recovery Programs",
          note: "Proposed, pending confirmation",
          description:
            "Coordination and patient-controlled consent handling built for the sensitivity of behavioral health and substance use records.",
          href: "/sectors/behavioral-health",
        },
        {
          label: "State Health Agencies & RHTP Grant Administrators",
          description:
            "A delivery and reporting partner, run by practitioners, for the organizations you're already funding.",
          href: "/sectors/state-agencies",
        },
        {
          label: "VoTech Centers & Clinical Training Partners",
          description:
            "Hands-on clinical training and simulation for programs without the equipment or staff to run it themselves.",
          href: "/sectors/votech",
        },
        {
          label: "EMS & First-Responder Agencies",
          description:
            "Workforce strengthening for the first clinical contact most rural patients actually have.",
          href: "/sectors/ems",
        },
      ],
    },
  ],
};

export const sectorsOverviewModel: BandContent = {
  headline: "The Same Services, Applied Differently",
  body: "In every sector, RHPS delivers a specific set of services directly, as practitioners, not as a software vendor or a referral list: case management and specialist access for a hospital, simulation training for a VoTech center, workforce support for an EMS agency. A referral is not the same thing as care received, and closing that distance is the same job whether the organization is a forty-bed hospital or a state agency managing a subrecipient window; only the shape of the work changes.\n\nRHPS builds around the providers and organizations a rural community already knows, not around replacing them. Where we don't yet have the capacity to deliver directly, we work through delivery partners we trust, and the technology behind each of these services is built to support those existing relationships, not stand in for them.\n\nWe do not decide how care is delivered. We make sure that when it changes, care still reaches the patient.\n\nRHPS can also help identify and pursue the funding that pays for these services, for organizations that want that support. What changes by sector is which capabilities apply. What doesn't change is that the service gets delivered, by practitioners who have done this work themselves, and that it doesn't stop at the referral that named it.",
};

export const sectorsOverviewProof: BandContent = {
  headline: "What This Looks Like in Practice",
  body: "The founding group's practitioners are currently based in Oklahoma, where the Year 1 RHTP award is $223.5 million, the fifth-largest in the nation, and where procurement windows for subrecipient funding have run roughly six to eight weeks from posting to deadline. That pace, playing out in some form across the 39 states already moving, is the environment every sector below is operating in.",
};

export const sectorsOverviewCta: CtaContent = {
  headline: "Start a Conversation",
  body: "Haven't identified which sector fits your organization yet? That's a reasonable place to start. Tell us about your organization and what you're trying to solve, and we'll route the conversation to the right place.",
  buttonLabel: "Start a Conversation",
  buttonHref: "/contact",
};
