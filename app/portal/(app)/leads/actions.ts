"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { claimLead, convertLeadToOpportunity, getLeadById, updateLeadStatus } from "@/lib/portalDb";
import { canEditLead, PortalForbiddenError } from "@/lib/portalPermissions";
import { getCurrentUser } from "@/lib/portalSession";
import type { LeadStatus } from "@/lib/portalTypes";

const VALID_STATUSES: LeadStatus[] = ["New", "Contacted", "Qualified", "Disqualified", "Converted"];

export async function claimLeadAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const leadId = String(formData.get("leadId") ?? "");
  await claimLead(leadId, user.id);
  revalidatePath(`/portal/leads/${leadId}`);
  revalidatePath("/portal/leads");
}

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const leadId = String(formData.get("leadId") ?? "");
  const lead = await getLeadById(leadId);
  if (!lead) throw new Error("Lead not found.");
  if (!canEditLead(user, lead)) throw new PortalForbiddenError();

  const status = String(formData.get("status") ?? "");
  if (!VALID_STATUSES.includes(status as LeadStatus)) throw new Error("Invalid status.");

  await updateLeadStatus({
    id: leadId,
    status: status as LeadStatus,
    disqualifyReason: status === "Disqualified" ? String(formData.get("disqualifyReason") ?? "").trim() || null : null,
    notes: String(formData.get("notes") ?? "").trim() || lead.notes,
  });

  revalidatePath(`/portal/leads/${leadId}`);
  revalidatePath("/portal/leads");
}

export async function convertLeadToOpportunityAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const leadId = String(formData.get("leadId") ?? "");
  const lead = await getLeadById(leadId);
  if (!lead) throw new Error("Lead not found.");
  if (!canEditLead(user, lead)) throw new PortalForbiddenError();

  const title = String(formData.get("title") ?? "").trim();
  const funder = String(formData.get("funder") ?? "").trim();
  if (!title || !funder) throw new Error("Title and funder/organization are required.");

  const opportunityId = crypto.randomUUID();
  await convertLeadToOpportunity({
    lead,
    opportunityId,
    title,
    funder,
    ownerUserId: lead.owner_user_id ?? user.id,
    companyId: lead.company_id,
    contactId: lead.contact_id,
  });

  redirect(`/portal/opportunities/${opportunityId}`);
}
