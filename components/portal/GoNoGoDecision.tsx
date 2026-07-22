import { recordGoNoGoDecisionAction } from "@/app/portal/(app)/opportunities/actions";
import type { Opportunity } from "@/lib/portalTypes";

// The explicit go/no-go checkpoint the redesign was built around: while an
// opportunity sits in "Qualifying", someone has to actually decide whether
// it's worth the effort of pursuing -- and that decision (who, when, why)
// gets recorded here rather than disappearing into a generic stage change.
export function GoNoGoDecision({ opportunity }: { opportunity: Opportunity }) {
  if (opportunity.stage === "Qualifying") {
    return (
      <div className="card blueprint" style={{ borderColor: "var(--color-accent-2)", background: "var(--color-accent-2-100)" }}>
        <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
        <h2 style={{ fontSize: "17px" }}>Go / No-Go decision</h2>
        <p className="mt-1" style={{ fontSize: "13px" }}>
          Decide whether this opportunity is worth pursuing before more effort goes into it.
        </p>
        <form action={recordGoNoGoDecisionAction} className="mt-3 space-y-3">
          <input type="hidden" name="opportunityId" value={opportunity.id} />
          <textarea
            name="notes"
            rows={3}
            placeholder="Why? (capacity, fit, competitiveness, funding amount...)"
            className="input"
          />
          <div className="flex gap-2">
            <button type="submit" name="decision" value="Pursuing" className="btn btn-primary">
              Go &mdash; pursue it
            </button>
            <button
              type="submit"
              name="decision"
              value="No-Go"
              className="btn btn-secondary"
              style={{ color: "#a13328", borderColor: "#a13328" }}
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
      <div className="card blueprint">
        <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
        <h2 style={{ fontSize: "17px" }}>Go / No-Go decision</h2>
        <p className="mt-2" style={{ fontSize: "13px" }}>
          <span className={opportunity.stage === "No-Go" ? "tag tag-danger" : "tag tag-accent"}>
            {opportunity.stage === "No-Go" ? "No-Go" : "Go"}
          </span>{" "}
          &middot; {opportunity.go_no_go_decided_at}
        </p>
        {opportunity.go_no_go_notes ? (
          <p className="text-muted mt-1" style={{ fontSize: "13px" }}>&ldquo;{opportunity.go_no_go_notes}&rdquo;</p>
        ) : null}
      </div>
    );
  }

  return null;
}
