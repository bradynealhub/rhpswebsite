import { addOpportunityLinkAction, removeOpportunityLinkAction } from "@/app/portal/(app)/opportunities/actions";
import type { OpportunityLinkWithAuthor } from "@/lib/portalTypes";

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

// Unlimited reference links per opportunity (NOFO pages, funder portals,
// application systems) -- the URL equivalent of OpportunityDocuments, no
// underlying file involved.
export function OpportunityLinks({
  opportunityId,
  links,
  canRemove,
}: {
  opportunityId: string;
  links: OpportunityLinkWithAuthor[];
  canRemove: boolean;
}) {
  return (
    <div>
      <h2 style={{ fontSize: "17px" }}>Links</h2>

      {links.length === 0 ? (
        <p className="text-muted mt-2" style={{ fontSize: "13px" }}>No links yet.</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {links.map((link) => (
            <li key={link.id} className="card blueprint flex items-center justify-between gap-2">
              <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 truncate"
                style={{ fontSize: "13px" }}
                title={link.url}
              >
                🔗 {link.label || hostnameOf(link.url)}
              </a>
              {canRemove ? (
                <form action={removeOpportunityLinkAction} className="shrink-0">
                  <input type="hidden" name="opportunityId" value={opportunityId} />
                  <input type="hidden" name="linkId" value={link.id} />
                  <button type="submit" className="btn btn-ghost" style={{ fontSize: "12px" }}>
                    Remove
                  </button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <form action={addOpportunityLinkAction} className="card blueprint mt-3 space-y-2">
        <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
        <input type="hidden" name="opportunityId" value={opportunityId} />
        <input name="url" type="url" required placeholder="https://..." className="input" />
        <input name="label" placeholder="Label (optional)" className="input" />
        <button type="submit" className="btn btn-secondary">
          Add link
        </button>
      </form>
    </div>
  );
}
