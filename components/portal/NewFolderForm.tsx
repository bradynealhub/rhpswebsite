"use client";

import { useState, type FormEvent } from "react";
import { createFolderAction } from "@/app/portal/(app)/documents/actions";

export function NewFolderForm({ parentFolderId }: { parentFolderId: string | null }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      await createFolderAction(new FormData(event.currentTarget));
      setOpen(false);
      setStatus("idle");
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
        className="rounded-md border border-charcoal/20 px-4 py-2 font-body text-sm text-charcoal hover:border-evergreen"
      >
        New folder
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input type="hidden" name="parentFolderId" value={parentFolderId ?? ""} />
      <input
        name="name"
        required
        autoFocus
        placeholder="Folder name"
        className="rounded-md border border-charcoal/20 px-3 py-2 font-body text-sm"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-evergreen px-3 py-2 font-body text-sm font-semibold text-warmStone hover:opacity-90 disabled:opacity-60"
      >
        Create
      </button>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="font-body text-sm text-charcoal/60 hover:text-charcoal"
      >
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
