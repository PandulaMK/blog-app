// Blog model (Blog.js)
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Reference to the user who wrote the blog
});

module.exports = mongoose.model("Blog", BlogSchema);
