"use client";

import Navbar from "@/components/layoutlayout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { getCourses } from "@/services/courseService";
import { getStudents } from "@/services/studentService";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });
  const [studentsCount, setStudentsCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [activeCoursesCount, setActiveCoursesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [students, courses] = await Promise.all([getStudents(), getCourses()]);
        setStudentsCount(students.length || 0);
        setCoursesCount(courses.length || 0);
        setActiveCoursesCount(courses.filter((course: { status: string }) => course.status === "ACTIVE").length || 0);
      } catch {
        setStudentsCount(0);
        setCoursesCount(0);
        setActiveCoursesCount(0);
      } finally {
        setLoading(false);
      }
    };

    setUser({
      firstName: localStorage.getItem("firstName") || "",
      lastName: localStorage.getItem("lastName") || "",
      role: localStorage.getItem("role") || "",
    });

    loadData();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-8">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Overview</p>
              <h1 className="mt-2 text-3xl font-bold">
                Welcome {user.firstName} {user.lastName}
              </h1>
              <p className="mt-2 text-blue-100">Role: {user.role}</p>
            </div>

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
                <h3 className="text-lg font-semibold text-slate-700">Users</h3>
                <p className="mt-3 text-3xl font-bold text-amber-600">1</p>
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
