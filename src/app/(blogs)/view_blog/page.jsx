"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Guest_Navbar from "@/components/Guest_Navbar";
import Viewpage_Navbar from "@/components/Viewpage_Navbar";
import Card from "../../../components/Card";

export default function View_Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Store user login status

  const router = useRouter();

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token"); // Adjust this based on your auth system
    setUser(token ? true : false);

    // Fetch blogs
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs/getblogs", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* Show Guest Navbar if not logged in, else show Viewpage Navbar */}
      {user ? <Viewpage_Navbar /> : <Guest_Navbar />}

      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">For You</h1>
          <div className="flex space-x-4 text-gray-600 text-sm">
            <span className="font-semibold border-b-2 border-black pb-1">For you</span>
            <span className="hover:text-gray-900 cursor-pointer">Following</span>
            <span className="hover:text-gray-900 cursor-pointer">Health</span>
            <span className="hover:text-gray-900 cursor-pointer">Books</span>
            <span className="hover:text-gray-900 cursor-pointer">Education</span>
          </div>

          <div className="space-y-8">
            {blogs.map((blog) => (
              <Card
                key={blog._id}
                title={blog.title}
                description={blog.content}
                date={new Date(blog.createdAt).toLocaleDateString()}
                stats={{ views: blog.views || 0, comments: blog.comments || 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
