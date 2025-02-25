"use client";

import { useRouter } from "next/navigation";

export default function Guest_Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <img src="/images/logo.png" alt="Logo" className="w-32 h-auto" onClick={() => router.push("/")} />

        {/* Right Side (Login Button) */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 bg-black text-white rounded-full"
          >
            Sign in/Log in
          </button>
        </div>
      </div>
    </nav>
  );
}
