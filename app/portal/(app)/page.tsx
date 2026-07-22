import Link from "next/link";
import { OpportunityCard } from "@/components/portal/OpportunityCard";
import { countNewLeads, countOpportunitiesByStage, listOpportunities } from "@/lib/portalDb";
import { getCurrentUser } from "@/lib/portalSession";

const RECENT_OPPORTUNITIES_LIMIT = 6;

export default async function PortalDashboardPage() {
  const [user, stageCounts, newLeadsCount, opportunities] = await Promise.all([
    getCurrentUser(),
    countOpportunitiesByStage(),
    countNewLeads(),
    listOpportunities(),
  ]);
  const recentOpportunities = opportunities.slice(0, RECENT_OPPORTUNITIES_LIMIT);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p className="text-muted mt-2" style={{ fontSize: "15px" }}>
        Signed in as {user?.email} &middot; {user?.tier}
        {user?.is_platform_admin ? " · Platform Admin" : ""}
      </p>

      <Link
        href="/portal/leads"
        className="card blueprint elev-sm tile-hover mt-8 flex max-w-sm items-center justify-between"
        style={{ borderColor: "var(--color-accent-2)", background: "var(--color-accent-2-100)" }}
      >
        <div>
          <p className="card-title">Leads awaiting triage</p>
          <p className="text-muted" style={{ fontSize: "13px" }}>Inbound inquiries, mostly from the contact form</p>
        </div>
        <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "30px", color: "var(--color-accent-2-800)" }}>
          {newLeadsCount}
        </p>
      </Link>

      <h2 className="mt-10" style={{ fontSize: "20px" }}>Opportunities by stage</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {(Object.entries(stageCounts) as [string, number][]).map(([stage, count]) => (
          <div key={stage} className="card blueprint">
            <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "24px" }}>{count}</p>
            <p className="text-muted" style={{ fontSize: "13px" }}>{stage}</p>
          </div>
        ))}
      </div>
      {recentOpportunities.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentOpportunities.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      ) : null}

      <Link href="/portal/opportunities" className="mt-4 inline-block" style={{ fontSize: "13px" }}>
        View all opportunities &rarr;
      </Link>
    </div>
  );
}
