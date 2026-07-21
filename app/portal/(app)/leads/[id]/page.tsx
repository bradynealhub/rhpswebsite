import Link from "next/link";
import { notFound } from "next/navigation";
import { ConvertLeadForm } from "@/components/portal/ConvertLeadForm";
import { LeadStatusPanel } from "@/components/portal/LeadStatusPanel";
import { getLeadById } from "@/lib/portalDb";
import { canEditLead } from "@/lib/portalPermissions";
import { getCurrentUser } from "@/lib/portalSession";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [user, lead] = await Promise.all([getCurrentUser(), getLeadById(id)]);
  if (!user || !lead) notFound();

  const canEdit = canEditLead(user, lead);

  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-charcoal">{lead.contact_name}</h1>
      <p className="mt-1 font-body text-sm text-charcoal/60">
        {lead.company_name ?? "No organization given"}
        {lead.inquiry_role ? ` · ${lead.inquiry_role}` : ""} · via {lead.source}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-md border border-charcoal/10 p-4">
            <h2 className="font-headline text-lg font-bold text-charcoal">Inquiry</h2>
            <p className="mt-2 whitespace-pre-wrap font-body text-sm text-charcoal/80">&ldquo;{lead.message}&rdquo;</p>
            <p className="mt-3 font-body text-xs text-charcoal/40">Submitted {lead.created_at}</p>
          </div>

          <div className="rounded-md border border-charcoal/10 p-4">
            <h2 className="font-headline text-lg font-bold text-charcoal">Contact</h2>
            <dl className="mt-2 space-y-1 font-body text-sm text-charcoal/80">
              <div>
                <dt className="inline font-semibold">Name:</dt> <dd className="inline">{lead.contact_name}</dd>
              </div>
              {lead.contact_title ? (
                <div>
                  <dt className="inline font-semibold">Title:</dt> <dd className="inline">{lead.contact_title}</dd>
                </div>
              ) : null}
              {lead.contact_email ? (
                <div>
                  <dt className="inline font-semibold">Email:</dt>{" "}
                  <dd className="inline">
                    <a href={`mailto:${lead.contact_email}`} className="text-evergreen hover:underline">
                      {lead.contact_email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {lead.contact_phone ? (
                <div>
                  <dt className="inline font-semibold">Phone:</dt>{" "}
                  <dd className="inline">
                    <a href={`tel:${lead.contact_phone}`} className="text-evergreen hover:underline">
                      {lead.contact_phone}
                    </a>
                  </dd>
                </div>
              ) : null}
              {lead.company_name ? (
                <div>
                  <dt className="inline font-semibold">Organization:</dt> <dd className="inline">{lead.company_name}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          {lead.status === "Converted" && lead.converted_opportunity_id ? (
            <Link
              href={`/portal/opportunities/${lead.converted_opportunity_id}`}
              className="inline-block font-body text-sm font-semibold text-evergreen hover:underline"
            >
              View the resulting opportunity &rarr;
            </Link>
          ) : canEdit ? (
            <ConvertLeadForm lead={lead} />
          ) : null}
        </div>

        <div>
          {canEdit ? (
            <LeadStatusPanel lead={lead} />
          ) : (
            <div className="rounded-md border border-charcoal/10 p-4">
              <h2 className="font-headline text-lg font-bold text-charcoal">Status</h2>
              <p className="mt-2 font-body text-sm text-charcoal/80">
                <strong>{lead.status}</strong>
              </p>
              <p className="mt-1 font-body text-sm text-charcoal/60">
                {lead.owner_name ? `Claimed by ${lead.owner_name}` : "Unclaimed"}
              </p>
              {lead.notes ? <p className="mt-2 font-body text-sm text-charcoal/70">{lead.notes}</p> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
