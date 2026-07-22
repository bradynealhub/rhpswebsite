import { notFound } from "next/navigation";
import { GoNoGoDecision } from "@/components/portal/GoNoGoDecision";
import { OpportunityActivityTimeline } from "@/components/portal/OpportunityActivityTimeline";
import { OpportunityDocuments } from "@/components/portal/OpportunityDocuments";
import { OpportunityForm } from "@/components/portal/OpportunityForm";
import { OpportunityLinks } from "@/components/portal/OpportunityLinks";
import { getOpportunityById, listOpportunityActivities, listOpportunityLinks, listUsers } from "@/lib/portalDb";
import { canEditOpportunity } from "@/lib/portalPermissions";
import { getCurrentUser } from "@/lib/portalSession";
import { updateOpportunityAction } from "../actions";

function formatAmount(cents: number | null): string {
  if (cents === null) return "—";
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default async function OpportunityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [user, opportunity] = await Promise.all([getCurrentUser(), getOpportunityById(id)]);
  if (!user || !opportunity) notFound();

  const canEdit = canEditOpportunity(user, opportunity);
  const [owners, activities, links] = await Promise.all([
    user.tier === "Founding Operator"
      ? (await listUsers()).map(({ id: userId, name, email }) => ({ id: userId, name, email }))
      : Promise.resolve(undefined),
    listOpportunityActivities(id),
    listOpportunityLinks(id),
  ]);

  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-charcoal">{opportunity.title}</h1>
      <p className="mt-1 font-body text-sm text-charcoal/60">
        {opportunity.funder}
        {opportunity.program_name ? ` · ${opportunity.program_name}` : ""}
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          {canEdit ? (
            <OpportunityForm action={updateOpportunityAction} opportunity={opportunity} owners={owners} />
          ) : (
            <div className="max-w-xl space-y-2 font-body text-charcoal/80">
              <p>
                <strong>Stage:</strong> {opportunity.stage}
              </p>
              <p>
                <strong>Owner:</strong> {opportunity.owner_name}
              </p>
              <p>
                <strong>Organization:</strong> {opportunity.company_name ?? "—"}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                {opportunity.contact_name
                  ? `${opportunity.contact_name}${opportunity.contact_email ? ` (${opportunity.contact_email})` : ""}${
                      opportunity.contact_phone ? ` · ${opportunity.contact_phone}` : ""
                    }`
                  : "—"}
              </p>
              <p>
                <strong>Win probability:</strong> {opportunity.probability !== null ? `${opportunity.probability}%` : "—"}
              </p>
              <p>
                <strong>Requested / Awarded:</strong> {formatAmount(opportunity.amount_requested_cents)} /{" "}
                {formatAmount(opportunity.amount_awarded_cents)}
              </p>
              <p>
                <strong>LOI deadline:</strong> {opportunity.loi_deadline ?? "—"}
              </p>
              <p>
                <strong>Submission deadline:</strong> {opportunity.submission_deadline ?? "—"}
              </p>
              <p>
                <strong>Decision date:</strong> {opportunity.decision_date ?? "—"}
              </p>
              <p>
                <strong>Award start date:</strong> {opportunity.award_start_date ?? "—"}
              </p>
              <p>
                <strong>Notes:</strong> {opportunity.notes ?? "—"}
              </p>
            </div>
          )}

          <OpportunityActivityTimeline opportunityId={opportunity.id} activities={activities} />
        </div>

        <div className="space-y-8">
          <GoNoGoDecision opportunity={opportunity} />
          <OpportunityDocuments opportunityId={opportunity.id} />
          <OpportunityLinks opportunityId={opportunity.id} links={links} canRemove={canEdit} />
        </div>
      </div>
    </div>
  );
}
