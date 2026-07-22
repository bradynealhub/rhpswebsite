import { convertLeadToOpportunityAction } from "@/app/portal/(app)/leads/actions";
import type { LeadWithDetails } from "@/lib/portalTypes";

// <details>/<summary> instead of client-side toggle state -- this is the
// one lead-to-opportunity handoff action, worth keeping visible-but-tucked-
// away without reaching for "use client" just to hide/show a form.
export function ConvertLeadForm({ lead }: { lead: LeadWithDetails }) {
  return (
    <details className="card blueprint" style={{ borderColor: "var(--color-accent)", background: "var(--color-accent-100)" }}>
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      <summary style={{ cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "17px" }}>
        Convert to opportunity
      </summary>
      <p className="mt-2" style={{ fontSize: "13px" }}>
        Worth pursuing? Turn this lead into an opportunity, carrying the contact and organization forward.
      </p>
      <form action={convertLeadToOpportunityAction} className="mt-3 space-y-3">
        <input type="hidden" name="leadId" value={lead.id} />
        <div className="field">
          <label htmlFor="convertTitle">Opportunity title</label>
          <input
            id="convertTitle"
            name="title"
            required
            placeholder="e.g. Case management partnership -- Mercy Rural"
            className="input"
          />
        </div>
        <div className="field">
          <label htmlFor="convertFunder">Funder / organization</label>
          <input id="convertFunder" name="funder" required defaultValue={lead.company_name ?? ""} className="input" />
        </div>
        <button type="submit" className="btn btn-primary">
          Create opportunity
        </button>
      </form>
    </details>
  );
}
