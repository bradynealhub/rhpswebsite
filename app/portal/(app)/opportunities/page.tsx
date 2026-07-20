import Link from "next/link";
import { listOpportunities } from "@/lib/portalDb";

// Filled pills, matching leads' badge treatment -- but a different palette
// mapping (7 pipeline stages, not 5 triage states) so the two never read as
// the same kind of object at a glance despite the shared visual language.
const STAGE_BADGE: Record<string, string> = {
  Identified: "bg-charcoal/10 text-charcoal/60",
  Qualifying: "bg-copperAccent/15 text-copperAccent",
  Pursuing: "bg-slateBlue/15 text-slateBlue",
  Submitted: "bg-slateBlue/15 text-slateBlue",
  Awarded: "bg-evergreen text-warmStone",
  Declined: "bg-red-700/10 text-red-700",
  "No-Go": "bg-charcoal/5 text-charcoal/40",
};

function formatAmount(cents: number | null): string {
  if (cents === null) return "—";
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

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
            <Link
              key={o.id}
              href={`/portal/opportunities/${o.id}`}
              className="flex flex-col rounded-lg border border-charcoal/10 bg-white p-4 shadow-sm transition-colors hover:border-evergreen"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-body font-semibold text-charcoal">{o.title}</p>
                <span className={`shrink-0 rounded-full px-2.5 py-1 font-body text-xs font-semibold ${STAGE_BADGE[o.stage] ?? ""}`}>
                  {o.stage}
                </span>
              </div>

              <p className="mt-1 font-body text-sm text-charcoal/60">
                {o.funder}
                {o.program_name ? ` · ${o.program_name}` : ""}
              </p>

              {o.company_name || o.contact_name ? (
                <p className="mt-1 font-body text-xs text-charcoal/50">
                  {[o.company_name, o.contact_name].filter(Boolean).join(" · ")}
                </p>
              ) : null}

              <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 font-body text-xs text-charcoal/60">
                <div>
                  <dt className="inline text-charcoal/40">Win %:</dt> <dd className="inline">{o.probability !== null ? `${o.probability}%` : "—"}</dd>
                </div>
                <div>
                  <dt className="inline text-charcoal/40">Requested:</dt> <dd className="inline">{formatAmount(o.amount_requested_cents)}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="inline text-charcoal/40">Submission due:</dt> <dd className="inline">{o.submission_deadline ?? "—"}</dd>
                </div>
              </dl>

              <p className="mt-auto pt-4 font-body text-xs text-charcoal/50">Owned by {o.owner_name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
