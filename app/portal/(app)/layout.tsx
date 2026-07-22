import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { PortalNav } from "@/components/portal/PortalNav";
import { PortalSidebar } from "@/components/portal/PortalSidebar";
import { countNewLeads, listFolders } from "@/lib/portalDb";
import { getCurrentUser } from "@/lib/portalSession";
import "../portal-design-system.css";

// Auth boundary for everything under /portal except the (public) route
// group (login, invite setup) -- a route group, not a path segment, so
// /portal/opportunities etc. keep clean URLs. See plan, section E.
export default async function PortalAppLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const [newLeadsCount, folders] = await Promise.all([countNewLeads(), listFolders(null)]);

  return (
    <div className="portal-ds portal-shell">
      <PortalNav user={user} />
      <div className="portal-shell-body">
        <PortalSidebar user={user} newLeadsCount={newLeadsCount} folders={folders} />
        <main className="portal-shell-main">{children}</main>
      </div>
    </div>
  );
}
