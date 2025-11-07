import React from "react";
import BlogForm from "../components/BlogForm";

const AddBlog = ({ fetchBlogs }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white p-8 md:p-10 shadow-2xl rounded-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          📝 Create a New Blog Post
        </h1>
        <BlogForm fetchBlogs={fetchBlogs} />
      </div>
    </div>
  );
};

export default AddBlog;