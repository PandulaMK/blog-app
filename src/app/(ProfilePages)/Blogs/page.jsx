"use client";
import React, { useEffect, useState } from "react";
import styles from "./blogs.module.css"; // Import styles
import useAuth from "@/app/hooks/useAuth";

const UserContent = () => {
  useAuth();

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        
        setUser(data.user || null);
        setBlogs(data.blogs || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </header>

      {/* User Profile Section */}
      <div className={styles.profileCard}>
        {loading ? (
          <p className={styles.loadingText}>Loading...</p>
        ) : error ? (
          <p className={styles.errorText}>{error}</p>
        ) : user ? (
          <>
            <img
              src={user.avatar || "https://via.placeholder.com/150"}
              alt={user.name ? `${user.name}'s Avatar` : "Default Avatar"}
              className={styles.avatar}
            />
            <div>
              <h2 className={styles.userName}>{user?.name || "Unknown User"}</h2>
              <p className={styles.userEmail}>{user?.email || "No email provided"}</p>
              <p className={styles.blogCount}>Number of Blogs: {blogs.length}</p>
            </div>
          </>
        ) : (
          <p className={styles.errorText}>User not found.</p>
        )}
      </div>

      {/* Library Section */}
      <div className={styles.librarySection}>
        <h2 className={styles.libraryTitle}>Library - Author Content</h2>
        {loading ? (
          <p className={styles.loadingText}>Loading blogs...</p>
        ) : error ? (
          <p className={styles.errorText}>Error fetching blogs.</p>
        ) : blogs.length === 0 ? (
          <p className={styles.errorText}>No blogs found.</p>
        ) : (
          <ul className={styles.blogList}>
            {blogs.map((blog) => (
              <li key={blog._id} className={styles.blogItem}>
                <div>
                  <h3 className={styles.blogTitle}>{blog.title}</h3>
                  <p className={styles.blogDate}>
                    {new Date(blog.date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`${styles.blogStatus} ${
                    blog.status === "Published" ? styles.published : styles.pending
                  }`}
                >
                  {blog.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserContent;