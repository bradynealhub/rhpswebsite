// Nav entries and hidden routes per the layout system + Brady's "build now,
// keep unpublished" decision on the two gated pages (Our People, Behavioral
// Health & Recovery). Hidden routes are real pages, just excluded from nav,
// sitemap.xml, and get `robots: { index: false }` in their own metadata.

export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const siteName = "RHPS";
export const siteTagline = "Rural Health Provider Services";

export const primaryNav: NavGroup[] = [
  {
    label: "Who We Serve",
    items: [
      { label: "Sectors Overview", href: "/sectors" },
      { label: "Rural & Critical Access Hospitals", href: "/sectors/hospitals" },
      { label: "State Health Agencies & RHTP Programs", href: "/sectors/state-agencies" },
      { label: "VoTech & Clinical Training Partners", href: "/sectors/votech" },
      { label: "EMS & First Responder Agencies", href: "/sectors/ems" },
    ],
  },
  {
    label: "What We Do",
    items: [
      { label: "Capabilities Overview", href: "/capabilities" },
      { label: "Discharge Placement Platform", href: "/capabilities/discharge-placement" },
      { label: "Acute Specialist Lines", href: "/capabilities/acute-specialist-lines" },
      { label: "Case Management for Rural Oklahoma", href: "/capabilities/case-management" },
      { label: "Medical Training & Simulation", href: "/capabilities/medical-training-simulation" },
      { label: "Workforce Strengthening", href: "/capabilities/workforce-strengthening" },
    ],
  },
  {
    label: "More",
    items: [
      { label: "Insights", href: "/insights" },
      { label: "About / Approach", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// Real routes, deliberately excluded from primaryNav/sitemap until Brady
// confirms (a) Our People names/credentials/consent and (b) Behavioral
// Health & Recovery as a locked sector + capability.
export const hiddenRoutes: NavItem[] = [
  { label: "Our People", href: "/our-people" },
  { label: "Behavioral Health & Recovery Programs", href: "/sectors/behavioral-health" },
];

export const allVisibleRoutes: string[] = primaryNav
  .flatMap((group) => group.items)
  .map((item) => item.href)
  .concat("/");
