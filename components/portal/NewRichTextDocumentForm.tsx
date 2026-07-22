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
      <button type="button" onClick={() => setUncontrolledOpen(true)} className="btn btn-secondary">
        New document
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="dialog blueprint elev-md" style={{ width: "320px" }}>
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      <input type="hidden" name="folderId" value={folderId ?? ""} />
      <div className="field">
        <label htmlFor="rt-title">Title</label>
        <input id="rt-title" name="title" required autoFocus className="input" />
      </div>
      <div className="field">
        <label htmlFor="rt-description">Description (optional)</label>
        <textarea id="rt-description" name="description" rows={2} className="input" />
      </div>
      <fieldset className="field">
        <label>Who can see this?</label>
        <div className="flex flex-col gap-1.5">
          <label className="flex items-center gap-1.5" style={{ fontSize: "14px" }}>
            <input type="radio" name="visibility" value="Shared" defaultChecked />
            Everyone in the portal
          </label>
          <label className="flex items-center gap-1.5" style={{ fontSize: "14px" }}>
            <input type="radio" name="visibility" value="Private" />
            Only me (share it later)
          </label>
        </div>
      </fieldset>
      <div className="dialog-actions">
        <button type="button" onClick={close} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={status === "submitting"} className="btn btn-primary">
          {status === "submitting" ? "Creating..." : "Create & start writing"}
        </button>
      </div>
      {status === "error" ? (
        <p style={{ fontSize: "13px", color: "#a13328" }} role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
