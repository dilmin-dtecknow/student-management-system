"use client";

import Navbar from "@/components/layoutlayout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { createUser, getUsers } from "@/services/userService";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "", password: "", role: "STAFF", enabled: true });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ ...form, enabled: true });
      setForm({ firstName: "", lastName: "", email: "", phoneNumber: "", password: "", role: "STAFF", enabled: true });
      loadUsers();
    } catch {
      setError("Failed to create user");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">System</p>
              <h1 className="text-3xl font-bold text-slate-900">Users</h1>
            </div>

            {loading && <p className="text-slate-600">Loading...</p>}
            {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">{error}</p>}

            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Create User</h2>
              <form onSubmit={handleCreateUser} className="mt-4 grid gap-3 md:grid-cols-2">
                <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="rounded border p-3" placeholder="First Name" required />
                <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="rounded border p-3" placeholder="Last Name" required />
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded border p-3" placeholder="Email" required />
                <input value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} className="rounded border p-3" placeholder="Phone" required />
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="rounded border p-3" placeholder="Password" required />
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="rounded border p-3">
                  <option value="STAFF">STAFF</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <div className="md:col-span-2">
                  <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Create User</button>
                </div>
              </form>
            </div>

            {!loading && !error && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-900 text-left text-sm font-semibold text-white">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-4 py-3 font-medium">{user.firstName} {user.lastName}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.phoneNumber}</td>
                        <td className="px-4 py-3">{user.role}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.enabled ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {user.enabled ? "Active" : "Disabled"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
