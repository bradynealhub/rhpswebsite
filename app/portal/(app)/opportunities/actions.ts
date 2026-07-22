"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  addOpportunityActivity,
  addOpportunityLink,
  createOpportunity,
  findOrCreateCompany,
  findOrCreateContact,
  getOpportunityById,
  recordGoNoGoDecision,
  removeOpportunityLink,
  setOpportunityActivityCompleted,
  updateOpportunity,
  type OpportunityInput,
} from "@/lib/portalDb";
import { canEditOpportunity, PortalForbiddenError } from "@/lib/portalPermissions";
import { getCurrentUser } from "@/lib/portalSession";
import type { OpportunityActivityType, OpportunityStage } from "@/lib/portalTypes";

const VALID_STAGES: OpportunityStage[] = [
  "Identified",
  "Qualifying",
  "Pursuing",
  "Submitted",
  "Awarded",
  "Declined",
  "No-Go",
];
const VALID_ACTIVITY_TYPES: OpportunityActivityType[] = ["Note", "Call", "Email", "Meeting", "Task"];

function parseAmountCents(raw: FormDataEntryValue | null): number | null {
  const value = String(raw ?? "").trim();
  if (!value) return null;
  const dollars = Number(value);
  if (!Number.isFinite(dollars)) return null;
  return Math.round(dollars * 100);
}

function parseStage(raw: FormDataEntryValue | null, fallback: OpportunityStage): OpportunityStage {
  const value = String(raw ?? "");
  return VALID_STAGES.includes(value as OpportunityStage) ? (value as OpportunityStage) : fallback;
}

function parseProbability(raw: FormDataEntryValue | null): number | null {
  const value = String(raw ?? "").trim();
  if (!value) return null;
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return null;
  return Math.min(100, Math.max(0, n));
}

function stringOrNull(raw: FormDataEntryValue | null): string | null {
  return String(raw ?? "").trim() || null;
}

async function readOpportunityInput(
  formData: FormData,
  ownerUserId: string,
  fallbackStage: OpportunityStage,
): Promise<OpportunityInput> {
  const companyId = await findOrCreateCompany(String(formData.get("companyName") ?? ""));
  const contactId = await findOrCreateContact({
    name: String(formData.get("contactName") ?? ""),
    email: stringOrNull(formData.get("contactEmail")),
    phone: stringOrNull(formData.get("contactPhone")),
    title: null,
    companyId,
  });

  return {
    title: String(formData.get("title") ?? "").trim(),
    funder: String(formData.get("funder") ?? "").trim(),
    programName: stringOrNull(formData.get("programName")),
    stage: parseStage(formData.get("stage"), fallbackStage),
    ownerUserId,
    probability: parseProbability(formData.get("probability")),
    amountRequestedCents: parseAmountCents(formData.get("amountRequested")),
    amountAwardedCents: parseAmountCents(formData.get("amountAwarded")),
    loiDeadline: stringOrNull(formData.get("loiDeadline")),
    submissionDeadline: stringOrNull(formData.get("submissionDeadline")),
    decisionDate: stringOrNull(formData.get("decisionDate")),
    awardStartDate: stringOrNull(formData.get("awardStartDate")),
    notes: String(formData.get("notes") ?? "").trim() || null,
    companyId,
    contactId,
  };
}

export async function createOpportunityAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const input = await readOpportunityInput(formData, user.id, "Identified");
  if (!input.title || !input.funder) throw new Error("Title and funder are required.");

  const id = crypto.randomUUID();
  await createOpportunity({ ...input, id });

  redirect(`/portal/opportunities/${id}`);
}

