"use client";

import { useState, type FormEvent } from "react";
import { createRichTextDocumentAction } from "@/app/portal/(app)/documents/actions";

export function NewRichTextDocumentForm({
  folderId,
  open: controlledOpen,
  onClose,
}: {
  folderId: string | null;
  open?: boolean;
  onClose?: () => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function close() {
    if (isControlled) onClose?.();
    else setUncontrolledOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      await createRichTextDocumentAction(new FormData(event.currentTarget));
      // createRichTextDocumentAction redirects on success; reaching here
      // means it didn't (Next.js implements redirect() by throwing, so a
      // clean return only happens if something upstream swallowed it).
    } catch (err) {
      // Next's redirect() throws a special error that isn't a real
      // failure -- only surface actual Error instances as a user-facing message.
      if (err instanceof Error && err.message !== "NEXT_REDIRECT") {
        setStatus("error");
        setErrorMessage(err.message);
      }
    }
  }

  if (!open) {
    if (isControlled) return null;
    return (
      <button
        type="button"
        onClick={() => setUncontrolledOpen(true)}
        className="rounded-md border border-charcoal/20 px-4 py-2 font-body text-sm text-charcoal hover:border-evergreen"
      >
        New document
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-3 rounded-md border border-charcoal/10 p-4">
      <input type="hidden" name="folderId" value={folderId ?? ""} />
      <div>
        <label htmlFor="rt-title" className="block font-body text-sm font-semibold text-charcoal">
          Title
        </label>
        <input
          id="rt-title"
          name="title"
          required
          autoFocus
          className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
        />
      </div>
      <div>
        <label htmlFor="rt-description" className="block font-body text-sm font-semibold text-charcoal">
          Description (optional)
        </label>
        <textarea
          id="rt-description"
          name="description"
          rows={2}
          className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
        />
      </div>
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
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? "Creating..." : "Create & start writing"}
        </button>
        <button type="button" onClick={close} className="font-body text-sm text-charcoal/60 hover:text-charcoal">
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
