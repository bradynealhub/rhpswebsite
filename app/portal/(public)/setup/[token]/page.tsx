import { SetupPasswordForm } from "@/components/portal/SetupPasswordForm";
import { findValidInvite } from "@/lib/portalDb";

export default async function PortalSetupPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invite = await findValidInvite(token);

  if (!invite) {
    return (
      <main className="mx-auto max-w-md px-6 py-20">
        <h1 className="font-headline text-3xl font-bold text-charcoal">Link expired</h1>
        <p className="mt-2 font-body text-charcoal/70">
          This setup link is invalid or has expired. Ask a platform admin to send you a new one.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <h1 className="font-headline text-3xl font-bold text-charcoal">Set your password</h1>
      <p className="mt-2 font-body text-charcoal/70">Choose a password for your RHPS Portal account.</p>
      <SetupPasswordForm token={token} />
    </main>
  );
}
