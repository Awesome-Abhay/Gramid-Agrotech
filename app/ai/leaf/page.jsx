"use client";

import React, { useState } from "react";

const Leaf = () => {
  const [image, setImage] = useState(null);
  const [predictedClass, setPredictedClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setPredictedClass("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setError("");
      const response = await fetch("http://127.0.0.1:5000/classify",{
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",  
        },
        body: formData,
      });

      if (response.data && response.data.class) {
        setPredictedClass(response.data.class);
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      setError("Error while sending the image to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col justify-center items-center p-6 ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fight back with AI</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-purple-300 p-3 border border-purple-600 rounded w-full max-w-xs text-gray-700"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Classifying..." : "Submit Image"}
          </button>
        </form>
        <div className="mt-4 text-center w-full">
          {predictedClass && (
            <div className="text-green-600 text-lg font-semibold">Predicted Class: {predictedClass}</div>
          )}
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Leaf;
