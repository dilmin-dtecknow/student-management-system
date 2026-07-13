"use client";

import Navbar from "@/components/layoutlayout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { getUsers } from "@/services/userService";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    loadUsers();
  }, []);

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
