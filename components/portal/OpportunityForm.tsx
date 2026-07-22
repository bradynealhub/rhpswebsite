import type { OpportunityWithOwner, PortalUser } from "@/lib/portalTypes";

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
  opportunity?: OpportunityWithOwner;
  owners?: Pick<PortalUser, "id" | "name" | "email">[];
}) {
  return (
    <form action={action} className="mt-6 max-w-2xl space-y-4">
      {opportunity ? <input type="hidden" name="opportunityId" value={opportunity.id} /> : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="title" >
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={opportunity?.title}
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="funder" >
            Funder
          </label>
          <input
            id="funder"
            name="funder"
            required
            placeholder="e.g. Oklahoma State Department of Health"
            defaultValue={opportunity?.funder}
            className="input"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="programName" >
          Program / RFP name
        </label>
        <input
          id="programName"
          name="programName"
          placeholder="e.g. RHTP Subrecipient Window 3"
          defaultValue={opportunity?.program_name ?? ""}
          className="input"
        />
        <p className="text-muted" style={{ fontSize: "11px", margin: "4px 0 0" }}>The specific award/RFP, distinct from the funder itself.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="stage" >
            Stage
          </label>
          <select
            id="stage"
            name="stage"
            defaultValue={opportunity?.stage ?? "Identified"}
            className="input"
          >
            {STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="probability" >
            Win probability (%)
          </label>
          <input
            id="probability"
            name="probability"
            type="number"
            min="0"
            max="100"
            defaultValue={opportunity?.probability ?? undefined}
            className="input"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="amountRequested" >
            Amount requested (USD)
          </label>
          <input
            id="amountRequested"
            name="amountRequested"
            type="number"
            step="0.01"
            min="0"
            defaultValue={centsToDollarsInput(opportunity?.amount_requested_cents)}
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="amountAwarded" >
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
            className="input"
          />
          <p className="text-muted" style={{ fontSize: "11px", margin: "4px 0 0" }}>Can differ from the amount requested.</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="loiDeadline" >
            LOI deadline
          </label>
          <input
            id="loiDeadline"
            name="loiDeadline"
            type="date"
            defaultValue={opportunity?.loi_deadline ?? ""}
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="submissionDeadline" >
            Submission deadline
          </label>
          <input
            id="submissionDeadline"
            name="submissionDeadline"
            type="date"
            defaultValue={opportunity?.submission_deadline ?? ""}
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="decisionDate" >
            Expected decision date
          </label>
          <input
            id="decisionDate"
            name="decisionDate"
            type="date"
            defaultValue={opportunity?.decision_date ?? ""}
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="awardStartDate" >
            Award start date
          </label>
          <input
            id="awardStartDate"
            name="awardStartDate"
            type="date"
            defaultValue={opportunity?.award_start_date ?? ""}
            className="input"
          />
        </div>
      </div>

      <div className="card blueprint">
        <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
        <h6>Organization &amp; contact</h6>
        <p className="text-muted" style={{ fontSize: "11px", margin: "4px 0 0" }}>
          The organization and person on the other side of this opportunity -- not necessarily the funder itself
          (e.g. a program officer, or a hospital&rsquo;s point of contact).
        </p>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div className="field">
            <label htmlFor="companyName" >
              Company / organization
            </label>
            <input
              id="companyName"
              name="companyName"
              defaultValue={opportunity?.company_name ?? ""}
              className="input"
            />
          </div>
          <div className="field">
            <label htmlFor="contactName" >
              Contact name
            </label>
            <input
              id="contactName"
              name="contactName"
              defaultValue={opportunity?.contact_name ?? ""}
              className="input"
            />
          </div>
          <div className="field">
            <label htmlFor="contactEmail" >
              Contact email
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              defaultValue={opportunity?.contact_email ?? ""}
              className="input"
            />
          </div>
          <div className="field">
            <label htmlFor="contactPhone" >
              Contact phone
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              defaultValue={opportunity?.contact_phone ?? ""}
              className="input"
            />
          </div>
        </div>
      </div>

      {owners ? (
        <div className="field">
          <label htmlFor="ownerUserId" >
            Owner
          </label>
          <select
            id="ownerUserId"
            name="ownerUserId"
            defaultValue={opportunity?.owner_user_id}
            className="input"
          >
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="field">
        <label htmlFor="notes" >
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={opportunity?.notes ?? ""}
          className="input"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {opportunity ? "Save changes" : "Create opportunity"}
      </button>
    </form>
  );
}
