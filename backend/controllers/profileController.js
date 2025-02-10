const User = require("../models/User"); // Import User model

// Fetch logged-in user details
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user); // Send user data
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile };
