import React, { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  "All Categories",
  "Entertainment",
  "Technology",
  "Sports",
  "Business",
  "Health",
  "Science",
];

const BlogList = ({ blogs }) => {
  const [filterCategory, setFilterCategory] = useState("");

  const filteredBlogs = filterCategory
    ? blogs.filter((b) => b.category === filterCategory)
    : blogs;

  const handleCategoryChange = (category) => {
    setFilterCategory(category === "All Categories" ? "" : category);
  };

  const activeCategory =
    filterCategory === "" ? "All Categories" : filterCategory;

  return (
    <div>
      <div className="mb-8">
        <div className="block md:hidden">
          <div className="font-bold p-1">Select Category</div>
          <select
            value={activeCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden md:flex flex-wrap justify-center gap-3 mt-3 p-3 bg-white shadow-md rounded-lg border border-gray-100">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition duration-300 ease-in-out ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">
          No blogs found in:{" "}
          <span className="font-semibold">{activeCategory}</span>
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-500 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="w-full h-52 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <p className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
                  {blog.category}
                </p>
                <h3 className="text-xl font-extrabold text-gray-900 mt-1 truncate">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 mb-3">
                  By{" "}
                  <span className="font-medium text-gray-700">
                    {blog.blogger_name}
                  </span>
                </p>
                <p className="text-gray-600 text-base mb-4 line-clamp-1 flex-grow">
                  {blog.description}
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 self-start mt-auto"
                >
                  Read Full Post →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
