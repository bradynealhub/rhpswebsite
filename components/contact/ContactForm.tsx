"use client";

import { useState, type FormEvent } from "react";
import type { ContactRoleOption } from "@/content/types";

// Path-finder + form combined into one client component so a role click can
// pre-fill (but leave editable) the form's Role field, per doc §4.17 point 2.
export function ContactForm({
  intro,
  roles,
}: {
  intro: string;
  roles: ContactRoleOption[];
}) {
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("sent");
      form.reset();
      setRole("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact-form" className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-headline text-3xl font-bold text-charcoal">
          Tell us who you are
        </h2>
        <p className="mt-4 font-body text-lg leading-relaxed text-charcoal/80">
          {intro}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {roles.map((option) => (
            <button
              key={option.role}
              type="button"
              onClick={() => setRole(option.role)}
              aria-pressed={role === option.role}
              className={`rounded-md border px-4 py-3 text-left font-body transition-colors ${
                role === option.role
                  ? "border-evergreen bg-evergreen/10"
                  : "border-charcoal/10 hover:border-evergreen"
              }`}
            >
              <span className="block font-semibold text-charcoal">
                {option.role}
              </span>
              <span className="mt-1 block text-sm text-charcoal/70">
                {option.description}
              </span>
              <span className="mt-2 block text-sm font-semibold text-evergreen">
                {option.ctaLabel} &rarr;
              </span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
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
            <label htmlFor="organization" className="block font-body text-sm font-semibold text-charcoal">
              Organization or agency
            </label>
            <input
              id="organization"
              name="organization"
              className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
            />
          </div>
          <div>
            <label htmlFor="role" className="block font-body text-sm font-semibold text-charcoal">
              Role
            </label>
            <input
              id="role"
              name="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              placeholder="Select an option above, or type your own"
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
            <label htmlFor="phone" className="block font-body text-sm font-semibold text-charcoal">
              Phone (optional)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-body text-sm font-semibold text-charcoal">
              What are you trying to accomplish?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-md border border-charcoal/20 px-3 py-2 font-body"
            />
          </div>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-md bg-evergreen px-6 py-3 font-body font-semibold text-warmStone transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send"}
          </button>
          {status === "sent" ? (
            <p className="font-body text-evergreen" role="status">
              Thanks. Your message has been sent, and a practitioner will respond directly.
            </p>
          ) : null}
          {status === "error" ? (
            <p className="font-body text-red-700" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
