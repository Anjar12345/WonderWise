import { useContext, useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BlogsPage() {
  const { user } = useContext(UserContext);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", images: [] });
  const [previewImages, setPreviewImages] = useState([]);
  const [imageLink, setImageLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all blogs from the server
  async function fetchBlogs() {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/blogs", {
        headers: user ? { Authorization: `Bearer ${user.token}` } : {}
      });
      setBlogs(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [user]);

  // Handle delete request
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (response.status === 200) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        alert('Blog deleted successfully!');
      } else {
        alert('Failed to delete the blog.');
      }
    } catch (error) {
      console.error('Error deleting the blog:', error);
      alert('An error occurred while deleting the blog.');
    }
  };

  // Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewBlog({ ...newBlog, images: [...newBlog.images, ...files] });

    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePreviews).then((images) =>
      setPreviewImages((prev) => [...prev, ...images])
    );
  };

  // Handle image link submission
  const handleAddImageLink = async () => {
    try {
      const { data: filename } = await axios.post("http://localhost:4000/upload-by-link", { link: imageLink });
      setNewBlog({ ...newBlog, images: [...newBlog.images, filename] });
      setPreviewImages((prev) => [...prev, `http://localhost:4000/uploads/${filename}`]);
      setImageLink("");
    } catch (error) {
      console.error("Error uploading image by link:", error);
    }
  };

  // Handle form submission for blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);

    // Handle both file uploads and image links
    newBlog.images.forEach((image) => {
      if (image instanceof File) {
        formData.append("photos", image);
      } else {
        formData.append("imagesFromLink", image);
      }
    });

    try {
      const response = await axios.post("http://localhost:4000/blogs", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${user.token}`
        },
      });

      const createdBlog = response.data;
      // Add the new blog at the top of the blogs list
      setBlogs((prevBlogs) => [createdBlog, ...prevBlogs]);

      // Reset form
      setNewBlog({ title: "", content: "", images: [] });
      setPreviewImages([]);
    } catch (error) {
      console.error("Error submitting blog:", error.response?.data || error.message);
      if (error.response) {
        alert(`Blog submission failed: ${error.response.data.error}`);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Blogs</h1>

      <div className="mb-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <p className="text-center col-span-full">Loading blogs...</p>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog._id} className="border rounded-lg shadow-md overflow-hidden">
              {/* Blog Image */}
              {blog.images && blog.images.length > 0 && (
                <Link to={`/blogs/${blog._id}`}>
                  <img
                    src={`http://localhost:4000/uploads/${blog.images[0]}`}
                    alt="Blog"
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </Link>
              )}

              {/* Blog Content */}
              <div className="p-4">
                <Link to={`/blogs/${blog._id}`} className="hover:underline">
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                </Link>
                <p className="text-gray-700 mb-2">
                  {blog.content.length > 100
                    ? blog.content.substring(0, 100) + '...'
                    : blog.content
                  }
                </p>
                {blog.author && (
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {blog.author.name}</span>
                    <Link 
                      to={`/blogs/${blog._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Read more
                    </Link>
                  </div>
                )}

                {/* Delete Button */}
                {user && blog.author && user._id === blog.author._id && (
                  <button
                    className="mt-2 bg-primary text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No blogs found.</p>
        )}
      </div>

      {/* Blog Submission Form */}
      {user ? (
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-center text-red-600 mb-4 tracking-wide">
            Share Your Thoughts With The World!
          </h2>
          <p className="text-lg text-gray-600 text-center mb-6">
            Let your ideas inspire others. Start your blogging journey today!
          </p>
        
          <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block mb-2 font-bold text-lg">Title</label>
              <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold text-lg">Content</label>
              <textarea
                name="content"
                value={newBlog.content}
                onChange={handleInputChange}
                placeholder="Write your blog content"
                className="w-full p-2 border rounded"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold text-lg">Upload Images</label>
              <input
                type="file"
                onChange={handleImageUpload}
                multiple
                className="w-full p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-bold text-lg">Add Image by Link</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  placeholder="Enter image URL"
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={handleAddImageLink}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </div>
            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {previewImages.map((src, idx) => (
                  <img key={idx} src={src} alt={`Preview ${idx}`} className="max-h-64" />
                ))}
              </div>
            )}
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">Please log in to submit a blog.</p>
      )}
    </div>
  );
}