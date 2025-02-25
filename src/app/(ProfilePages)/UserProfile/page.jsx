"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./userprofile.module.css"; 
import useAuth from '@/app/hooks/useAuth';
import Navbar from "@/components/UserProfNav";

const Page = () => {
  useAuth();

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfileAndBlogs = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch user profile
        const userResponse = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await userResponse.json();
        setUser(userData);

        // Fetch blogs created by the user
        const blogsResponse = await fetch("http://localhost:5000/api/blogs/getblogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!blogsResponse.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const blogsData = await blogsResponse.json();
        setBlogs(blogsData.filter(blog => blog.userEmail === userData.email));
        setLoading(false);
      } catch (err) {
        setError("Failed to load profile and blogs.");
        setLoading(false);
      }
    };

    fetchUserProfileAndBlogs();
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
    router.push(`/edit-blog?id=${blogId}`); // Pass blogId in query
  };
  

  return (
    <div className={styles.container}>
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
              <p className={styles.blogCount}>Number of Blogs: {blogs.length}</p>
            </div>
          </div>
        ) : (
          <p className={styles.errorText}>User not found.</p>
        )}
      </div>

      <div className={styles.blogsSection}>
        <h2 className={styles.blogsHeader}>Your Blogs</h2>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className={styles.blogCard}>
              <h3 className={styles.blogTitle}>{blog.title}</h3>
              <p className={styles.blogContent}>{blog.content}</p>
              <div className={styles.blogImages}>
                {blog.images.map((image, index) => (
                  <img key={index} src={`http://localhost:5000/${image}`} alt={`Blog Image ${index}`} className={styles.blogImage} />
                ))}
              </div>
              
              {/* Edit & Delete Buttons */}
              <div className={styles.blogActions}>
                <button className={styles.editBtn} onClick={() => handleEdit(blog._id)}>Edit</button>
                <button className={styles.deleteBtn} onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noBlogsText}>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
