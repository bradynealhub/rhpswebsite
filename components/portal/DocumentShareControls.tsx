"use client";

import { useState, type FormEvent } from "react";
import { revokeShareAction, shareDocumentAction } from "@/app/portal/(app)/documents/actions";
import type { DocumentShareWithUser } from "@/lib/portalTypes";

// Owner/admin-only panel on a private document's detail page -- see
// migrations/0005 and getDocumentAccessLevel for what "View" vs "Edit"
// actually grants a collaborator.
export function DocumentShareControls({
  documentId,
  shares,
}: {
  documentId: string;
  shares: DocumentShareWithUser[];
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const form = event.currentTarget;
    try {
      await shareDocumentAction(new FormData(form));
      form.reset();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="rounded-md border border-charcoal/10 p-4">
      <h2 className="font-headline text-lg font-bold text-charcoal">Share</h2>
      <p className="mt-1 font-body text-xs text-charcoal/50">
        Private -- only you and whoever you share it with can see this document.
      </p>

      {shares.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {shares.map((share) => (
            <li key={share.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-body text-sm text-charcoal">{share.user_name}</p>
                <p className="truncate font-body text-xs text-charcoal/50">{share.user_email}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="font-body text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                  {share.permission}
                </span>
                <form action={revokeShareAction}>
                  <input type="hidden" name="documentId" value={documentId} />
                  <input type="hidden" name="userId" value={share.user_id} />
                  <button type="submit" className="font-body text-xs text-charcoal/50 hover:text-red-700">
                    Remove
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 font-body text-sm text-charcoal/50">Not shared with anyone yet.</p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-2 border-t border-charcoal/10 pt-4">
        <input type="hidden" name="documentId" value={documentId} />
        <label htmlFor="share-email" className="block font-body text-sm font-semibold text-charcoal">
          Share with
        </label>
        <input
          id="share-email"
          name="email"
          type="email"
          required
          placeholder="name@example.com"
          className="w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
        />
        <div className="flex items-center gap-2">
          <select
            name="permission"
            defaultValue="View"
            className="rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
          >
            <option value="View">Can view</option>
            <option value="Edit">Can edit</option>
          </select>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90 disabled:opacity-60"
          >
            {status === "submitting" ? "Sharing..." : "Share"}
          </button>
        </div>
        {status === "error" ? (
          <p className="font-body text-sm text-red-700" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}
