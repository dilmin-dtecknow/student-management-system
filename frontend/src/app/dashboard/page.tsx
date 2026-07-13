"use client";

import Navbar from "@/components/layoutlayout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { getCourses } from "@/services/courseService";
import { getMyProfile, getStudents } from "@/services/studentService";
import { getUsers } from "@/services/userService";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user] = useState(() => ({
    firstName: typeof window !== "undefined" ? localStorage.getItem("firstName") || "" : "",
    lastName: typeof window !== "undefined" ? localStorage.getItem("lastName") || "" : "",
    role: typeof window !== "undefined" ? localStorage.getItem("role") || "" : "",
  }));
  const [studentsCount, setStudentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [activeCoursesCount, setActiveCoursesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
  } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const role = localStorage.getItem("role") || "";
        if (role === "STUDENT") {
          const studentProfile = await getMyProfile();
          setProfile(studentProfile);
        }

        const [students, courses, users] = await Promise.all([
          getStudents(),
          getCourses(),
          getUsers(),
        ]);

        setStudentsCount(students.length || 0);
        setCoursesCount(courses.length || 0);
        setActiveUsersCount(
          users.filter((user: { enabled?: boolean }) => user.enabled !== false).length || 0
        );
        setActiveCoursesCount(
          courses.filter((course: { status: string }) => course.status === "ACTIVE").length || 0
        );
      } catch {
        setStudentsCount(0);
        setCoursesCount(0);
        setActiveUsersCount(0);
        setActiveCoursesCount(0);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-8">
            <div className="rounded-2xl bg-linear-to-r from-blue-600 to-blue-800 p-8 text-white shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Overview</p>
              <h1 className="mt-2 text-3xl font-bold">
                Welcome {user.firstName} {user.lastName}
              </h1>
              <p className="mt-2 text-blue-100">Role: {user.role}</p>
            </div>

            {profile && (
              <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">Your Profile</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="font-medium">{profile.firstName} {profile.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-medium">{profile.phoneNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-medium">{profile.address}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-700">Students</h3>
                <p className="mt-3 text-3xl font-bold text-blue-600">{loading ? "—" : studentsCount}</p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-700">Courses</h3>
                <p className="mt-3 text-3xl font-bold text-green-600">{loading ? "—" : coursesCount}</p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-700">Active Users</h3>
                <p className="mt-3 text-3xl font-bold text-amber-600">
                  {loading ? "—" : activeUsersCount}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-700">Active Courses</h3>
                <p className="mt-3 text-3xl font-bold text-purple-600">{loading ? "—" : activeCoursesCount}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
