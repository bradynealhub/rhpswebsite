"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

function readCookie(name: string): string {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

export function CreateUserForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [setupPath, setSetupPath] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setSetupPath(null);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/portal/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-portal-csrf": readCookie("portal_csrf"),
        },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; setupPath?: string };
      if (!res.ok) throw new Error(body.error ?? "Something went wrong. Please try again.");

      setSetupPath(body.setupPath ?? null);
      setStatus("idle");
      form.reset();
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
      <div>
        <label htmlFor="name" className="block font-body text-sm font-semibold text-charcoal">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-body text-sm font-semibold text-charcoal">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
        />
      </div>
      <div>
        <label htmlFor="tier" className="block font-body text-sm font-semibold text-charcoal">
          Tier
        </label>
        <select
          id="tier"
          name="tier"
          required
          defaultValue=""
          className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
        >
          <option value="" disabled>
            Select a tier
          </option>
          <option value="Founding Operator">Founding Operator</option>
          <option value="Advisory Council">Advisory Council</option>
          <option value="Contributor">Contributor</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <input id="isPlatformAdmin" name="isPlatformAdmin" type="checkbox" value="true" className="h-4 w-4" />
        <label htmlFor="isPlatformAdmin" className="font-body text-sm text-charcoal">
          Platform admin
        </label>
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-evergreen px-6 py-3 font-body font-semibold text-warmStone transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Creating..." : "Create user"}
      </button>
      {status === "error" ? (
        <p className="font-body text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
      {setupPath ? (
        <p className="font-body text-evergreen" role="status">
          Account created. Send this setup link: <code className="font-mono">{setupPath}</code>
        </p>
      ) : null}
    </form>
  );
}
