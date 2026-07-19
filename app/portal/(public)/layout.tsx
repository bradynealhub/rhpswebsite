import type { ReactNode } from "react";

// Login/invite-setup pages -- unauthenticated, so no PortalNav, but still
// white like the rest of the portal rather than the marketing site's
// warmStone body background.
export default function PortalPublicLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-white">{children}</div>;
}
