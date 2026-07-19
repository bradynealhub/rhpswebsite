import Link from "next/link";
import { listOpportunities } from "@/lib/portalDb";

const STAGE_COLORS: Record<string, string> = {
  Identified: "text-charcoal/60",
  Qualifying: "text-copperAccent",
  Pursuing: "text-slateBlue",
  Submitted: "text-slateBlue",
  Awarded: "text-evergreen",
  Declined: "text-red-700",
  "No-Go": "text-charcoal/40",
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

      <table className="mt-6 w-full font-body text-sm">
        <thead>
          <tr className="border-b border-charcoal/10 text-left text-charcoal/60">
            <th className="py-2">Title</th>
            <th className="py-2">Funder / Program</th>
            <th className="py-2">Stage</th>
            <th className="py-2">Owner</th>
            <th className="py-2">Win %</th>
            <th className="py-2">Submission due</th>
            <th className="py-2">Requested</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((o) => (
            <tr key={o.id} className="border-b border-charcoal/5">
              <td className="py-2">
                <Link href={`/portal/opportunities/${o.id}`} className="text-evergreen hover:underline">
                  {o.title}
                </Link>
              </td>
              <td className="py-2">
                {o.funder}
                {o.program_name ? <span className="block text-xs text-charcoal/50">{o.program_name}</span> : null}
              </td>
              <td className={`py-2 font-semibold ${STAGE_COLORS[o.stage] ?? ""}`}>{o.stage}</td>
              <td className="py-2">{o.owner_name}</td>
              <td className="py-2">{o.probability !== null ? `${o.probability}%` : "—"}</td>
              <td className="py-2">{o.submission_deadline ?? "—"}</td>
              <td className="py-2">{formatAmount(o.amount_requested_cents)}</td>
            </tr>
          ))}
          {opportunities.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-6 text-center text-charcoal/50">
                No opportunities yet.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
