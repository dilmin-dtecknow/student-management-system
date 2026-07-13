"use client";

import Navbar from "@/components/layoutlayout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { getMyProfile } from "@/services/studentService";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch {
        setError("Unable to load your profile right now.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <ProtectedRoute allowedRoles={["STUDENT"]}>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Account</p>
              <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
            </div>

            {loading && <p className="text-slate-600">Loading profile...</p>}
            {error && <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">{error}</p>}

            {!loading && profile && (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                    {profile.firstName?.[0] || "S"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">{profile.firstName} {profile.lastName}</h2>
                    <p className="text-sm text-slate-500">Student</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="mt-1 font-medium text-slate-800">{profile.email}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="mt-1 font-medium text-slate-800">{profile.phoneNumber}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="mt-1 font-medium text-slate-800">{profile.address}</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Gender</p>
                    <p className="mt-1 font-medium text-slate-800">{profile.gender}</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
