import { CreateUserForm } from "@/components/portal/CreateUserForm";
import { listUsers } from "@/lib/portalDb";
import { getCurrentUser } from "@/lib/portalSession";

export default async function PortalAdminUsersPage() {
  const user = await getCurrentUser();

  if (!user?.is_platform_admin) {
    return (
      <div>
        <h1 className="font-headline text-2xl font-bold text-charcoal">Forbidden</h1>
        <p className="mt-2 font-body text-charcoal/70">You don&rsquo;t have access to this page.</p>
      </div>
    );
  }

  const users = await listUsers();

  return (
    <div>
      <h1 className="font-headline text-2xl font-bold text-charcoal">Users</h1>
      <table className="mt-6 w-full max-w-3xl font-body text-sm">
        <thead>
          <tr className="border-b border-charcoal/10 text-left text-charcoal/60">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Tier</th>
            <th className="py-2">Status</th>
            <th className="py-2">Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-charcoal/5">
              <td className="py-2">{u.name}</td>
              <td className="py-2">{u.email}</td>
              <td className="py-2">{u.tier}</td>
              <td className="py-2">{u.status}</td>
              <td className="py-2">{u.is_platform_admin ? "Yes" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-10 font-headline text-xl font-bold text-charcoal">Create user</h2>
      <CreateUserForm />
    </div>
  );
}
