import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  // .get(`http://localhost:5000/api/blogs/${id}`)
  useEffect(() => {
    axios
      .get(`https://rwn-interview-task-hxbk.vercel.app/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((error) => {
        console.error("Error fetching blog details:", error);
        setBlog("not_found");
      });
  }, [id]);

  if (!blog)
    return (
      <div className="p-10 text-center text-xl text-gray-600">
        Loading Blog...
      </div>
    );
  if (blog === "not_found")
    return (
      <div className="p-10 text-center text-xl text-red-500">
        Blog not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 shadow-2xl rounded-xl">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition duration-300"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to All Blogs
        </Link>

        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
        />

        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          {blog.category}
        </p>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
          {blog.title}
        </h1>

        <p className="text-md text-gray-500 mb-8 border-b pb-4">
          Published by{" "}
          <span className="font-semibold text-gray-700">
            {blog.blogger_name}
          </span>
        </p>

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          <p className="whitespace-pre-wrap">{blog.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
