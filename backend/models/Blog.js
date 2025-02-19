const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }], // Array of image file paths
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
