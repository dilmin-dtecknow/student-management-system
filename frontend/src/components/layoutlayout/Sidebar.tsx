"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role") || "");
  }, []);

  const menus = [
    { name: "Dashboard", href: "/dashboard", roles: ["ADMIN", "STAFF", "STUDENT"] },
    { name: "Students", href: "/students", roles: ["ADMIN", "STAFF"] },
    { name: "Courses", href: "/courses", roles: ["ADMIN", "STAFF", "STUDENT"] },
    { name: "Users", href: "/users", roles: ["ADMIN"] },
  ];

  const visibleMenus = menus.filter((menu) => menu.roles.includes(role));

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6 text-2xl font-bold">
        Student Management System
      </div>

      <nav className="space-y-2 p-4">
        {visibleMenus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={`block rounded-lg px-4 py-3 ${
              pathname === menu.href ? "bg-blue-600" : "hover:bg-blue-700"
            }`}
          >
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
