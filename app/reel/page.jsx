"use client";

import React, { useState, useEffect } from "react";

// Helper function to extract the YouTube video ID.
// If the provided string is already just an ID, it returns it directly.
// If it’s a URL (for example, a Shorts URL), it extracts the ID from the URL.
function extractYoutubeId(urlOrId) {
  // If the string doesn't contain "youtube.com", assume it's already the ID.
  if (!urlOrId.includes("youtube.com")) {
    return urlOrId;
  }
  // If the URL is a Shorts URL, extract the ID after "/shorts/"
  const parts = urlOrId.split("/");
  const shortsIndex = parts.indexOf("shorts");
  if (shortsIndex !== -1 && parts[shortsIndex + 1]) {
    return parts[shortsIndex + 1].split("?")[0];
  }
  // Fallback: if URL parameters exist (for non-shorts URLs), you may add more parsing here.
  return urlOrId;
}

export default function ReelPage() {
  const [reels, setReels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reels from the API when the component mounts.
  useEffect(() => {
    async function fetchReels() {
      try {
        const res = await fetch("/api/blog/reel");
        if (!res.ok) {
          throw new Error("Failed to fetch reels");
        }
        const data = await res.json();
        console.log(data.reels);
        setReels(data.reels);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReels();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, reels.length - 1));
  };

  if (loading) {
    return (
      <main className="bg-gray-100 p-4 flex items-center justify-center min-h-screen">
        <p>Loading reels...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-100 p-4 flex items-center justify-center min-h-screen">
        <p>Error: {error}</p>
      </main>
    );
  }

  if (reels.length === 0) {
    return (
      <main className="bg-gray-100 p-4 flex items-center justify-center min-h-screen">
        <p>No reels available</p>
      </main>
    );
  }

  // Build the embed URL with autoplay enabled (without mute)
  const videoId = extractYoutubeId(reels[currentIndex].videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1`;

  return (
    <main className="bg-gray-100 p-4 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Reels</h1>
      {/* Reel container */}
      <div className="flex-grow flex items-center justify-center">
        <div className="relative bg-black overflow-hidden rounded-lg shadow-md w-full max-w-md">
          {/* 
            The aspect-w-4 and aspect-h-5 classes (from Tailwind CSS's aspect-ratio plugin) 
            ensure the container maintains the desired aspect ratio.
          */}
          <div className="aspect-w-4 aspect-h-5">
            <iframe
              key={reels[currentIndex].id} // Forces remount on index change.
              src={embedUrl}
              title={reels[currentIndex].title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="p-2 text-center text-white bg-black bg-opacity-50 absolute bottom-0 w-full">
            {reels[currentIndex].title}
          </p>
        </div>
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === reels.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </main>
  );
}
