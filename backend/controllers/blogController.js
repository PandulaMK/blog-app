const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const User = require("../models/User")

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename files 
  },
});

const upload = multer({ storage });

// Create a new blog with file uploads
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    // Extract user email from the token
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newBlog = new Blog({ 
      title, 
      content, 
      images: imagePaths,
      userEmail : user.email 
    });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully!", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog", error });
  }
};


// Fetch all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); 
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if blog exists
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the blog
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog", error });
  }
};


