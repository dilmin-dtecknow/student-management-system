"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCourse } from "@/services/courseService";

export default function AddCoursePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const [form, setForm] = useState({
    courseName: "",
    description: "",
    duration: "",
    fee: "",
    status: "ACTIVE",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!form.courseName || !form.duration || !form.fee) {
        setError(["Course name, duration, and fee are required"]);
        return;
      }

      await createCourse({
        courseName: form.courseName,
        description: form.description,
        duration: form.duration,
        fee: Number(form.fee),
        status: form.status as "ACTIVE" | "INACTIVE",
      });

      router.push("/courses");
    } catch (err) {
      if (err instanceof Error) {
        try {
          const messages = JSON.parse(err.message) as string[];
          setError(messages);
        } catch {
          setError([err.message]);
        }
      } else {
        setError(["Unable to create course"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Course</p>
            <h1 className="text-3xl font-bold text-slate-900">Add New Course</h1>
          </div>
          <Link href="/courses" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Back to list
          </Link>
        </div>

        {error && (
          <ul className="mb-4 list-disc space-y-1 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Course Name</label>
            <input name="courseName" value={form.courseName} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3" required />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="min-h-24 w-full rounded-lg border border-slate-300 p-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Duration</label>
              <input name="duration" value={form.duration} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Fee</label>
              <input type="number" name="fee" value={form.fee} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3" required />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3">
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? "Saving..." : "Save Course"}
          </button>
        </form>
      </div>
    </div>
    </ProtectedRoute>
  );
}
