import type {
  BandContent,
  ContactRoleOption,
  HeroContent,
  PageMeta,
} from "./types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.17 Contact / Get Started.
//
// (2026-07-14) reviewed for voice consistency against the rural-health
// policy positioning brief that drove homepage.ts/about.ts's third pass (see
// homepage.ts's header comment for full rationale). This is not a pitch
// page, so only a light consistency check was done, no rewrite. None of the
// avoid-list vocabulary ("full-stack solution," "capture engine," "coordination
// gap," etc.) is present, and existing "funding capture" phrasing already
// matches how homepage.ts/about.ts treat it (a real, secondary, unpaired
// capability). No changes made.

export const contactMeta: PageMeta = {
  metaTitle: "Contact RHPS | Start a Conversation About Rural Health Funding and Delivery",
  metaDescription:
    "Reach the RHPS founding team directly. Whether you're a rural hospital, a state RHTP administrator, or a practitioner interested in partnering, tell us who you are and start a conversation.",
  primaryCta: "Tell us who you are and start a conversation.",
  path: "/contact",
};

export const contactHero: HeroContent = {
  headline: "Every message on this page reaches a practitioner, not a queue.",
  subhead:
    "RHPS is a working group of people who have run rural hospitals, treated rural patients, and captured the funding this page is largely about. When you write in, one of them reads it and responds directly.",
};

export const contactPathFinderIntro =
  "Tell us who you are so your message reaches the right person and we can respond with something useful, not a form letter.";

export const contactRoleOptions: ContactRoleOption[] = [
  {
    role: "Rural health system or hospital",
    description:
      "You're looking for help capturing grant funding, delivering a service your patients need, or both.",
    ctaLabel: "Start a conversation about your organization",
  },
  {
    role: "State agency or RHTP administrator",
    description:
      "You're evaluating RHPS as a potential subrecipient or delivery partner for state Rural Health Transformation Program funds.",
    ctaLabel: "Request information for your evaluation",
  },
  {
    role: "VoTech center or clinical training partner",
    description:
      "You're exploring hands-on clinical training or simulation for a training-limited rural community.",
    ctaLabel: "Ask about training and simulation",
  },
  {
    role: "EMS or first-responder agency",
    description:
      "You're building or sustaining the workforce that delivers rural emergency care.",
    ctaLabel: "Start a conversation about workforce support",
  },
  {
    role: "Behavioral health or recovery program",
    description:
      "You work in behavioral health or substance use recovery. (RHPS's behavioral health service line is a proposed, unconfirmed capability currently under design, we can still talk.)",
    ctaLabel: "Tell us about your program",
  },
  {
    role: "Practitioner or potential partner",
    description:
      "You've run a rural hospital, treated rural patients, or worked in this funding landscape yourself, and you're interested in the founding bench.",
    ctaLabel: "Introduce yourself",
  },
  {
    role: "Something else",
    description:
      "Not sure where you fit, or your question doesn't match the categories above.",
    ctaLabel: "Send a general message",
  },
];

export const contactExpectations: BandContent = {
  headline: "What to expect",
  body: "RHPS is a founding working group of practitioners, not a call center. Every message is read by someone who has run a rural hospital, treated rural patients, or worked directly in this funding landscape, not routed through a support queue.\n\nWe respond as soon as we're able to give you something real, rather than a fast placeholder that tells you nothing. Most conversations start with a short exchange to understand your situation before we propose next steps.\n\nIf your inquiry is tied to a state RHTP procurement or funding deadline, tell us the date. We take those timelines seriously.",
};

export const contactDirectChannelEmail: string | null = "contact@rhps.health";

export const contactAlternativePaths: BandContent = {
  headline: "Alternative paths",
  body: "Not ready for a conversation? Sign up to be notified when RHPS publishes its first annual report on rural health transformation. It isn't written yet, and we won't pretend otherwise, but you'll be the first to know when it is.\n\nIf you're a state RHTP administrator who'd rather review written materials before a call, say so in the message field above and we'll send those first.",
};
