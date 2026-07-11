"use client";

import Navbar from "@/components/layoutlayout/Navbar";
import Sidebar from "@/components/layoutlayout/Sidebar";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  // const firstName = localStorage.getItem("firstName");
  // const lastName = localStorage.getItem("lastName");
  // const role = localStorage.getItem("role");

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });

  useEffect(() => {
    setUser({
      firstName: localStorage.getItem("firstName") || "",
      lastName: localStorage.getItem("lastName") || "",
      role: localStorage.getItem("role") || "",
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-8">
          <h1 className="text-3xl font-bold">
            Welcome {user.firstName} {user.lastName}
          </h1>

          <p className="mt-2 text-gray-500">Role: {user.role}</p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-blue-500 p-6 text-white shadow">
              <h3 className="text-lg">Students</h3>
              <p className="mt-2 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-green-500 p-6 text-white shadow">
              <h3 className="text-lg">Courses</h3>
              <p className="mt-2 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-yellow-500 p-6 text-white shadow">
              <h3 className="text-lg">Users</h3>
              <p className="mt-2 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-purple-500 p-6 text-white shadow">
              <h3 className="text-lg">Active Courses</h3>
              <p className="mt-2 text-3xl font-bold">0</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
