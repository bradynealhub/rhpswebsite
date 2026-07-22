import { redirect } from "next/navigation";
import { LoginForm } from "@/components/portal/LoginForm";
import { getCurrentUser } from "@/lib/portalSession";

export default async function PortalLoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/portal");

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <div className="flex items-center gap-2" style={{ marginBottom: "8px" }}>
        <span style={{ color: "var(--color-accent)" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
            <path d="M9 6h6" /><path d="M9 10h6" /><path d="M9 14h6" /><path d="M2 22h20" />
          </svg>
        </span>
        <h1 style={{ fontSize: "28px", margin: 0 }}>RHPS Portal</h1>
      </div>
      <p className="text-muted" style={{ fontSize: "14px" }}>Sign in with your RHPS account.</p>
      <LoginForm />
    </main>
  );
}
