import Link from "next/link";
import { OpportunityCard } from "@/components/portal/OpportunityCard";
import { listOpportunities } from "@/lib/portalDb";

export default async function OpportunitiesPage() {
  const opportunities = await listOpportunities();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-2xl font-bold text-charcoal">Opportunities</h1>
        <Link
          href="/portal/opportunities/new"
          className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90"
        >
          New opportunity
        </Link>
      </div>

      {opportunities.length === 0 ? (
        <p className="mt-10 font-body text-sm text-charcoal/50">No opportunities yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      )}
    </div>
  );
}
