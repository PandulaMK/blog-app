const Blog = require("../models/Blog");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    const newBlog = new Blog({ title, content, images: imagePaths });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully!", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog", error });
  }
};

