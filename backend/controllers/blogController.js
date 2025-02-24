const Blog = require("../models/Blog");

const multer = require("multer");
const path = require("path");

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

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    // Ensure user ID exists
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User authentication required" });
    }

    const newBlog = new Blog({ 
      title, 
      content, 
      images: imagePaths, 
      userId: req.user.id 
    });

    await newBlog.save();

    // Push new blog ID into user's blogs array
    await User.findByIdAndUpdate(req.user.id, { $push: { blogs: newBlog._id } });

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