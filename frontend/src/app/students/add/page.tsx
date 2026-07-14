"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { createStudent, registerStudentUser } from "@/services/studentService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    address: "",
    gender: "MALE",
    courseIds: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!form.firstName || !form.lastName) {
        setError(["First & last name is required"]);
        return;
      }
      if (!form.email || !form.email.includes("@")) {
        setError(["Valid email is required"]);
        return;
      }
      if (!/^\d{10}$/.test(form.phoneNumber)) {
        setError(["Phone number must contain exactly 10 digits"]);
        return;
      }
      if (form.password.length < 6) {
        setError(["Password must be at least 6 characters"]);
        return;
      }
      if (!form.address) {
        setError(["Address is required"]);
        return;
      }

      const user = await registerStudentUser(form);

      const studentReq = {
        userId: user.id,
        address: form.address,
        gender: form.gender as "MALE" | "FEMALE" | "OTHER",
        courseIds: form.courseIds,
      };

      await createStudent(studentReq);
      router.push("/students");
    } catch (error) {
      if (error instanceof Error) {
        setError([error.message]);
      } else {
        setError(["Unexpected error occurred"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Student
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Add New Student
            </h1>
          </div>

          {error && (
            <ul className="mb-4 list-disc space-y-1 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full rounded-lg border border-slate-300 p-3"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full rounded-lg border border-slate-300 p-3"
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full rounded-lg border border-slate-300 p-3"
                onChange={handleChange}
                required
              />
              <input
                maxLength={10}
                pattern="\d{10}"
                type="tel"
                name="phoneNumber"
                placeholder="Phone"
                className="w-full rounded-lg border border-slate-300 p-3"
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-lg border border-slate-300 p-3"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-sm font-semibold text-blue-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full rounded-lg border border-slate-300 p-3"
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              className="w-full rounded-lg border border-slate-300 p-3"
              onChange={handleChange}
              required
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>

            <button
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Student"}
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
