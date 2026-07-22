"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

function readCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

// Route Handler (not a Server Action) because it needs to stream a
// multipart file upload straight to R2 -- see app/portal/api/documents/route.ts.
//
// Controlled (open/onClose passed) when driven by NewItemMenu's dropdown;
// uncontrolled otherwise -- the file detail page's "Upload new version"
// usage (documentId set) never passes these, so it keeps its own
// self-contained trigger button regardless of this component's other callers.
export function DocumentUploadForm({
  folderId,
  documentId,
  opportunityId,
  open: controlledOpen,
  onClose,
}: {
  folderId?: string | null;
  documentId?: string;
  opportunityId?: string;
  open?: boolean;
  onClose?: () => void;
}) {
  const router = useRouter();
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

    const form = event.currentTarget;
    const formData = new FormData(form);
    if (folderId) formData.set("folderId", folderId);
    if (documentId) formData.set("documentId", documentId);
    if (opportunityId) formData.set("opportunityId", opportunityId);

    try {
      const res = await fetch("/portal/api/documents", {
        method: "POST",
        headers: { "x-portal-csrf": readCookie("portal_csrf") },
        body: formData,
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; documentId?: string };
      if (!res.ok) throw new Error(body.error ?? "Upload failed. Please try again.");

      close();
      setStatus("idle");
      form.reset();
      // From an opportunity page, stay put and just refresh the attached-
      // documents list -- navigating to the new document would be a jarring
      // detour from what the user was actually doing.
      if (opportunityId) router.refresh();
      else {
        router.push(`/portal/documents/file/${body.documentId ?? documentId}`);
        router.refresh();
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (!open) {
    if (isControlled) return null;
    return (
      <button type="button" onClick={() => setUncontrolledOpen(true)} className="btn btn-primary">
        {documentId ? "Upload new version" : "Upload document"}
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="dialog blueprint elev-md" style={{ width: "320px" }}>
      <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
      {!documentId ? (
        <div className="field">
          <label htmlFor="title">Title</label>
          <input id="title" name="title" required className="input" />
        </div>
      ) : null}
      {!documentId ? (
        <div className="field">
          <label htmlFor="description">Description (optional)</label>
          <textarea id="description" name="description" rows={2} className="input" />
        </div>
      ) : null}
      <div className="field">
        <label htmlFor="file">File</label>
        <input id="file" name="file" type="file" required style={{ fontSize: "13px" }} />
      </div>
      {!documentId ? (
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
      ) : null}
      <div className="dialog-actions">
        <button type="button" onClick={close} className="btn btn-secondary">
          Cancel
        </button>
        <button type="submit" disabled={status === "submitting"} className="btn btn-primary">
          {status === "submitting" ? "Uploading..." : "Upload"}
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
