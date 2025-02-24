"use client";

import Link from "next/link";
import Image from "next/image";
import { FaBell, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [userImage, setUserImage] = useState("");
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

  useEffect(() => {
    const image = localStorage.getItem("userImage");
    if (image) {
      setUserImage(image);
    }
  }, []);

  return (
    <nav className="border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="text-gray-700 hover:text-black px-4 py-2 border rounded-full"
          >
            <FaArrowLeft className="mr-2" />
          </button>

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
        </div>

        {/* Right Side */}
        <div className="flex space-x-8 items-center">
          {/* Notification Icon */}
          {/* <div className="flex items-center space-x-2">
            <Link href="#">
              <FaBell className="text-gray-700 hover:text-black cursor-pointer" />
            </Link>
          </div> */}

          {/* Avatar & Logout */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <Link href="/UserProfile">
                <div className="relative">
                  {userImage && (
                    <img
                      src={`http://localhost:5000/uploads/${userImage}`}
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
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
