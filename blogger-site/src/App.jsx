import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddBlog from "./pages/AddBlog";
import BlogDetails from "./components/BlogDetails";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (error) {
      console.error("Could not fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full">
      <Router>
        <Navbar />
        <div className="pt-0">
          <Routes>
            <Route
              path="/"
              element={<Home blogs={blogs} fetchBlogs={fetchBlogs} />}
            />
            <Route
              path="/add-blog"
              element={<AddBlog fetchBlogs={fetchBlogs} />}
            />
            <Route path="/blog/:id" element={<BlogDetails />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
