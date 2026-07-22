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
      <button
        type="button"
        onClick={() => setUncontrolledOpen(true)}
        className="rounded-md border border-charcoal/20 px-4 py-2 font-body text-sm text-charcoal hover:border-evergreen"
      >
        New folder
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-80 items-center gap-2 rounded-lg border border-charcoal/10 bg-white p-4 shadow-lg"
    >
      <input type="hidden" name="parentFolderId" value={parentFolderId ?? ""} />
      <input
        name="name"
        required
        autoFocus
        placeholder="Folder name"
        className="min-w-0 flex-1 rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-evergreen px-3 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90 disabled:opacity-60"
      >
        Create
      </button>
      <button type="button" onClick={close} className="font-body text-sm text-charcoal/60 hover:text-charcoal">
        Cancel
      </button>
      {status === "error" ? (
        <p className="font-body text-sm text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
