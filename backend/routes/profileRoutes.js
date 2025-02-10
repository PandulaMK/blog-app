const express = require("express");
const { getProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware"); // Ensure user is authenticated

const router = express.Router();

// Route to get logged-in user profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
