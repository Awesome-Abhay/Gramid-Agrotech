"use client";

import React, { useState } from "react";

// Dummy data: replace these with actual YouTube Shorts IDs or full URLs
const reels = [
    { id: 1, title: "Awesome Reel 1", youtubeId: "5JyKIi7K55w" },
    { id: 2, title: "Awesome Reel 2", youtubeId: "https://www.youtube.com/shorts/5JyKIi7K55w?feature=share" },
    { id: 3, title: "Awesome Reel 3", youtubeId: "https://www.youtube.com/shorts/5JyKIi7o55w?feature=share" },
    { id: 4, title: "Awesome Reel 4", youtubeId: "https://www.youtube.com/shorts/5JyKIi7p55w?feature=share" },
];

/**
 * Helper function to extract the YouTube video ID.
 * If the provided string is already just an ID, it returns it directly.
 * If it’s a URL (for example, a Shorts URL), it extracts the ID from the URL.
 */
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
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, reels.length - 1));
    };

    // Build the embed URL with autoplay enabled (without mute)
    const videoId = extractYoutubeId(reels[currentIndex].youtubeId);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=0&autoplay=1`;

    return (
        <main className=" bg-gray-100 p-4 flex flex-col">
            <h1 className="text-3xl font-bold text-center mb-8">Reels</h1>
            {/* Reel container */}
            <div className="flex-grow flex items-center justify-center">
                <div className="relative bg-black overflow-hidden rounded-lg shadow-md w-full max-w-md">
                    {/* 
            The aspect-w-9 and aspect-h-16 classes (from Tailwind CSS's aspect-ratio plugin) 
            ensure the container maintains a 9:16 ratio for vertical video content.
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
