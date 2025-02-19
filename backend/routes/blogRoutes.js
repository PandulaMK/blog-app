const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { createBlog } = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", upload.array("images", 5),authMiddleware, createBlog); // Accept multiple images


module.exports = router;
