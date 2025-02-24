const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String }, // Optional, for user profile image
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }] // Reference to Blog model
});

module.exports = mongoose.model("User", UserSchema);
