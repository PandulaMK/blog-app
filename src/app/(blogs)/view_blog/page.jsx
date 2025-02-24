"use client";
import Viewpage_Navbar from '@/components/Viewpage_Navbar';
import Card from '../../../components/Card';
import useAuth from "@/app/hooks/useAuth";
import { useEffect, useState } from 'react';

export default function View_Blog() {
    useAuth()

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          // Retrieve the token from localStorage
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No token found. Please log in.");
          }
  
          const response = await fetch("http://localhost:5000/api/blogs/getblogs", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
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
        <Viewpage_Navbar/>
    <div className="flex min-h-screen bg-gray-50">
        

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">For You</h1>
          <div className="flex space-x-4 text-gray-600 text-sm">
            <span className="font-semibold border-b-2 border-black pb-1">For you</span>
            <span className="hover:text-gray-900 cursor-pointer">Following</span>
            <span className="hover:text-gray-900 cursor-pointer">Health</span>
            <span className="hover:text-gray-900 cursor-pointer">Books</span>
            <span className="hover:text-gray-900 cursor-pointer">Education</span>
          </div>
        </div>

        {/* Featured Posts Section */}
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

      {/* Right Sidebar (Staff Picks + Writing Tips) */}
      <aside className="hidden lg:block w-1/4 p-6 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">Staff Picks</h2>
        <div className="space-y-4">
          <Card
            title="The Art of Auditioning For SNL Producers"
            description="The third time is also 'No' – Stacey Smith"
            date="Feb 7"
          />
          <Card
            title="Software Engineering Needs A Hippocratic Oath"
            description="A new ethical standard for developers."
            date="Feb 7"
          />
        </div>

        {/* Writing on Medium Section */}
        <div className="mt-8 p-4 bg-blue-100 rounded-lg">
          <h3 className="font-semibold text-lg">Writing on Medium</h3>
          <ul className="text-sm text-gray-700 space-y-2 mt-2">
            <li>New writer FAQ</li>
            <li>Expert writing advice</li>
            <li>Grow your readership</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-black text-white rounded-full">
            Start Writing
          </button>
        </div>
      </aside>
    </div>
    </div>
  );
}