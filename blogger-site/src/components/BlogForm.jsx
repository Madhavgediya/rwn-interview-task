import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogForm = ({ fetchBlogs }) => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    blogger_name: "",
    image: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "image" && e.target.value.length > 0) {
      setImageFile(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setFormData({ ...formData, image: "" });
    }
  };

  const validate = () => {
    const temp = {};
    if (!formData.category) temp.category = "Select a category";
    if (formData.title.trim().length < 3)
      temp.title = "Title must be at least 3 characters";
    if (formData.blogger_name.trim().length < 3)
      temp.blogger_name = "Blogger name must be at least 3 characters";

    const hasFile = !!imageFile;
    const hasUrl = formData.image.startsWith("http");
    if (!hasFile && !hasUrl)
      temp.image = "Please upload an image or provide a valid image URL";

    if (formData.description.trim().length < 20)
      temp.description = "Description must be at least 20 characters";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsUploading(true);

      const data = new FormData();
      data.append("category", formData.category);
      data.append("title", formData.title);
      data.append("blogger_name", formData.blogger_name);
      data.append("description", formData.description);

      if (imageFile) {
        data.append("image", imageFile);
      } else {
        data.append("image", formData.image);
      }

      // await axios.post("http://localhost:5000/api/blogs", data, {
      await axios.post("https://rwn-interview-task-hxbk.vercel.app/api/blogs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsUploading(false);

      setFormData({
        category: "",
        title: "",
        blogger_name: "",
        image: "",
        description: "",
      });
      setImageFile(null);
      fetchBlogs();
      navigate("/");
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Error submitting blog");
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-blue-600 text-center">
        ✍️ Publish a New Blog
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Category</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Technology">Technology</option>
          <option value="Sports">Sports</option>
          <option value="Business">Business</option>
          <option value="Health">Health</option>
          <option value="Science">Science</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-xs mt-1">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Blog Title
        </label>
        <input
          name="title"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Blogger Name
        </label>
        <input
          name="blogger_name"
          placeholder="Enter your name"
          value={formData.blogger_name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.blogger_name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.blogger_name && (
          <p className="text-red-500 text-xs mt-1">{errors.blogger_name}</p>
        )}
      </div>

      <div className="border p-4 rounded-lg bg-gray-50 space-y-4">
        <p className="font-semibold text-gray-700">Image Source (Choose One)</p>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Image URL
          </label>
          <input
            name="image"
            placeholder="https://example.com/image.jpg"
            value={formData.image}
            onChange={handleChange}
            disabled={!!imageFile}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.image ? "border-red-500" : "border-gray-300"
            } ${imageFile ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
        </div>

        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Upload Image File
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={formData.image.length > 0}
            className={`w-full px-4 py-2 border rounded-lg ${
              errors.image ? "border-red-500" : "border-gray-300"
            } ${
              formData.image.length > 0 ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
          {imageFile && (
            <p className="text-green-600 text-xs mt-1">
              Selected: {imageFile.name}
            </p>
          )}
        </div>

        {errors.image && (
          <p className="text-red-500 text-xs mt-2">{errors.image}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Blog Description
        </label>
        <textarea
          name="description"
          rows="6"
          placeholder="Write your full blog content here..."
          value={formData.description}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg disabled:bg-gray-400"
      >
        {isUploading ? "Uploading..." : "Publish Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
