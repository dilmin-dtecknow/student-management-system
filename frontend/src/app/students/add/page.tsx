"use client";

import { createStudent, registerStudentUser } from "@/services/studentService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[] | null>(null);
  const [role, setRole] = useState("");
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

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const storeRole = localStorage.getItem("role");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (storeRole) setRole(storeRole);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1 Register User

      // Basic validation
      if (!form.firstName || !form.lastName) {
        setError(["First & Last Name is required!"]);
        setLoading(false);
        return;
      }
      if (!form.email || !form.email.includes("@")) {
        setError(["Valid email is required!"]);
        setLoading(false);
        return;
      }
      if (!form.phoneNumber || form.phoneNumber.length < 10) {
        setError(["Phone Number must be at least 10 characters!"]);
        setLoading(false);
        return;
      }
      if (!/^\d{10}$/.test(form.phoneNumber)) {
        setError(["Phone number must contain exactly 10 digits"]);
        return;
      }

      if (form.password.length <= 4) {
        setError(["Password must be at least 6 characters!"]);
        setLoading(false);
        return;
      }
      if (!form.address) {
        setError(["Address is required!"]);
        setLoading(false);
        return;
      }
      if (!form.gender) {
        setError(["Gender is required!"]);
        setLoading(false);
        return;
      }

      const user = await registerStudentUser(form);

      // 2 Create Student
      //   console.log("User ", user);
      // 2. Build StudentRequest object
      const studentReq: StudentRequest = {
        userId: user.id,
        address: form.address,
        gender: form.gender as "MALE" | "FEMALE" | "OTHER",
        courseIds: form.courseIds,
      };

      //   console.log("Student ", studentReq);
      // 3 create student
      await createStudent(studentReq);

      alert("Student Created Successfully");

      router.push("/students");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        try {
          // Parse back to array
          const messages: string[] = JSON.parse(error.message);
          setError(messages);
        } catch {
          setError([error.message]);
        }
      } else {
        setError(["Unexpected error occurred"]);
      }
      alert("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Add Student</h1>

      <div className="p-4">
        {Array.isArray(error) && error.length > 0 && (
          <ul className="text-red-500 list-disc pl-5">
            {error.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="border p-3 w-full"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="border p-3 w-full"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-3 w-full"
          onChange={handleChange}
          required
        />

        <input
          maxLength={10}
          pattern="\d{10}"
          type="tel"
          name="phoneNumber"
          placeholder="Phone"
          className="border p-3 w-full"
          onChange={handleChange}
          required
        />

        <div>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border p-3 w-full"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="text-sm text-blue-600 absolute px-2 py-4 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address"
          className="border p-3 w-full"
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          className="border p-3 w-full"
          onChange={handleChange}
          required
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <button className="bg-blue-600 text-white px-5 py-3 rounded cursor-pointer hover:bg-blue-900">
          {loading ? "Saving..." : "Save Student"}
        </button>
      </form>
    </div>
  );
}
