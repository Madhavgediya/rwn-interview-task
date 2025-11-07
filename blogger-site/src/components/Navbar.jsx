import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="w-full sticky top-0 z-10 bg-white shadow-lg py-4 px-6 md:px-12 flex justify-between items-center border-b border-gray-200">
      <Link
        to="/"
        className="text-xl sm:text-3xl font-extrabold text-blue-600 tracking-tight"
      >
        BloggerSite ✍️
      </Link>

      <div className="flex gap-8">
        <Link
          to="/add-blog"
          className={`text-md sm:text-lg font-semibold transition duration-200 ${
            location.pathname === "/add-blog"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-blue-500"
          } py-1`}
        >
          + Add Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
