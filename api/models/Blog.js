const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    images: [String],
    createdAt: {type: Date, default: Date.now}
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Blog", blogSchema);
