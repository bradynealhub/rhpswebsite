import Link from "next/link";
import { listLeads } from "@/lib/portalDb";

// Distinct badge treatment from opportunity stages (OPPORTUNITY page uses
// plain text color; leads get a filled pill) -- leads are inbox-shaped
// triage items, not pipeline stages, and should read differently at a
// glance.
const STATUS_BADGE: Record<string, string> = {
  New: "bg-copperAccent/15 text-copperAccent",
  Contacted: "bg-slateBlue/15 text-slateBlue",
  Qualified: "bg-evergreen/15 text-evergreen",
  Disqualified: "bg-charcoal/10 text-charcoal/50",
  Converted: "bg-evergreen text-warmStone",
};

export default async function LeadsPage() {
  const leads = await listLeads();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl font-bold text-charcoal">Leads</h1>
          <p className="mt-1 font-body text-sm text-charcoal/60">
            Inbound inquiries, most from the public site&rsquo;s contact form. Triage, then convert the ones worth
            pursuing into an opportunity.
          </p>
        </div>
      </div>

      {leads.length === 0 ? (
        <p className="mt-10 font-body text-sm text-charcoal/50">No leads yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <Link
              key={lead.id}
              href={`/portal/leads/${lead.id}`}
              className="flex flex-col rounded-lg border border-charcoal/10 bg-white p-4 shadow-sm transition-colors hover:border-evergreen"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-body font-semibold text-charcoal">{lead.contact_name}</p>
                  {lead.company_name ? <p className="font-body text-sm text-charcoal/60">{lead.company_name}</p> : null}
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 font-body text-xs font-semibold ${STATUS_BADGE[lead.status] ?? ""}`}
                >
                  {lead.status}
                </span>
              </div>

              {lead.inquiry_role ? (
                <p className="mt-2 font-body text-xs font-semibold uppercase tracking-wide text-charcoal/40">
                  {lead.inquiry_role}
                </p>
              ) : null}

              <p className="mt-2 line-clamp-3 font-body text-sm text-charcoal/70">{lead.message}</p>

              <div className="mt-auto flex items-center justify-between pt-4 font-body text-xs text-charcoal/50">
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
