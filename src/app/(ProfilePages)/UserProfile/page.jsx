"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./userprofile.module.css"; // Import styles
import useAuth from "@/app/hooks/useAuth";
import Navbar from "@/components/UserProfNav"; // Import the Navbar

const Page = () => {
  useAuth(); // Ensure user is authenticated

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]); // State to hold blogs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUser(data);
        setBlogs(data.blogsList); // Store the user's blogs
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the blog.");
      }

      setBlogs(blogs.filter(blog => blog._id !== blogId)); // Remove deleted blog from the list
    } catch (err) {
      setError("Error deleting blog");
    }
  };

  const handleEdit = (blogId) => {
    router.push(`/edit-blog/${blogId}`); // Redirect to edit page
  };

  return (
    <div className={styles.container}>
      {/* Include the Navbar */}
      <Navbar />

      <div className={styles.profileCard}>
        {loading ? (
          <p className={styles.loadingText}>Loading...</p>
        ) : error ? (
          <p className={styles.errorText}>{error}</p>
        ) : user ? (
          <div className={styles.profileBox}>
            <img
              src={`http://localhost:5000/uploads/${user.userImage || "default-profile.png"}`}
              alt="User Avatar"
              className={styles.profileImage}
            />
            <div className={styles.profileDetails}>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userEmail}>{user.email}</p>
              <p className={styles.blogCount}>Number of Blogs: {user.blogs}</p>
            </div>
          </div>
        ) : (
          <p className={styles.errorText}>User not found.</p>
        )}

        {/* List of Blogs */}
        <div className={styles.blogsList}>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className={styles.blogCard}>
                <h3>{blog.title}</h3>
                <p>{blog.content.slice(0, 100)}...</p> {/* Displaying a snippet */}
                <div className={styles.blogActions}>
                  <button onClick={() => handleEdit(blog._id)} className={styles.editBtn}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(blog._id)} className={styles.deleteBtn}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noBlogsText}>You have not written any blogs yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
