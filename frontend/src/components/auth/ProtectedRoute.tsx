"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children, allowedRoles = ["ADMIN", "STAFF", "STUDENT"] }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

    if (!token) {
      router.replace("/login");
      return;
    }

    if (role && allowedRoles.includes(role)) {
      setAuthorized(true);
    } else {
      router.replace("/dashboard");
      return;
    }

    setReady(true);
  }, [allowedRoles, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-medium text-slate-600">Checking session...</p>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
