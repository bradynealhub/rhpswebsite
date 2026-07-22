import type { ReactNode } from "react";
import "../portal-design-system.css";

// Login/invite-setup pages -- unauthenticated, so no PortalNav, but still
// part of the portal's design system rather than the marketing site's
// evergreen/warmStone look.
export default function PortalPublicLayout({ children }: { children: ReactNode }) {
  return <div className="portal-ds min-h-screen">{children}</div>;
}
