import Link from "next/link";
import { countOpportunitiesByStage } from "@/lib/portalDb";
import { getCurrentUser } from "@/lib/portalSession";

export default async function PortalDashboardPage() {
  const [user, stageCounts] = await Promise.all([getCurrentUser(), countOpportunitiesByStage()]);

  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-charcoal">Welcome, {user?.name}</h1>
      <p className="mt-2 font-body text-charcoal/70">
        Signed in as {user?.email} &middot; {user?.tier}
        {user?.is_platform_admin ? " · Platform Admin" : ""}
      </p>

      <h2 className="mt-10 font-headline text-lg font-bold text-charcoal">Opportunities by stage</h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {(Object.entries(stageCounts) as [string, number][]).map(([stage, count]) => (
          <div key={stage} className="rounded-md border border-charcoal/10 p-4">
            <p className="font-body text-2xl font-bold text-charcoal">{count}</p>
            <p className="font-body text-sm text-charcoal/60">{stage}</p>
          </div>
        ))}
      </div>
      <Link href="/portal/opportunities" className="mt-4 inline-block font-body text-sm text-evergreen hover:underline">
        View all opportunities &rarr;
      </Link>
    </div>
  );
}
