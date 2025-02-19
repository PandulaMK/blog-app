"use client";

import Link from "next/link";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
   
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    router.push("/login"); 
  };

  return (
    <nav className="border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Side */}
        <Link href="/">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Medium Logo"
              width={120}
              height={50}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex space-x-8 items-center">
          {/* Notification Icon */}
          <div className="flex items-center space-x-2">
            <Link href="#">
              <FaBell className="text-gray-700 hover:text-black cursor-pointer" />
            </Link>
          </div>

          {/* Avatar & Logout */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <Link href="/profile">
                <div className="relative">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-5.jpg"
                    alt="User Avatar"
                  />
                </div>
              </Link>
              
            
              <button
                onClick={handleLogout}
                className="bg-black text-white px-5 py-2 rounded-full font-medium"
              >
                Log Out
              </button>
            </div>
          ) : (
           
            <Link href="/login" className="text-gray-700 hover:text-black">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
