import { SetupPasswordForm } from "@/components/portal/SetupPasswordForm";
import { findValidInvite } from "@/lib/portalDb";

export default async function PortalSetupPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invite = await findValidInvite(token);

  if (!invite) {
    return (
      <main className="mx-auto max-w-md px-6 py-20">
        <h1 style={{ fontSize: "28px" }}>Link expired</h1>
        <p className="text-muted mt-2" style={{ fontSize: "14px" }}>
          This setup link is invalid or has expired. Ask a platform admin to send you a new one.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <h1 style={{ fontSize: "28px" }}>Set your password</h1>
      <p className="text-muted mt-2" style={{ fontSize: "14px" }}>Choose a password for your RHPS Portal account.</p>
      <SetupPasswordForm token={token} />
    </main>
  );
}
