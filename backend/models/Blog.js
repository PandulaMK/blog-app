// const mongoose = require("mongoose");

// const BlogSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     images: [{ type: String }], // Array of image file paths
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Blog", BlogSchema);

// Blog model (Blog.js)
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // Reference to the user who wrote the blog
});

module.exports = mongoose.model("Blog", BlogSchema);
