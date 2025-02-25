"use client";
import useAuth from '@/app/hooks/useAuth';
import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function BlogContent() {
  useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [blogId, setBlogId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    console.log(id);
    
    if (id) {
      setIsEditing(true);
      setBlogId(id);
      fetchBlogData(id);
    }
  }, []);

  const fetchBlogData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch blog data");
      }

      const blogData = await response.json();
      setTitle(blogData.title);
      setContent(blogData.content);
      setImages(blogData.images);
    } catch (err) {
      alert("Failed to load blog data.");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...fileUrls]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((image) => formData.append("images", image));

    const url = isEditing ? `http://localhost:5000/api/blogs/${blogId}` : "http://localhost:5000/api/blogs";
    const method = isEditing ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert(isEditing ? "Blog updated successfully!" : "Blog created successfully!");
      router.push("/UserProfile");
    } else {
      alert(isEditing ? "Failed to update blog." : "Failed to create blog.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{isEditing ? "Edit Blog" : "Create a New Blog"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <textarea
          placeholder="Write your blog here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-black"
          rows={10}
          required
        />

        <div className="flex items-center mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <FaPlus className="text-gray-600" />
            <span className="text-gray-600">Add Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex space-x-4 mb-6">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Uploaded ${index}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800"
        >
          {isEditing ? "Update Blog" : "Publish"}
        </button>
      </form>
    </div>
  );
}