import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BlogDetailsPage() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        const response = await axios.get(`/blogs/${id}`);
        console.log("Blog data:", response.data);
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setLoading(false);
      }
    }

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center mt-10">Blog not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Main Blog Image */}
        {blog.images && blog.images.length > 0 && (
          <div className="mb-6">
            <img
              src={`http://localhost:4000/uploads/${blog.images[0]}`}
              alt={blog.title}
              className="w-full h-96 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Blog Title */}
        <h1 className="text-4xl font-extrabold mb-4 text-gray-800">{blog.title}</h1>

        {/* Blog Author and Date */}
        <div className="flex items-center mb-6 text-gray-600 text-sm">
          <span>
            Posted by <span className="font-semibold">{blog.author.name}</span> on{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Blog Content */}
        <div className="prose lg:prose-xl text-gray-700 mb-8 leading-relaxed">
          {blog.content}
        </div>

        {/* Additional Images Grid */}
        {blog.images && blog.images.length > 1 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blog.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={`http://localhost:4000/uploads/${image}`}
                    alt={`Blog image ${index + 1}`}
                    className="w-full h-40 object-cover hover:scale-105 transform transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
