"use client";
import Navbar from "@/components/layoutlayout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { getCourses } from "@/services/courseService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch {
      setError("Failed to load courses!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "STAFF", "STUDENT"]}>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Academics</p>
                <h1 className="text-3xl font-bold text-slate-900">Courses</h1>
              </div>

              <Link href="/courses/add" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700">
                Add Course
              </Link>
            </div>

            {loading && <p className="text-slate-600">Loading...</p>}
            {error && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">{error}</p>}

            {!loading && !error && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-900 text-left text-sm font-semibold text-white">
                    <tr>
                      <th className="px-4 py-3">Course</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3">Fee</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                    {courses.map((course: any) => (
                      <tr key={course.id}>
                        <td className="px-4 py-3 font-medium">{course.courseName}</td>
                        <td className="px-4 py-3">{course.description || "—"}</td>
                        <td className="px-4 py-3">{course.duration}</td>
                        <td className="px-4 py-3">Rs. {course.fee}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${course.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"}`}>
                            {course.status}
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
