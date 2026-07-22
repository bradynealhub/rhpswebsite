import Link from "next/link";
import { OpportunityCard } from "@/components/portal/OpportunityCard";
import { listOpportunities } from "@/lib/portalDb";

export default async function OpportunitiesPage() {
  const opportunities = await listOpportunities();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Opportunities</h1>
        <Link href="/portal/opportunities/new" className="btn btn-primary">
          New opportunity
        </Link>
      </div>

      {opportunities.length === 0 ? (
        <p className="text-muted mt-10" style={{ fontSize: "14px" }}>No opportunities yet.</p>
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
