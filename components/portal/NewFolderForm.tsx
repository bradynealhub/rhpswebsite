"use client";

import { useState, type FormEvent } from "react";
import { createFolderAction } from "@/app/portal/(app)/documents/actions";

// Controlled (open/onClose passed) when driven by NewItemMenu's dropdown;
// uncontrolled (renders its own trigger button) otherwise -- standard
// controllable-component pattern so existing standalone usage keeps working
// unchanged.
export function NewFolderForm({
  parentFolderId,
  open: controlledOpen,
  onClose,
}: {
  parentFolderId: string | null;
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
      await createFolderAction(new FormData(event.currentTarget));
      close();
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!open) {
    if (isControlled) return null;
    return (
      <button type="button" onClick={() => setUncontrolledOpen(true)} className="btn btn-secondary">
        New folder
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="dialog blueprint elev-md" style={{ width: "320px" }}>
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      <input type="hidden" name="parentFolderId" value={parentFolderId ?? ""} />
      <div className="field">
        <label htmlFor="folder-name">Folder name</label>
        <input id="folder-name" name="name" required autoFocus placeholder="e.g. Q4 Grant Cycle" className="input" />
      </div>
      <div className="dialog-actions">
        <button type="button" onClick={close} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={status === "submitting"} className="btn btn-primary">
          Create folder
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
