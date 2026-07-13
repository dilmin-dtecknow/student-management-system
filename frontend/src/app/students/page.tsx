"use client";

import Navbar from "@/components/layoutlayout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { deleteStudent, enrollStudentToCourse, getStudents, updateStudent } from "@/services/studentService";
import { getCourses } from "@/services/courseService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [editStudent, setEditStudent] = useState<any>(null);
  const [enrollStudentId, setEnrollStudentId] = useState<string | null>(null);
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);

  useEffect(() => {
    loadStudents();
    loadCourses();
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

  async function loadCourses() {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch {
      setCourses([]);
    }
  }

  const handleDelete = async (studentId: string) => {
    if (!confirm("Delete this student?")) return;
    try {
      await deleteStudent(studentId);
      setStudents((prev) => prev.filter((student) => student.id !== studentId));
    } catch {
      setError("Failed to delete student");
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStudent) return;
    try {
      await updateStudent(editStudent.id, {
        userId: editStudent.user.id,
        address: editStudent.address,
        gender: editStudent.gender,
        courseIds: editStudent.courses?.map((course: any) => course.id) || [],
      });
      setEditStudent(null);
      loadStudents();
    } catch {
      setError("Failed to update student");
    }
  };

  const handleEnroll = async () => {
    if (!enrollStudentId) return;
    try {
      await enrollStudentToCourse(enrollStudentId, selectedCourseIds);
      setEnrollStudentId(null);
      setSelectedCourseIds([]);
      loadStudents();
    } catch {
      setError("Failed to enroll student");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
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
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <button onClick={() => setSelectedStudent(student)} className="rounded bg-slate-700 px-2 py-1 text-xs text-white">Profile</button>
                            <button onClick={() => setEditStudent(student)} className="rounded bg-green-600 px-2 py-1 text-xs text-white">Edit</button>
                            <button onClick={() => setEnrollStudentId(student.id)} className="rounded bg-blue-600 px-2 py-1 text-xs text-white">Enroll</button>
                            <button onClick={() => handleDelete(student.id)} className="rounded bg-red-600 px-2 py-1 text-xs text-white">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedStudent && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Student Profile</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div><p className="text-sm text-slate-500">Name</p><p className="font-medium">{selectedStudent.user?.firstName} {selectedStudent.user?.lastName}</p></div>
                  <div><p className="text-sm text-slate-500">Email</p><p className="font-medium">{selectedStudent.user?.email}</p></div>
                  <div><p className="text-sm text-slate-500">Phone</p><p className="font-medium">{selectedStudent.user?.phoneNumber}</p></div>
                  <div><p className="text-sm text-slate-500">Address</p><p className="font-medium">{selectedStudent.address}</p></div>
                  <div><p className="text-sm text-slate-500">Gender</p><p className="font-medium">{selectedStudent.gender}</p></div>
                  <div><p className="text-sm text-slate-500">Courses</p><p className="font-medium">{selectedStudent.courses?.map((c:any)=>c.courseName).join(", ") || "None"}</p></div>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="mt-4 rounded bg-slate-700 px-3 py-2 text-sm text-white">Close</button>
              </div>
            )}

            {editStudent && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Edit Student</h2>
                <form onSubmit={handleSaveEdit} className="mt-4 space-y-3">
                  <input value={editStudent.address} onChange={(e) => setEditStudent({ ...editStudent, address: e.target.value })} className="w-full rounded border p-3" placeholder="Address" />
                  <select value={editStudent.gender} onChange={(e) => setEditStudent({ ...editStudent, gender: e.target.value })} className="w-full rounded border p-3">
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                  <div className="flex gap-2">
                    <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white">Save</button>
                    <button type="button" onClick={() => setEditStudent(null)} className="rounded bg-slate-500 px-4 py-2 text-white">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {enrollStudentId && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold">Enroll Courses</h2>
                <div className="mt-4 flex flex-col gap-2">
                  {courses.map((course:any) => (
                    <label key={course.id} className="flex items-center gap-2">
                      <input type="checkbox" checked={selectedCourseIds.includes(course.id)} onChange={() => setSelectedCourseIds((prev) => prev.includes(course.id) ? prev.filter((id) => id !== course.id) : [...prev, course.id])} />
                      <span>{course.courseName}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={handleEnroll} className="rounded bg-blue-600 px-4 py-2 text-white">Save Enrollment</button>
                  <button onClick={() => { setEnrollStudentId(null); setSelectedCourseIds([]); }} className="rounded bg-slate-500 px-4 py-2 text-white">Cancel</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
