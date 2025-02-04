"use client";
import { useState } from "react";
import Blog from "./Blog";
import Reel from "./Reel";

export default function BloggerComponent() {
  const [uploadType, setUploadType] = useState(null);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold mb-6">Upload Content</h1>
      </header>
      {!uploadType ? (
        <div className="space-y-4">
          <button
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            onClick={() => setUploadType("blog")}
          >
            Upload Blog
          </button>
          <button
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
            onClick={() => setUploadType("reel")}
          >
            Upload Reel
          </button>
        </div>
      ) : uploadType === "blog" ? (
        <Blog setUploadType={setUploadType} />
      ) : (
        <Reel setUploadType={setUploadType} />
      )}
    </main>
  );
}
