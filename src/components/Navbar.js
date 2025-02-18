"use client";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="Medium Logo"
          className="w-32 h-auto" // Adjust the size as needed
        />

        {/* Search Bar - Hidden on Mobile */}
        <div className="relative hidden md:flex">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Write Button */}
          <a href="#" className="text-gray-600 hover:text-black transition">
            ✍ Write
          </a>

          {/* Notification Icon */}
          <div className="relative">
            <span className="text-gray-600 hover:text-black transition cursor-pointer text-xl">
              🔔
            </span>
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full px-1">
              1
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative group">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Settings
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
