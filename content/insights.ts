import type { BandContent, CtaContent, HeroContent, PageMeta } from "./types";

// Copy transcribed verbatim from RHPS_Website_Content_and_Layout_Strategy_v3.docx
// §4.14 Insights / The Flagship Report. Do not paraphrase — edit the source
// doc first, then this file.
//
// Section 5, "Related credibility signals," is deliberately OMITTED per the
// doc's own QA notes: RHPS has no other research or data output it can
// honestly stand behind today, so building that section would create the
// empty-room problem the layout system warns against.
//
// The flagship report, "The State of Rural Health Transformation," does not
// exist yet. Every reference to it on this page uses future/intent language
// ("will examine," "intends to draw on," "has not been written") — never
// implies current publication, findings, or excerpts.
//
// (2026-07-14) light voice-consistency pass, per Brady's review of a
// rural-health policy positioning brief (see homepage.ts/about.ts for the
// full third-pass rationale — this page only needed a touch-up, not a
// rewrite). insightsWhy: "in the markets where the founding team works
// today" -> "in the states where the founding team works today" — "markets"
// read as off-brand business language and this page already talks about
// state-by-state coverage everywhere else. No vocabulary from the avoid-list
// was otherwise present, and the page's existing framing (an award on paper
// never becoming care a patient can access) already carries the "referral
// isn't care received" throughline without needing the literal phrase
// forced in. No other changes.

export const insightsMeta: PageMeta = {
  metaTitle: "The State of Rural Health Transformation | RHPS Insights (Forthcoming)",
  metaDescription:
    "RHPS is building its first annual report on how states are capturing and deploying Rural Health Transformation Program funding, and whether it's reaching rural patients. Not yet published. Sign up to be notified on release.",
  primaryCta: "Notify me when it publishes",
  path: "/insights",
};

export const insightsHero: HeroContent = {
  eyebrow: "RHPS Insights, Forthcoming",
  headline:
    "A federal program is rewriting how rural healthcare gets funded, state by state, and no one has published an independent account of how it's actually going.",
  subhead:
    "The State of Rural Health Transformation is RHPS's forthcoming annual report: a review, written by practitioners, of how states are capturing and deploying Rural Health Transformation Program funding, and whether it is reaching the patients it is meant for. The first edition has not yet been published.",
};

export const insightsWhy: BandContent = {
  headline: "Why RHPS is publishing this",
  body: "Every state now administering Rural Health Transformation Program funds is making decisions this year that will shape rural healthcare for years to come: how funds are allocated, which organizations qualify, how fast money moves from award to actual service. Most of that decision-making happens inside state agencies and legislative processes, visible mainly to the organizations already positioned close to it.\n\nRHPS did not start as a research organization. It started as a group of practitioners capturing this exact funding and delivering the services it pays for, directly, in the states where the founding team works today. That work produces a closer view of what is actually happening, where funding moves quickly, where it stalls, and where an award on paper never becomes care a patient can access, than most public accounts of the program offer, and it is the vantage point this report will draw on to examine the program state by state, nationally.\n\nRHPS is publishing The State of Rural Health Transformation because rural health systems, state agencies, and the organizations that serve rural patients deserve a sober, sourced, independently written account of how this program is unfolding nationally. It will not be a summary written to sell something. It will be a record written to be useful.\n\nRural health is at an inflection point. RHPS intends to publish what comes next, every year, starting with this first edition.",
};

export const insightsCoverage: BandContent = {
  headline: "What the first edition will cover",
  body: "The first edition will examine how the Rural Health Transformation Program's $50 billion in federal funding, distributed over five years, is being structured and deployed by the states now administering it. As of July 2026, 39 of 50 states have released at least one subrecipient funding opportunity under the program, each with its own timeline, eligibility rules, and application process, and the report's scope is national: it will track how procurement structures, award sizes, and obligation deadlines vary state to state, including the federal requirement that states obligate Year 1 funds by October 30, 2026, and CMS's announcement of Year 2 funding by October 31, 2026.\n\nIt will also examine the delivery side of the program directly: not only how funding is awarded, but what happens once it reaches a rural hospital, health system, or community organization, and whether the services it funds are actually reaching patients.\n\nRHPS intends to draw on its own practitioner experience navigating this process, including funding captured and services delivered in Oklahoma, whose $223.5 million Year 1 RHTP award ranks fifth largest in the nation, as one documented case among the states the report will cover, not as the report's subject.\n\nThe first edition has not been written. Nothing on this page should be read as a finding, a conclusion, or a preview of results. It is a description of scope, not a summary of content.",
};

export const insightsNotify: CtaContent = {
  headline: "Be the first to read it",
  body: "The State of Rural Health Transformation has not yet published. RHPS is not naming a release date until the research and writing are done, the report will publish when it's ready to stand behind, not on a marketing calendar.\n\nLeave your email and you'll be notified the moment the first edition is available. Nothing else: no sales sequence, no drip campaign.\n\nRHPS will use this address for one purpose, to tell you when this report publishes.",
  buttonLabel: "Notify me when it publishes",
  buttonHref: "/contact",
};
