"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReelUpload() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });
  const router = useRouter();

  // Handle input changes for all form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission by sending JSON data to the API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.videoUrl) {
      alert("Please enter a video URL.");
      return;
    }

    const res = await fetch("/api/blog/reel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      const result = await res.json();
      alert(`Reel uploaded successfully! Video URL: ${formData.videoUrl}`);
      router.push("/admin");
    } else {
      const error = await res.json();
      alert(`Error: ${error.error}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <header>
        <h2 className="text-3xl font-bold mb-6">Upload Reel</h2>
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
            placeholder="Enter reel title"
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
            placeholder="Enter a description for your reel"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="videoUrl" className="block text-lg font-medium">
            Video URL
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="https://example.com/video.mp4"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          >
            Upload Reel
          </button>
        </div>
      </form>
    </div>
  );
}
