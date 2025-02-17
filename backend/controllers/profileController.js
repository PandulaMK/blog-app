const User = require("../models/User"); // ✅ Make sure User is imported

const getProfile = async (req, res) => {
  try {
    console.log("Decoded user ID:", req.user.id); // Debugging log

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "Invalid user ID in token" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found in DB" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile };
