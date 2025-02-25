const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { createBlog, getBlogs, deleteBlog } = require("../controllers/blogController"); // ✅ Add deleteBlog
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", upload.array("images", 5), authMiddleware, createBlog);
router.get("/getblogs", authMiddleware, getBlogs);
router.delete("/:id", authMiddleware, deleteBlog); // ✅ Now deleteBlog is recognized


module.exports = router;
