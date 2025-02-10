"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./userprofile.module.css"; // Import styles

const Page = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login"); // Redirect if not logged in
          return;
        }

        const response = await fetch("http://localhost:3001/api/profile", {
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
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </header>

      <div className={styles.profileCard}>
        {loading ? (
          <p className={styles.loadingText}>Loading...</p>
        ) : error ? (
          <p className={styles.errorText}>{error}</p>
        ) : user ? (
          <>
            <img
              src={user.userImage ? `http://localhost:3001/uploads/${user.userImage}` : "https://via.placeholder.com/150"}
              alt="User Avatar"
              className={styles.avatar}
            />
            <div>
              <h2 className={styles.userName}>{user.name}</h2>
              <p className={styles.userEmail}>{user.email}</p>
              <p className={styles.blogCount}>Number of Blogs: {user.blogs || 0}</p>
            </div>
          </>
        ) : (
          <p className={styles.errorText}>User not found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
