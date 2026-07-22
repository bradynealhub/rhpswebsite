import { claimLeadAction, updateLeadStatusAction } from "@/app/portal/(app)/leads/actions";
import type { LeadWithDetails } from "@/lib/portalTypes";

// Deliberately separate from OpportunityForm's stage <select> -- a lead's
// status is a triage state (has someone looked at this yet?), not a
// pipeline position, so it reads as a row of action buttons rather than a
// dropdown tucked into a bigger edit form.
export function LeadStatusPanel({ lead }: { lead: LeadWithDetails }) {
  if (!lead.owner_user_id) {
    return (
      <div className="card blueprint" style={{ borderColor: "var(--color-accent-2)", background: "var(--color-accent-2-100)" }}>
        <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
        <h2 style={{ fontSize: "17px" }}>Unclaimed</h2>
        <p className="mt-1" style={{ fontSize: "13px" }}>Claim this lead to start triaging it.</p>
        <form action={claimLeadAction} className="mt-3">
          <input type="hidden" name="leadId" value={lead.id} />
          <button type="submit" className="btn btn-primary">
            Claim this lead
          </button>
        </form>
      </div>
    );
  }

  if (lead.status === "Converted") {
    return (
      <div className="card blueprint" style={{ borderColor: "var(--color-accent)", background: "var(--color-accent-100)" }}>
        <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
        <h2 style={{ fontSize: "17px" }}>Converted</h2>
        <p className="mt-1" style={{ fontSize: "13px" }}>
          This lead became an opportunity and no longer needs triage.
        </p>
      </div>
    );
  }

  return (
    <div className="card blueprint">
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      <h2 style={{ fontSize: "17px" }}>Status</h2>
      <p className="text-muted mt-1" style={{ fontSize: "13px" }}>
        Claimed by {lead.owner_name} &middot; currently <strong>{lead.status}</strong>
      </p>

      <form action={updateLeadStatusAction} className="mt-3 space-y-3">
        <input type="hidden" name="leadId" value={lead.id} />
        <div className="field">
          <label htmlFor="notes">Working notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={lead.notes ?? ""}
            placeholder="Internal notes -- not the inquiry itself"
            className="input"
          />
        </div>
        {lead.status !== "Disqualified" ? (
          <div className="field">
            <label htmlFor="disqualifyReason">If disqualifying, why?</label>
            <input
              id="disqualifyReason"
              name="disqualifyReason"
              placeholder="e.g. out of service area, not a fit"
              className="input"
            />
          </div>
        ) : (
          <p style={{ fontSize: "13px" }}>Disqualified: {lead.disqualify_reason ?? "no reason given"}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <button type="submit" name="status" value="Contacted" className="btn btn-secondary">
            Mark Contacted
          </button>
          <button type="submit" name="status" value="Qualified" className="btn btn-primary">
            Mark Qualified
          </button>
          <button
            type="submit"
            name="status"
            value="Disqualified"
            className="btn btn-secondary"
            style={{ color: "#a13328", borderColor: "#a13328" }}
          >
            Disqualify
          </button>
        </div>
      </form>
    </div>
  );
}
