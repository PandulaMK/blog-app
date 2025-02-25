"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in (by checking token in localStorage)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false); // Update state
    router.push("/"); // Redirect to guest homepage
  };

  return (
    <nav className="bg-[#fdfaf4] border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Side - Logo */}
        <Link href="/">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Medium Logo"
              width={120}
              height={50}
              className="object-contain cursor-pointer"
            />
          </div>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="#our-story" className="text-gray-700 hover:text-black">
            Our story
          </Link>
          <Link href="#Membership" className="text-gray-700 hover:text-black">
            Membership
          </Link>
          <Link href="/create-story" className="text-gray-700 hover:text-black">
            Write
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex space-x-4 items-center">
          {isAuthenticated ? (
            // If user is logged in, show "Sign out"
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-black"
            >
              Sign out
            </button>
          ) : (
            // If not logged in, show "Sign in"
            <Link href="/login" className="text-gray-700 hover:text-black">
              Sign in/Log in
            </Link>
          )}

          {/* Get Started button remains the same */}
          <Link
            href="/register"
            className="bg-black text-white px-5 py-2 rounded-full font-medium"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}