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

      

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Write Button */}
          <a href="/create-story" className="text-gray-600 hover:text-black transition">
            ✍ Write
          </a>

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