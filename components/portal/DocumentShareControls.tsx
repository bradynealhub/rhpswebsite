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
    <div className="card blueprint">
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      <h2 style={{ fontSize: "17px", margin: 0 }}>Share</h2>
      <p className="text-muted" style={{ fontSize: "12px", margin: "2px 0 0" }}>
        Private -- only you and whoever you share it with can see this document.
      </p>

      {shares.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {shares.map((share) => (
            <li key={share.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate" style={{ fontSize: "13px" }}>{share.user_name}</p>
                <p className="text-muted truncate" style={{ fontSize: "11px" }}>{share.user_email}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="tag tag-neutral">{share.permission}</span>
                <form action={revokeShareAction}>
                  <input type="hidden" name="documentId" value={documentId} />
                  <input type="hidden" name="userId" value={share.user_id} />
                  <button type="submit" className="btn btn-ghost" style={{ fontSize: "12px" }}>
                    Remove
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted mt-3" style={{ fontSize: "13px" }}>Not shared with anyone yet.</p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-2" style={{ borderTop: "1px solid var(--color-divider)", paddingTop: "16px" }}>
        <input type="hidden" name="documentId" value={documentId} />
        <div className="field">
          <label htmlFor="share-email">Share with</label>
          <input id="share-email" name="email" type="email" required placeholder="name@example.com" className="input" />
        </div>
        <div className="flex items-center gap-2">
          <select name="permission" defaultValue="View" className="input" style={{ width: "auto" }}>
            <option value="View">Can view</option>
            <option value="Edit">Can edit</option>
          </select>
          <button type="submit" disabled={status === "submitting"} className="btn btn-primary">
            {status === "submitting" ? "Sharing..." : "Share"}
          </button>
        </div>
        {status === "error" ? (
          <p style={{ fontSize: "13px", color: "#a13328" }} role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}
