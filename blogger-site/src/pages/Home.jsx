import React from "react";
import BlogList from "../components/BlogList";

const Home = ({ blogs, fetchBlogs }) => {
  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 w-full ">
      <div className="mx-auto">
        <BlogList blogs={blogs} fetchBlogs={fetchBlogs} />
      </div>
    </div>
  );
};

export default Home;
