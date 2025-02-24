"use client"
import useAuth from '@/app/hooks/useAuth';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

export default function BlogContent() {
    useAuth()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file)); // Create URLs 
    setImages([...images, ...fileUrls]); // Store URLs 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
    const token = localStorage.getItem("token"); 
    const email = localStorage.getItem("email"); 
  
    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("email", email);
    images.forEach((image) => formData.append("images", image));
  
    const response = await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  
    if (response.ok) {
      alert("Blog created successfully!");
      setTitle(""); 
      setContent(""); 
      setImages([]); 
    } else {
      alert("Failed to create blog.");
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        {/* Content Field */}
        <textarea
          placeholder="Write your blog here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-black"
          rows={10}
          required
        />

        {/* Image Upload Button */}
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

        {/* Display Uploaded Images */}
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
          Publish
        </button>
      </form>
    </div>
  );
}