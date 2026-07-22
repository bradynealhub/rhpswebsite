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
      <h1>{lead.contact_name}</h1>
      <p className="text-muted mt-1" style={{ fontSize: "13px" }}>
        {lead.company_name ?? "No organization given"}
        {lead.inquiry_role ? ` · ${lead.inquiry_role}` : ""} · via {lead.source}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div className="card blueprint">
            <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
            <h2 style={{ fontSize: "17px" }}>Inquiry</h2>
            <p className="mt-2 whitespace-pre-wrap" style={{ fontSize: "13px" }}>&ldquo;{lead.message}&rdquo;</p>
            <p className="text-muted mt-3" style={{ fontSize: "11px" }}>Submitted {lead.created_at}</p>
          </div>

          <div className="card blueprint">
            <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
            <h2 style={{ fontSize: "17px" }}>Contact</h2>
            <dl className="mt-2 space-y-1" style={{ fontSize: "13px" }}>
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
                    <a href={`mailto:${lead.contact_email}`}>{lead.contact_email}</a>
                  </dd>
                </div>
              ) : null}
              {lead.contact_phone ? (
                <div>
                  <dt className="inline font-semibold">Phone:</dt>{" "}
                  <dd className="inline">
                    <a href={`tel:${lead.contact_phone}`}>{lead.contact_phone}</a>
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
            <Link href={`/portal/opportunities/${lead.converted_opportunity_id}`} className="btn btn-secondary">
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
            <div className="card blueprint">
              <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
              <h2 style={{ fontSize: "17px" }}>Status</h2>
              <p className="mt-2" style={{ fontSize: "13px" }}>
                <strong>{lead.status}</strong>
              </p>
              <p className="text-muted mt-1" style={{ fontSize: "13px" }}>
                {lead.owner_name ? `Claimed by ${lead.owner_name}` : "Unclaimed"}
              </p>
              {lead.notes ? <p className="mt-2" style={{ fontSize: "13px" }}>{lead.notes}</p> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
