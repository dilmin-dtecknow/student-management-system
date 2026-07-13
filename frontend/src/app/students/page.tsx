"use client";

import Navbar from "@/components/layoutlayout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { getStudents } from "@/services/studentService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">People</p>
                <h1 className="text-3xl font-bold text-slate-900">Students</h1>
              </div>

              <Link href="/students/add" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700">
                Add Student
              </Link>
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
                      <th className="px-4 py-3">Address</th>
                      <th className="px-4 py-3">Gender</th>
                      <th className="px-4 py-3">Courses</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                    {students.map((student: any) => (
                      <tr key={student.id}>
                        <td className="px-4 py-3 font-medium">{student.user?.firstName} {student.user?.lastName}</td>
                        <td className="px-4 py-3">{student.user?.email}</td>
                        <td className="px-4 py-3">{student.user?.phoneNumber}</td>
                        <td className="px-4 py-3">{student.address}</td>
                        <td className="px-4 py-3">{student.gender}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            {student.courses?.length > 0 ? (
                              student.courses.map((course: any) => (
                                <span key={course.id} className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                                  {course.courseName}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-500">Not Enrolled</span>
                            )}
                          </div>
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
