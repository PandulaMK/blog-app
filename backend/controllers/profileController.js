const User = require("../models/User");
const Blog = require("../models/Blog");

const getProfile = async (req, res) => {
  try {
    console.log("Decoded user ID:", req.user.id);

    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "Invalid user ID in token" });
    }

    // Fetch user data and populate blogs
    const user = await User.findById(req.user.id)
      .select("-password") // Exclude password
      .populate("blogs"); // Populate blogs array with actual blog data

    if (!user) {
      return res.status(404).json({ message: "User not found in DB" });
    }

    // If user found, send user data along with blogs
    res.json({
      name: user.name,
      email: user.email,
      userImage: user.image, // If you store user images
      blogs: user.blogs.length, // Count of blogs
      blogsList: user.blogs, // Send the list of blogs
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile };
