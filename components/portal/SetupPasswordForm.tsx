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
      <div className="field">
        <label htmlFor="password" >
          New password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
          className="input"
        />
        <p className="text-muted" style={{ fontSize: "11px", margin: "4px 0 0" }}>At least 12 characters.</p>
      </div>
      <div className="field">
        <label htmlFor="confirmPassword" >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
          className="input"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary"
      >
        {status === "submitting" ? "Setting password..." : "Set password"}
      </button>
      {status === "error" ? (
        <p style={{ fontSize: "14px", color: "#a13328" }} role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
