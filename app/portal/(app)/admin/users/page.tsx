import { CreateUserForm } from "@/components/portal/CreateUserForm";
import { listUsers } from "@/lib/portalDb";
import { getCurrentUser } from "@/lib/portalSession";

export default async function PortalAdminUsersPage() {
  const user = await getCurrentUser();

  if (!user?.is_platform_admin) {
    return (
      <div>
        <h1>Forbidden</h1>
        <p className="text-muted mt-2" style={{ fontSize: "15px" }}>You don&rsquo;t have access to this page.</p>
      </div>
    );
  }

  const users = await listUsers();

  return (
    <div>
      <h1>Users</h1>
      <table className="table mt-6" style={{ maxWidth: "640px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Tier</th>
            <th>Status</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.tier}</td>
              <td>{u.status}</td>
              <td>{u.is_platform_admin ? "Yes" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="mt-10" style={{ fontSize: "20px" }}>Create user</h2>
      <CreateUserForm />
    </div>
  );
}
