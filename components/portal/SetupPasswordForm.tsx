"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function SetupPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const password = String(new FormData(form).get("password") ?? "");
    const confirmPassword = String(new FormData(form).get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage("Passwords don't match.");
      return;
    }

    try {
      const res = await fetch("/portal/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      router.push("/portal/login");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="password" className="block font-body text-sm font-semibold text-charcoal">
          New password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
          className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
        />
        <p className="mt-1 font-body text-xs text-charcoal/60">At least 12 characters.</p>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block font-body text-sm font-semibold text-charcoal">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
          className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-md bg-evergreen px-6 py-3 font-body font-semibold text-warmStone transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Setting password..." : "Set password"}
      </button>
      {status === "error" ? (
        <p className="font-body text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
