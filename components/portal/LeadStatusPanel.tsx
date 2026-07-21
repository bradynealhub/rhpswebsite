import { claimLeadAction, updateLeadStatusAction } from "@/app/portal/(app)/leads/actions";
import type { LeadWithDetails } from "@/lib/portalTypes";

// Deliberately separate from OpportunityForm's stage <select> -- a lead's
// status is a triage state (has someone looked at this yet?), not a
// pipeline position, so it reads as a row of action buttons rather than a
// dropdown tucked into a bigger edit form.
export function LeadStatusPanel({ lead }: { lead: LeadWithDetails }) {
  if (!lead.owner_user_id) {
    return (
      <div className="rounded-md border border-copperAccent/40 bg-copperAccent/5 p-4">
        <h2 className="font-headline text-lg font-bold text-charcoal">Unclaimed</h2>
        <p className="mt-1 font-body text-sm text-charcoal/70">Claim this lead to start triaging it.</p>
        <form action={claimLeadAction} className="mt-3">
          <input type="hidden" name="leadId" value={lead.id} />
          <button
            type="submit"
            className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90"
          >
            Claim this lead
          </button>
        </form>
      </div>
    );
  }

  if (lead.status === "Converted") {
    return (
      <div className="rounded-md border border-evergreen/30 bg-evergreen/5 p-4">
        <h2 className="font-headline text-lg font-bold text-charcoal">Converted</h2>
        <p className="mt-1 font-body text-sm text-charcoal/70">
          This lead became an opportunity and no longer needs triage.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-charcoal/10 p-4">
      <h2 className="font-headline text-lg font-bold text-charcoal">Status</h2>
      <p className="mt-1 font-body text-sm text-charcoal/60">
        Claimed by {lead.owner_name} &middot; currently <strong>{lead.status}</strong>
      </p>

      <form action={updateLeadStatusAction} className="mt-3 space-y-3">
        <input type="hidden" name="leadId" value={lead.id} />
        <div>
          <label htmlFor="notes" className="block font-body text-sm font-semibold text-charcoal">
            Working notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={lead.notes ?? ""}
            placeholder="Internal notes -- not the inquiry itself"
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
          />
        </div>
        {lead.status !== "Disqualified" ? (
          <div>
            <label htmlFor="disqualifyReason" className="block font-body text-sm font-semibold text-charcoal">
              If disqualifying, why?
            </label>
            <input
              id="disqualifyReason"
              name="disqualifyReason"
              placeholder="e.g. out of service area, not a fit"
              className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
            />
          </div>
        ) : (
          <p className="font-body text-sm text-charcoal/70">
            Disqualified: {lead.disqualify_reason ?? "no reason given"}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            name="status"
            value="Contacted"
            className="rounded-md border border-slateBlue px-3 py-2 font-body text-sm font-semibold text-slateBlue hover:bg-slateBlue hover:text-white"
          >
            Mark Contacted
          </button>
          <button
            type="submit"
            name="status"
            value="Qualified"
            className="rounded-md border border-evergreen px-3 py-2 font-body text-sm font-semibold text-evergreen hover:bg-evergreen hover:text-white"
          >
            Mark Qualified
          </button>
          <button
            type="submit"
            name="status"
            value="Disqualified"
            className="rounded-md border border-red-700 px-3 py-2 font-body text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white"
          >
            Disqualify
          </button>
        </div>
      </form>
    </div>
  );
}
