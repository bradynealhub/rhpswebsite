import type { Opportunity, PortalUser } from "@/lib/portalTypes";

// Stages a person picks directly in this form. "Qualifying" -> "Pursuing"/
// "No-Go" is deliberately NOT here -- that transition happens through the
// dedicated go/no-go decision control (GoNoGoDecision.tsx) so the decision
// itself (who, when, why) gets recorded, not silently lost in a dropdown
// change. See app/portal/(app)/opportunities/actions.ts's header comment.
const STAGES = ["Identified", "Qualifying", "Pursuing", "Submitted", "Awarded", "Declined", "No-Go"] as const;

function centsToDollarsInput(cents: number | null | undefined): number | undefined {
  if (!cents) return undefined;
  return cents / 100;
}

// Server-renderable (no "use client") -- submits directly to a Server
// Action passed in via `action`, per Next.js App Router forms. Used for
// both create (no `opportunity`/`owners`) and edit.
export function OpportunityForm({
  action,
  opportunity,
  owners,
}: {
  action: (formData: FormData) => void | Promise<void>;
  opportunity?: Opportunity;
  owners?: Pick<PortalUser, "id" | "name" | "email">[];
}) {
  return (
    <form action={action} className="mt-6 max-w-2xl space-y-4">
      {opportunity ? <input type="hidden" name="opportunityId" value={opportunity.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block font-body text-sm font-semibold text-charcoal">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={opportunity?.title}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          />
        </div>
        <div>
          <label htmlFor="funder" className="block font-body text-sm font-semibold text-charcoal">
            Funder
          </label>
          <input
            id="funder"
            name="funder"
            required
            placeholder="e.g. Oklahoma State Department of Health"
            defaultValue={opportunity?.funder}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          />
        </div>
      </div>

      <div>
        <label htmlFor="programName" className="block font-body text-sm font-semibold text-charcoal">
          Program / RFP name
        </label>
        <input
          id="programName"
          name="programName"
          placeholder="e.g. RHTP Subrecipient Window 3"
          defaultValue={opportunity?.program_name ?? ""}
          className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
        />
        <p className="mt-1 font-body text-xs text-charcoal/50">The specific award/RFP, distinct from the funder itself.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="stage" className="block font-body text-sm font-semibold text-charcoal">
            Stage
          </label>
          <select
            id="stage"
            name="stage"
            defaultValue={opportunity?.stage ?? "Identified"}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          >
            {STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="probability" className="block font-body text-sm font-semibold text-charcoal">
            Win probability (%)
          </label>
          <input
            id="probability"
            name="probability"
            type="number"
            min="0"
            max="100"
            defaultValue={opportunity?.probability ?? undefined}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="amountRequested" className="block font-body text-sm font-semibold text-charcoal">
            Amount requested (USD)
          </label>
          <input
            id="amountRequested"
            name="amountRequested"
            type="number"
            step="0.01"
            min="0"
            defaultValue={centsToDollarsInput(opportunity?.amount_requested_cents)}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          />
        </div>
        <div>
          <label htmlFor="amountAwarded" className="block font-body text-sm font-semibold text-charcoal">
            Amount awarded (USD)
          </label>
          <input
            id="amountAwarded"
            name="amountAwarded"
            type="number"
            step="0.01"
            min="0"
            placeholder="Fill in once awarded"
            defaultValue={centsToDollarsInput(opportunity?.amount_awarded_cents)}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          />
          <p className="mt-1 font-body text-xs text-charcoal/50">Can differ from the amount requested.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="loiDeadline" className="block font-body text-sm font-semibold text-charcoal">
            LOI deadline
          </label>
          <input
            id="loiDeadline"
            name="loiDeadline"
            type="date"
            defaultValue={opportunity?.loi_deadline ?? ""}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          />
        </div>
        <div>
          <label htmlFor="submissionDeadline" className="block font-body text-sm font-semibold text-charcoal">
            Submission deadline
          </label>
          <input
            id="submissionDeadline"
            name="submissionDeadline"
            type="date"
            defaultValue={opportunity?.submission_deadline ?? ""}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          />
        </div>
        <div>
          <label htmlFor="decisionDate" className="block font-body text-sm font-semibold text-charcoal">
            Expected decision date
          </label>
          <input
            id="decisionDate"
            name="decisionDate"
            type="date"
            defaultValue={opportunity?.decision_date ?? ""}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          />
        </div>
        <div>
          <label htmlFor="awardStartDate" className="block font-body text-sm font-semibold text-charcoal">
            Award start date
          </label>
          <input
            id="awardStartDate"
            name="awardStartDate"
            type="date"
            defaultValue={opportunity?.award_start_date ?? ""}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          />
        </div>
      </div>

      {owners ? (
        <div>
          <label htmlFor="ownerUserId" className="block font-body text-sm font-semibold text-charcoal">
            Owner
          </label>
          <select
            id="ownerUserId"
            name="ownerUserId"
            defaultValue={opportunity?.owner_user_id}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
          >
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div>
        <label htmlFor="notes" className="block font-body text-sm font-semibold text-charcoal">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={opportunity?.notes ?? ""}
          className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-evergreen px-6 py-3 font-body font-semibold text-warmStone transition-opacity hover:opacity-90"
      >
        {opportunity ? "Save changes" : "Create opportunity"}
      </button>
    </form>
  );
}
