import { convertLeadToOpportunityAction } from "@/app/portal/(app)/leads/actions";
import type { LeadWithDetails } from "@/lib/portalTypes";

// <details>/<summary> instead of client-side toggle state -- this is the
// one lead-to-opportunity handoff action, worth keeping visible-but-tucked-
// away without reaching for "use client" just to hide/show a form.
export function ConvertLeadForm({ lead }: { lead: LeadWithDetails }) {
  return (
    <details className="rounded-md border border-evergreen/40 bg-evergreen/5 p-4">
      <summary className="cursor-pointer font-headline text-lg font-bold text-charcoal">
        Convert to opportunity
      </summary>
      <p className="mt-2 font-body text-sm text-charcoal/70">
        Worth pursuing? Turn this lead into an opportunity, carrying the contact and organization forward.
      </p>
      <form action={convertLeadToOpportunityAction} className="mt-3 space-y-3">
        <input type="hidden" name="leadId" value={lead.id} />
        <div>
          <label htmlFor="convertTitle" className="block font-body text-sm font-semibold text-charcoal">
            Opportunity title
          </label>
          <input
            id="convertTitle"
            name="title"
            required
            placeholder="e.g. Case management partnership -- Mercy Rural"
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
          />
        </div>
        <div>
          <label htmlFor="convertFunder" className="block font-body text-sm font-semibold text-charcoal">
            Funder / organization
          </label>
          <input
            id="convertFunder"
            name="funder"
            required
            defaultValue={lead.company_name ?? ""}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90"
        >
          Create opportunity
        </button>
      </form>
    </details>
  );
}
