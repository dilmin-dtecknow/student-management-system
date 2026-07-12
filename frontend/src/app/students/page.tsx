"use client";

import Navbar from "@/components/layoutlayout/Navbar";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { getStudents } from "@/services/studentService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");

  // const role = localStorage.getItem("role");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const data = await getStudents();
      setStudents(data);
      // console.log(data)
    } catch {
      if (role === "STUDENT") {
        setError("Sorry you dont have access!");
        return;
      }
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Students</h1>

            <Link href="/students/add" className="rounded bg-blue-600 px-4 py-2 text-white cursor-pointer">
              Add Student
            </Link>
          </div>

          {loading && <p>Loading...</p>}

          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <table className="w-full border">
              <thead className="bg-blue-950">
                <tr>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Phone</th>
                  <th className="border p-3">Address</th>
                  <th className="border p-3">Gender</th>
                  <th className="border p-3">Courses</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student: any) => (
                  <tr key={student.id}>
                    <td className="border p-3">
                      {student.user.firstName} {student.user.lastName}
                    </td>

                    <td className="border p-3">{student.user.email}</td>

                    <td className="border p-3">{student.user.phoneNumber}</td>

                    <td className="border p-3">{student.address}</td>

                    <td className="border p-3">{student.gender}</td>

                    <td className="border p-3">
                      <div className="flex flex-wrap gap-2">
                        {student.courses.length > 0 ? (
                          student.courses.map((course: any) => (
                            <span
                              key={course.id}
                              className="rounded-full bg-blue-100 px-2 py-1 font-bold text-xs text-blue-700"
                            >
                              {course.courseName}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500">Not Enrolled</span>
                        )}
                      </div>
                    </td>

                    <td className="border p-3 space-x-2">
                      <button className="rounded bg-green-600 px-3 py-1 text-white cursor-pointer">
                        Edit
                      </button>

                      <button className="rounded bg-red-600 px-3 py-1 text-white cursor-pointer">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
}
