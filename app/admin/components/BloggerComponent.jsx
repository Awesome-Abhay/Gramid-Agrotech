"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BloggerComponent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    author: "",
    image: "",
    content: "",
  });

  const router = useRouter();

  // Update state when form fields change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit the form data to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.status == 200) {
    //   const data = await res.json();
      alert("Blog post created successfully!");
      // Optionally redirect to a different page
      router.push("/admin");
    } else {
      const error = await res.json();
      alert(`Error: ${error.error}`);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      </header>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="Cultural Heritage Around the World"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="A journey through different cultures and traditions."
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-lg font-medium">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="Culture"
            required
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-lg font-medium">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-lg font-medium">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="Admin"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="https://placehold.co/150x150"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-lg font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            rows="6"
            placeholder="An insight into diverse cultural heritages across the globe..."
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
