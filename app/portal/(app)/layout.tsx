import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { PortalNav } from "@/components/portal/PortalNav";
import { countNewLeads } from "@/lib/portalDb";
import { getCurrentUser } from "@/lib/portalSession";
import "../portal-design-system.css";

// Auth boundary for everything under /portal except the (public) route
// group (login, invite setup) -- a route group, not a path segment, so
// /portal/opportunities etc. keep clean URLs. See plan, section E.
export default async function PortalAppLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const newLeadsCount = await countNewLeads();

  return (
    <div className="portal-ds min-h-screen">
      <PortalNav user={user} newLeadsCount={newLeadsCount} />
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
