"use client";
import Navbar from "@/components/layoutlayout/Navbar";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { getCourses } from "@/services/courseService";
import { useEffect, useState } from "react";
import types from "@/types/typs";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError("Faild to load courses!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Courses</h1>

            <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 rounded px-2 py-2 text-white">
              Add Course
            </button>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500 font-bold">{error}</p>}

          {!loading && !error && (
            <table className="w-full border">
              <thead className="bg-blue-950">
                <tr>
                  <th className="border p-3">Course ID</th>
                  <th className="border p-3">Course</th>
                  <th className="border p-3">Description</th>
                  <th className="border p-3">Duration</th>
                  <th className="border p-3">Fee</th>
                  <th className="border p-3">Status</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course: any) => (
                  <tr key={course.id}>
                    <td
                      onClick={() => navigator.clipboard.writeText(course.id)}
                      className="border p-3 cursor-copy"
                      onMouseEnter={(e) =>
                        (e.currentTarget.innerText = course.id)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.innerText =
                          course.id.substring(0, 6) + "...")
                      }
                    >
                      {course.id.substring(0, 6)}.....
                    </td>
                    <td className="border p-3">{course.courseName}</td>
                    <td className="border p-3">{course.description}</td>
                    <td className="border p-3">{course.duration}</td>
                    <td className="border p-3">Rs. {course.fee}</td>
                    <td className="border p-3">{course.status}</td>

                    <td className="border p-3 space-x-2">
                      <button className="rounded bg-green-600 px-3 py-1 text-white cursor-pointer">
                        Edit
                      </button>

                      <button className="cursor-pointer rounded bg-red-600 px-3 py-1 text-white">
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
