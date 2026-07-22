"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { NewItemMenu } from "@/components/portal/NewItemMenu";
import type { DocumentFolder, PortalUser } from "@/lib/portalTypes";

export function PortalSidebar({
  user,
  newLeadsCount = 0,
  folders,
}: {
  user: Pick<PortalUser, "is_platform_admin" | "tier">;
  newLeadsCount?: number;
  folders: DocumentFolder[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const canOpenScout = user.tier === "Founding Operator" || Boolean(user.is_platform_admin);
  const inDocuments = pathname?.startsWith("/portal/documents") ?? false;
  const activeFilter = searchParams.get("filter");
  // "+ New" creates inside whatever folder the user is currently browsing;
  // outside of a folder page (root Documents, other sections) it creates
  // at the top level.
  const currentFolderId = pathname?.match(/^\/portal\/documents\/folder\/([^/]+)/)?.[1] ?? null;

  return (
    <aside className="portal-sidebar">
      <NewItemMenu folderId={currentFolderId} block />

      <nav aria-label="Sections" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <Link href="/portal/documents" className={`side-link ${inDocuments ? "on" : ""}`}>
          Documents
        </Link>
        <Link
          href="/portal/opportunities"
          className={`side-link ${pathname?.startsWith("/portal/opportunities") ? "on" : ""}`}
        >
          Opportunities
        </Link>
        <Link href="/portal/leads" className={`side-link ${pathname?.startsWith("/portal/leads") ? "on" : ""}`}>
          Leads
          {newLeadsCount > 0 ? <span className="tag tag-accent-2">{newLeadsCount}</span> : null}
        </Link>
        {user.is_platform_admin ? (
          <Link href="/portal/admin/users" className={`side-link ${pathname?.startsWith("/portal/admin") ? "on" : ""}`}>
            Admin
          </Link>
        ) : null}
        {canOpenScout ? (
          <a href="/portal/api/scout/sso" target="_blank" rel="noopener noreferrer" className="side-link">
            RHT Scout &#8599;
          </a>
        ) : null}
      </nav>

      {inDocuments ? (
        <>
          <div>
            <div className="side-kicker">My workspace</div>
            <nav aria-label="Library" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <Link href="/portal/documents" className={`side-link ${!activeFilter ? "on" : ""}`}>
                All files
              </Link>
              <Link href="/portal/documents?filter=mine" className={`side-link ${activeFilter === "mine" ? "on" : ""}`}>
                My files
              </Link>
              <Link href="/portal/documents?filter=shared" className={`side-link ${activeFilter === "shared" ? "on" : ""}`}>
                Shared with me
              </Link>
            </nav>
          </div>

          {folders.length > 0 ? (
            <div>
              <div className="side-kicker">Team folders</div>
              <nav aria-label="Team folders" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                {folders.map((folder) => {
                  const href = `/portal/documents/folder/${folder.id}`;
                  return (
                    <Link key={folder.id} href={href} className={`side-link ${pathname === href ? "on" : ""}`}>
                      {folder.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ) : null}
        </>
      ) : null}
    </aside>
  );
}
