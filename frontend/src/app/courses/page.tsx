"use client";
import Navbar from "@/components/layoutlayout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { deleteCourse, getCourses, updateCourse } from "@/services/courseService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editCourse, setEditCourse] = useState<any>(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
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

  const handleDelete = async (courseId: string) => {
    if (!confirm("Delete this course?")) return;
    try {
      await deleteCourse(courseId);
      setCourses((prev) => prev.filter((course) => course.id !== courseId));
    } catch {
      setError("Failed to delete course");
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCourse) return;
    try {
      await updateCourse(editCourse.id, {
        courseName: editCourse.courseName,
        description: editCourse.description,
        duration: editCourse.duration,
        fee: Number(editCourse.fee),
        status: editCourse.status,
      });
      setEditCourse(null);
      loadCourses();
    } catch {
      setError("Failed to update course");
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

              {role !== "STUDENT" && (
                <Link href="/courses/add" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700">
                  Add Course
                </Link>
              )}
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
                        {role !== "STUDENT" && (
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-2">
                              <button onClick={() => setEditCourse(course)} className="rounded bg-green-600 px-2 py-1 text-xs text-white">Edit</button>
                              <button onClick={() => handleDelete(course.id)} className="rounded bg-red-600 px-2 py-1 text-xs text-white">Delete</button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {editCourse && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Edit Course</h2>
                <form onSubmit={handleSaveEdit} className="mt-4 space-y-3">
                  <input value={editCourse.courseName} onChange={(e) => setEditCourse({ ...editCourse, courseName: e.target.value })} className="w-full rounded border p-3" placeholder="Course Name" />
                  <textarea value={editCourse.description || ""} onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })} className="min-h-24 w-full rounded border p-3" placeholder="Description" />
                  <div className="grid gap-4 md:grid-cols-3">
                    <input value={editCourse.duration} onChange={(e) => setEditCourse({ ...editCourse, duration: e.target.value })} className="rounded border p-3" placeholder="Duration" />
                    <input type="number" value={editCourse.fee} onChange={(e) => setEditCourse({ ...editCourse, fee: e.target.value })} className="rounded border p-3" placeholder="Fee" />
                    <select value={editCourse.status} onChange={(e) => setEditCourse({ ...editCourse, status: e.target.value })} className="rounded border p-3">
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Save</button>
                    <button type="button" onClick={() => setEditCourse(null)} className="rounded bg-slate-500 px-4 py-2 text-white">Cancel</button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
