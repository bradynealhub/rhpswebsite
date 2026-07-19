import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

// Route group for the public marketing site -- everything here gets the
// public SiteHeader/SiteFooter wrapped around it. The portal
// (app/portal/**) is outside this group and gets none of it, per its own
// PortalNav instead. Deliberately just a plain layout (no dynamic APIs) so
// every page under this group stays statically-generation-eligible.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
