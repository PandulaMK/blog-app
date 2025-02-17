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
    
        console.log("Token before request:", token); // Debugging
    
        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,


          },
        });
    
        console.log("Response status:", response.status); // Check response code
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Server Error:", errorData);
          throw new Error("Failed to fetch user profile");
        }
    
        const data = await response.json();
        console.log("Fetched User Data:", data); // Check user data
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
          // <>
          //   <img 
          //     src={`http://localhost:5000/uploads/${user.userImage}`} 
          //     alt="User Avatar" 
          //     className={styles.profileImage} 
          //   />

          //   <div>
          //     <h2 className={styles.userName}>{user.name}</h2>
          //     <p className={styles.userEmail}>{user.email}</p>
          //     <p className={styles.blogCount}>Number of Blogs: {user.blogs || 0}</p>
          //   </div>
          // </>
          <div className={styles.profileBox}>
  <img 
    src={`http://localhost:5000/uploads/${user.userImage || "default-profile.png"}`} 
    alt="User Avatar" 
    className={styles.profileImage} 
  />
  <div className={styles.profileDetails}>
    <h2 className={styles.userName}>{user.name}</h2>
    <p className={styles.userEmail}>{user.email}</p>
    <p className={styles.blogCount}>Number of Blogs: {user.blogs || 0}</p>
  </div>
</div>

        ) : (
          <p className={styles.errorText}>User not found.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
