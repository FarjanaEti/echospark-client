"use client";
import { allUserService } from "@/services/allUser.service";
import { useEffect, useState } from "react";
// import { getAllUsers, toggleUserActive, changeUserRole } from "@/services/user.service";
import { toast } from "sonner";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await allUserService.getAllUsers();
      setUsers(res.data || []);
    } catch { toast.error("Failed to load users"); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleToggle = async (id: string, isActive: boolean) => {
    try {
      await allUserService.toggleUserActive(id, !isActive);
      toast.success("Updated!");
      load();
    } catch { toast.error("Failed"); }
  };

  const handleRole = async (id: string, role: string) => {
    try {
      await allUserService.changeUserRole(id, role);
      toast.success("Role changed!");
      load();
    } catch { toast.error("Failed"); }
  };

  if (loading) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-900 mb-6">Manage Users</h2>
      <div className="bg-white rounded-2xl border border-green-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-50 text-green-800">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-green-50 hover:bg-green-50/50">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleRole(u.id, e.target.value)}
                    className="text-xs border border-green-200 rounded-lg px-2 py-1"
                  >
                    <option value="MEMBER">MEMBER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                    {u.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggle(u.id, u.isActive)}
                    className={`text-xs px-3 py-1 rounded-full ${u.isActive ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}
                  >
                    {u.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}