export async function updateOpportunityAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const opportunityId = String(formData.get("opportunityId") ?? "");
  const opportunity = await getOpportunityById(opportunityId);
  if (!opportunity) throw new Error("Opportunity not found.");
  if (!canEditOpportunity(user, opportunity)) throw new PortalForbiddenError();

  // Only a Founding Operator can reassign ownership -- everyone else's form
  // doesn't render the picker at all, but re-check server-side regardless.
  const ownerUserId =
    user.tier === "Founding Operator" && formData.get("ownerUserId")
      ? String(formData.get("ownerUserId"))
      : opportunity.owner_user_id;

  const input = await readOpportunityInput(formData, ownerUserId, opportunity.stage);
  if (!input.title || !input.funder) throw new Error("Title and funder are required.");

  await updateOpportunity(opportunityId, input);

  redirect(`/portal/opportunities/${opportunityId}`);
}

// The go/no-go call is deliberately its own action, not just another stage
// value in the edit form -- it's the one decision the whole redesign was
// meant to make visible (who decided, when, why), not something to lose in
// a generic dropdown change.
export async function recordGoNoGoDecisionAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const opportunityId = String(formData.get("opportunityId") ?? "");
  const decision = String(formData.get("decision") ?? "");
  if (decision !== "Pursuing" && decision !== "No-Go") throw new Error("Invalid decision.");

  const opportunity = await getOpportunityById(opportunityId);
  if (!opportunity) throw new Error("Opportunity not found.");
  if (!canEditOpportunity(user, opportunity)) throw new PortalForbiddenError();

  await recordGoNoGoDecision({
    id: opportunityId,
    stage: decision,
    decidedByUserId: user.id,
    notes: String(formData.get("notes") ?? "").trim() || null,
  });

  revalidatePath(`/portal/opportunities/${opportunityId}`);
}

export async function addOpportunityActivityAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const opportunityId = String(formData.get("opportunityId") ?? "");
  const activityType = String(formData.get("activityType") ?? "Note");
  const body = String(formData.get("body") ?? "").trim();
  if (!body) throw new Error("Activity can't be empty.");
  if (!VALID_ACTIVITY_TYPES.includes(activityType as OpportunityActivityType)) {
    throw new Error("Invalid activity type.");
  }

  await addOpportunityActivity({
    id: crypto.randomUUID(),
    opportunityId,
    authorUserId: user.id,
    activityType: activityType as OpportunityActivityType,
    body,
    dueDate: stringOrNull(formData.get("dueDate")),
  });

  revalidatePath(`/portal/opportunities/${opportunityId}`);
}

export async function toggleOpportunityActivityAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const activityId = String(formData.get("activityId") ?? "");
  const opportunityId = String(formData.get("opportunityId") ?? "");
  const completed = String(formData.get("completed") ?? "") === "true";

  await setOpportunityActivityCompleted(activityId, completed);
  revalidatePath(`/portal/opportunities/${opportunityId}`);
}

// Same permission shape as addOpportunityActivityAction -- attaching a
// reference link is a lightweight, all-tiers "engage with this
// opportunity" action, not an edit of the core record.
export async function addOpportunityLinkAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const opportunityId = String(formData.get("opportunityId") ?? "");
  const urlRaw = String(formData.get("url") ?? "").trim();
  const label = stringOrNull(formData.get("label"));
  if (!/^https?:\/\/.+/i.test(urlRaw)) throw new Error("Enter a full URL starting with http:// or https://.");

  await addOpportunityLink({
    id: crypto.randomUUID(),
    opportunityId,
    url: urlRaw,
    label,
    createdByUserId: user.id,
  });

  revalidatePath(`/portal/opportunities/${opportunityId}`);
}

export async function removeOpportunityLinkAction(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");

  const linkId = String(formData.get("linkId") ?? "");
  const opportunityId = String(formData.get("opportunityId") ?? "");
  const opportunity = await getOpportunityById(opportunityId);
  if (!opportunity) throw new Error("Opportunity not found.");
  if (!canEditOpportunity(user, opportunity)) throw new PortalForbiddenError();

  await removeOpportunityLink(linkId);
  revalidatePath(`/portal/opportunities/${opportunityId}`);
}
