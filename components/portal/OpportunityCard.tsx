import Link from "next/link";
import type { OpportunityWithOwner } from "@/lib/portalTypes";

// Filled pills, matching leads' badge treatment -- but a different palette
// mapping (7 pipeline stages, not 5 triage states) so the two never read as
// the same kind of object at a glance despite the shared visual language.
// Shared by the Opportunities list and the portal dashboard's "recent
// opportunities" teaser so both render the same card, not two hand-copied
// versions that drift apart.
const STAGE_BADGE: Record<string, string> = {
  Identified: "tag tag-neutral",
  Qualifying: "tag tag-accent-2",
  Pursuing: "tag tag-accent",
  Submitted: "tag tag-accent",
  Awarded: "tag tag-accent",
  Declined: "tag tag-danger",
  "No-Go": "tag tag-neutral",
};
const AWARDED_STYLE = { background: "var(--color-accent)", color: "var(--color-bg)" };

function formatAmount(cents: number | null): string {
  if (cents === null) return "—";
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function OpportunityCard({ opportunity: o }: { opportunity: OpportunityWithOwner }) {
  return (
    <Link href={`/portal/opportunities/${o.id}`} className="card blueprint elev-sm tile-hover flex flex-col">
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      <div className="flex items-start justify-between gap-2">
        <p className="card-title">{o.title}</p>
        <span
          className={`shrink-0 ${STAGE_BADGE[o.stage] ?? "tag tag-neutral"}`}
          style={o.stage === "Awarded" ? AWARDED_STYLE : undefined}
        >
          {o.stage}
        </span>
      </div>

      <p className="text-muted mt-1" style={{ fontSize: "13px" }}>
        {o.funder}
        {o.program_name ? ` · ${o.program_name}` : ""}
      </p>

      {o.company_name || o.contact_name ? (
        <p className="text-muted mt-1" style={{ fontSize: "11px" }}>
          {[o.company_name, o.contact_name].filter(Boolean).join(" · ")}
        </p>
      ) : null}

      <dl className="card-meta mt-3 grid grid-cols-2 gap-x-3 gap-y-1">
        <div>
          <dt className="inline text-muted">Win %:</dt> <dd className="inline">{o.probability !== null ? `${o.probability}%` : "—"}</dd>
        </div>
        <div>
          <dt className="inline text-muted">Requested:</dt> <dd className="inline">{formatAmount(o.amount_requested_cents)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="inline text-muted">Submission due:</dt> <dd className="inline">{o.submission_deadline ?? "—"}</dd>
        </div>
      </dl>

      <p className="card-meta mt-auto pt-4">Owned by {o.owner_name}</p>
    </Link>
  );
}
