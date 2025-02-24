"use client";
import Viewpage_Navbar from "@/components/Viewpage_Navbar";
import Guest_Navbar from "@/components/Guest_Navbar"; // New Guest Navbar
import Card from "../../../components/Card";
import { useEffect, useState } from "react";

export default function View_Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };

        // Include token only if the user is authenticated
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const response = await fetch("http://localhost:5000/api/blogs/getblogs", {
          method: "GET",
          headers,
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {/* Show the correct navbar based on authentication status */}
      {isAuthenticated ? <Viewpage_Navbar /> : <Guest_Navbar />}

      <div className="flex min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">For You</h1>
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
