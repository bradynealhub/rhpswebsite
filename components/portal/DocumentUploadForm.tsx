"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

function readCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

// Route Handler (not a Server Action) because it needs to stream a
// multipart file upload straight to R2 -- see app/portal/api/documents/route.ts.
export function DocumentUploadForm({
  folderId,
  documentId,
}: {
  folderId?: string | null;
  documentId?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    if (folderId) formData.set("folderId", folderId);
    if (documentId) formData.set("documentId", documentId);

    try {
      const res = await fetch("/portal/api/documents", {
        method: "POST",
        headers: { "x-portal-csrf": readCookie("portal_csrf") },
        body: formData,
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; documentId?: string };
      if (!res.ok) throw new Error(body.error ?? "Upload failed. Please try again.");

      setOpen(false);
      setStatus("idle");
      form.reset();
      router.push(`/portal/documents/file/${body.documentId ?? documentId}`);
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90"
      >
        {documentId ? "Upload new version" : "Upload document"}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3 rounded-md border border-charcoal/10 p-4">
      {!documentId ? (
        <div>
          <label htmlFor="title" className="block font-body text-sm font-semibold text-charcoal">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
          />
        </div>
      ) : null}
      {!documentId ? (
        <div>
          <label htmlFor="description" className="block font-body text-sm font-semibold text-charcoal">
            Description (optional)
          </label>
          <textarea
            id="description"
            name="description"
            rows={2}
            className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
          />
        </div>
      ) : null}
      <div>
        <label htmlFor="file" className="block font-body text-sm font-semibold text-charcoal">
          File
        </label>
        <input id="file" name="file" type="file" required className="mt-1 w-full font-body text-sm" />
      </div>
      {!documentId ? (
        <fieldset>
          <legend className="font-body text-sm font-semibold text-charcoal">Who can see this?</legend>
          <div className="mt-1 flex gap-4">
            <label className="flex items-center gap-1.5 font-body text-sm text-charcoal">
              <input type="radio" name="visibility" value="Shared" defaultChecked />
              Everyone in the portal
            </label>
            <label className="flex items-center gap-1.5 font-body text-sm text-charcoal">
              <input type="radio" name="visibility" value="Private" />
              Only me (share it later)
            </label>
          </div>
        </fieldset>
      ) : null}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? "Uploading..." : "Upload"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="font-body text-sm text-charcoal/60 hover:text-charcoal"
        >
          Cancel
        </button>
      </div>
      {status === "error" ? (
        <p className="font-body text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
