const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { createBlog, getBlogs, deleteBlog, updateBlog, getBlogById } = require("../controllers/blogController"); // ✅ Add deleteBlog
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", upload.array("images", 5), authMiddleware, createBlog);
router.get("/getblogs", getBlogs);
router.delete("/:id", authMiddleware, deleteBlog); // ✅ Now deleteBlog is recognized
router.put("/:id", upload.array("images", 5), authMiddleware, updateBlog);
router.get("/:id", authMiddleware, getBlogById);

module.exports = router;
