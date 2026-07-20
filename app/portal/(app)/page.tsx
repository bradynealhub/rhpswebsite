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
      <h1 className="font-headline text-2xl font-bold text-charcoal">Welcome, {user?.name}</h1>
      <p className="mt-2 font-body text-charcoal/70">
        Signed in as {user?.email} &middot; {user?.tier}
        {user?.is_platform_admin ? " · Platform Admin" : ""}
      </p>

      <Link
        href="/portal/leads"
        className="mt-8 flex max-w-sm items-center justify-between rounded-md border border-copperAccent/40 bg-copperAccent/5 p-4 hover:border-copperAccent"
      >
        <div>
          <p className="font-headline text-lg font-bold text-charcoal">Leads awaiting triage</p>
          <p className="font-body text-sm text-charcoal/60">Inbound inquiries, mostly from the contact form</p>
        </div>
        <p className="font-body text-3xl font-bold text-copperAccent">{newLeadsCount}</p>
      </Link>

      <h2 className="mt-10 font-headline text-lg font-bold text-charcoal">Opportunities by stage</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {(Object.entries(stageCounts) as [string, number][]).map(([stage, count]) => (
          <div key={stage} className="rounded-md border border-charcoal/10 p-4">
            <p className="font-body text-2xl font-bold text-charcoal">{count}</p>
            <p className="font-body text-sm text-charcoal/60">{stage}</p>
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

      <Link href="/portal/opportunities" className="mt-4 inline-block font-body text-sm text-evergreen hover:underline">
        View all opportunities &rarr;
      </Link>
    </div>
  );
}
