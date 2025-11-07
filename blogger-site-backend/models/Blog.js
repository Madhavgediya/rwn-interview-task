const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  blogger_name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Blog", blogSchema);
