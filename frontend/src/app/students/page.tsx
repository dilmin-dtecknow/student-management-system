"use client";

import Navbar from "@/components/layoutlayout/Navbar";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { getStudents } from "@/services/studentService";
import { useEffect, useState } from "react";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
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

            <button className="rounded bg-blue-600 px-4 py-2 text-white">
              Add Student
            </button>
          </div>

          {loading && <p>Loading...</p>}

          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <table className="w-full border">
              <thead className="bg-blue-950">
                <tr>
                  <th className="border p-3">First Name</th>
                  <th className="border p-3">Last Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Phone</th>
                  <th className="border p-3">Actions</th>
                  {/* <th className="border p-3">Enrolled</th> */}
                </tr>
              </thead>

              <tbody>
                {students.map((student: any) => (
                  <tr key={student.id}>
                    <td className="border p-3">{student.user.firstName}</td>

                    <td className="border p-3">{student.user.lastName}</td>

                    <td className="border p-3">{student.user.email}</td>

                    <td className="border p-3">{student.user.phoneNumber}</td>

                    <td className="border p-3">
                      <button className="mr-2 rounded bg-green-600 px-3 py-1 text-white">
                        Edit
                      </button>

                      <button className="rounded bg-red-600 px-3 py-1 text-white">
                        Delete
                      </button>
                    </td>

                    {/* <td className="border p-3">{student.courses.courseName}</td> */}
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
