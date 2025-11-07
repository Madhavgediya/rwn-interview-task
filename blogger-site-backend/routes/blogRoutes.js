const express = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/Blog");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { category, title, blogger_name, description } = req.body;
    let imagePath = "";

    if (req.file) {
      // imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
      imagePath = `https://rwn-interview-task-hxbk.vercel.app/uploads/${req.file.filename}`;
    } else if (req.body.image && req.body.image.startsWith("http")) {
      imagePath = req.body.image;
    }

    const newBlog = new Blog({
      category,
      title,
      blogger_name,
      description,
      image: imagePath,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ _id: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(404).json({ error: "Blog not found" });
  }
});

module.exports = router;
