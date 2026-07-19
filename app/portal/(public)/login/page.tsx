import { redirect } from "next/navigation";
import { LoginForm } from "@/components/portal/LoginForm";
import { getCurrentUser } from "@/lib/portalSession";

export default async function PortalLoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/portal");

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <h1 className="font-headline text-3xl font-bold text-charcoal">RHPS Portal</h1>
      <p className="mt-2 font-body text-charcoal/70">Sign in with your RHPS account.</p>
      <LoginForm />
    </main>
  );
}
