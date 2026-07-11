"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between text-white border-b bg-blue-950 px-8 py-4 shadow">
      <h1 className="text-2xl font-bold">
        Student Management System
      </h1>

      <button
        onClick={logout}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
}