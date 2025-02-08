const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const User = require("../models/User");

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("userImage");



// Register User
const registerUser = async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "File upload error" });
      }
  
      
  
      const { name, email, password, confirmPassword } = req.body;
  
      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      try {
         // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
         // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
  
  
         const newUser = new User({
          name,
          email,
          password: hashedPassword,
          userImage: req.file ? req.file.filename : null,
        });
  
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user", error });
      }
    });
  };

  module.exports = { registerUser };