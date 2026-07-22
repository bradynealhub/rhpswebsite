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
      <h2 className="font-headline text-lg font-bold text-charcoal">Links</h2>

      {links.length === 0 ? (
        <p className="mt-2 font-body text-sm text-charcoal/50">No links yet.</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {links.map((link) => (
            <li key={link.id} className="flex items-center justify-between gap-2 rounded-md border border-charcoal/10 px-3 py-2">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 truncate font-body text-sm text-evergreen hover:underline"
                title={link.url}
              >
                🔗 {link.label || hostnameOf(link.url)}
              </a>
              {canRemove ? (
                <form action={removeOpportunityLinkAction} className="shrink-0">
                  <input type="hidden" name="opportunityId" value={opportunityId} />
                  <input type="hidden" name="linkId" value={link.id} />
                  <button type="submit" className="font-body text-xs text-charcoal/50 hover:text-red-700">
                    Remove
                  </button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <form action={addOpportunityLinkAction} className="mt-3 space-y-2 rounded-md border border-charcoal/10 p-3">
        <input type="hidden" name="opportunityId" value={opportunityId} />
        <input
          name="url"
          type="url"
          required
          placeholder="https://..."
          className="w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
        />
        <input
          name="label"
          placeholder="Label (optional)"
          className="w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
        />
        <button
          type="submit"
          className="rounded-md border border-charcoal/20 px-4 py-2 font-body text-sm text-charcoal hover:border-evergreen"
        >
          Add link
        </button>
      </form>
    </div>
  );
}
