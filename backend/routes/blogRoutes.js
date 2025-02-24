const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { createBlog, getBlogs } = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect blog creation (only logged-in users)
router.post("/", upload.array("images", 5), authMiddleware, createBlog); 

// Make GET blogs **public** (no authMiddleware)
router.get("/getblogs", getBlogs);

module.exports = router;

// In your blogRoutes.js
const deleteBlog = async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.blogId);
  
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog" });
    }
  };
  
  router.delete("/blogs/:blogId", authMiddleware, deleteBlog);