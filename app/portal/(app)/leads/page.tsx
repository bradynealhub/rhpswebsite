import Link from "next/link";
import { listLeads } from "@/lib/portalDb";

// Distinct badge treatment from opportunity stages -- leads are inbox-shaped
// triage items, not pipeline stages, and should read differently at a
// glance.
const STATUS_BADGE: Record<string, string> = {
  New: "tag tag-accent-2",
  Contacted: "tag tag-accent",
  Qualified: "tag tag-accent",
  Disqualified: "tag tag-neutral",
  Converted: "tag tag-accent",
};
const CONVERTED_STYLE = { background: "var(--color-accent)", color: "var(--color-bg)" };

export default async function LeadsPage() {
  const leads = await listLeads();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1>Leads</h1>
          <p className="text-muted mt-1" style={{ fontSize: "13px" }}>
            Inbound inquiries, most from the public site&rsquo;s contact form. Triage, then convert the ones worth
            pursuing into an opportunity.
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <p className="text-muted mt-10" style={{ fontSize: "14px" }}>No leads yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <Link key={lead.id} href={`/portal/leads/${lead.id}`} className="card blueprint elev-sm tile-hover flex flex-col">
              <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="card-title">{lead.contact_name}</p>
                  {lead.company_name ? <p className="text-muted" style={{ fontSize: "13px" }}>{lead.company_name}</p> : null}
                </div>
                <span
                  className={`shrink-0 ${STATUS_BADGE[lead.status] ?? "tag tag-neutral"}`}
                  style={lead.status === "Converted" ? CONVERTED_STYLE : undefined}
                >
                  {lead.status}
                </span>
              </div>

              {lead.inquiry_role ? <p className="card-kicker mt-2">{lead.inquiry_role}</p> : null}

              <p className="mt-2 line-clamp-3" style={{ fontSize: "13px" }}>{lead.message}</p>

              <div className="card-meta mt-auto justify-between pt-4">
                <span>{lead.owner_name ? `Claimed by ${lead.owner_name}` : "Unclaimed"}</span>
                <span>{lead.created_at}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
