import { recordGoNoGoDecisionAction } from "@/app/portal/(app)/opportunities/actions";
import type { Opportunity } from "@/lib/portalTypes";

// The explicit go/no-go checkpoint the redesign was built around: while an
// opportunity sits in "Qualifying", someone has to actually decide whether
// it's worth the effort of pursuing -- and that decision (who, when, why)
// gets recorded here rather than disappearing into a generic stage change.
export function GoNoGoDecision({ opportunity }: { opportunity: Opportunity }) {
  if (opportunity.stage === "Qualifying") {
    return (
      <div className="rounded-md border border-copperAccent/40 bg-copperAccent/5 p-4">
        <h2 className="font-headline text-lg font-bold text-charcoal">Go / No-Go decision</h2>
        <p className="mt-1 font-body text-sm text-charcoal/70">
          Decide whether this opportunity is worth pursuing before more effort goes into it.
        </p>
        <form action={recordGoNoGoDecisionAction} className="mt-3 space-y-3">
          <input type="hidden" name="opportunityId" value={opportunity.id} />
          <textarea
            name="notes"
            rows={3}
            placeholder="Why? (capacity, fit, competitiveness, funding amount...)"
            className="w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              name="decision"
              value="Pursuing"
              className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90"
            >
              Go &mdash; pursue it
            </button>
            <button
              type="submit"
              name="decision"
              value="No-Go"
              className="rounded-md border border-red-700 px-4 py-2 font-body text-sm font-semibold text-red-700 hover:bg-red-700 hover:text-white"
            >
              No-Go &mdash; pass
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (opportunity.go_no_go_decided_at) {
    return (
      <div className="rounded-md border border-charcoal/10 p-4">
        <h2 className="font-headline text-lg font-bold text-charcoal">Go / No-Go decision</h2>
        <p className="mt-2 font-body text-sm text-charcoal/80">
          <span className={opportunity.stage === "No-Go" ? "font-semibold text-red-700" : "font-semibold text-evergreen"}>
            {opportunity.stage === "No-Go" ? "No-Go" : "Go"}
          </span>{" "}
          &middot; {opportunity.go_no_go_decided_at}
        </p>
        {opportunity.go_no_go_notes ? (
          <p className="mt-1 font-body text-sm text-charcoal/70">&ldquo;{opportunity.go_no_go_notes}&rdquo;</p>
        ) : null}
      </div>
    );
  }

  return null;
}
