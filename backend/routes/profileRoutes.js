const express = require("express");
const { getProfile } = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

//console.log("getProfile:", getProfile);  // ✅ Should log [Function: getProfile]
//console.log("authMiddleware:", authMiddleware);  // ✅ Should log [Function]

const router = express.Router();

// Route to get logged-in user profile
router.get("/profile", authMiddleware, getProfile);

module.exports = router;
