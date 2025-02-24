"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Viewpage_Navbar() {
  const [userImage, setUserImage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false); // Update state
    router.push("/"); // Redirect to homepage
  };

  useEffect(() => {
    const image = localStorage.getItem("userImage");
    if (image) {
      setUserImage(image);
    }
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo - Clicking redirects to homepage */}
        <img
          src="/images/logo.png"
          alt="Medium Logo"
          className="w-32 h-auto cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* Search Bar - Hidden on Mobile */}
        {/* <div className="relative hidden md:flex">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>
        </div> */}

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Write Button */}
          <a href="/create-story" className="text-gray-600 hover:text-black transition">
            ✍ Write
          </a>

          {/* Notification Icon */}
          {/* <div className="relative">
            <span className="text-gray-600 hover:text-black transition cursor-pointer text-xl">
              🔔
            </span>
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full px-1">
              1
            </span>
          </div> */}

          {/* Profile Dropdown */}
          <div className="relative group">
            {userImage && (
              <img
                src={`http://localhost:5000/uploads/${userImage}`} 
                alt="User"
                className="w-10 h-10 rounded-full"
              />
            )}
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href="/UserProfile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </a>
          
              <a href="#" onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
