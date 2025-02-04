"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [blogs, setBlogs] = useState([]); // Store blogs
    const [category, setCategory] = useState("All"); // Store selected category
    const [loading, setLoading] = useState(false); // Handle loading state

    // Function to open dialog
    const openDialog = (blog) => {
        setSelectedBlog(blog);
    };

    // Function to close dialog
    const closeDialog = () => {
        setSelectedBlog(null);
    };

    // Fetch blogs based on selected category
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/gov?category=${category}`);
                const data = await response.json();
                if(data) setBlogs(data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
            setLoading(false);
        };

        fetchBlogs();
    }, [category]);

    // Categories
    const categories = ["All", "Agriculture", "Transport", "Employment", "Healthcare", "Education", "Energy"];

    return (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 font-sans">
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">Blog</h1>
                        <nav className="text-sm text-gray-200">
                            <Link href="/client" className="mx-2 hover:text-white transition duration-300">HOME</Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    />
                </div>

                {/* Categories */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-2 border rounded-lg transition duration-300 ${
                                    category === cat
                                        ? "bg-blue-500 text-white"
                                        : "bg-white border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blogs Section */}
                {loading ? 
                (<p className="text-center text-gray-600">Loading blogs...</p>) 
                : 
                (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {
                        blogs?.length > 0 ? (
                            blogs.map((blog) => (
                                <div key={blog._id} className="bg-white max-w-72  rounded shadow-md hover:shadow-lg transition duration-300 cursor-pointer" onClick={() => openDialog(blog)}>
                                    <img src="https://placehold.co/150x150" alt="Food Blog" className="w-full h-44 object-cover  mb-4"></img>
                                    <div className="p-4">
                                    <div className="text-sm text-gray-500 mb-2">{blog.category.toUpperCase()} - {new Date(blog.date).toDateString()}</div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{blog.title}</h3>
                                    <p className="text-gray-600">{blog.description}</p>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600 col-span-4">No blogs found for "{category}"</p>
                        )
                        }
                    </div>
                )
                }
            </main>

            {/* Dialog Box */}
            {selectedBlog && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm" onClick={closeDialog}>
                    <div className="absolute bg-white  md:w-2/3 lg:w-3/4 h-4/5 flex flex-col md:flex-row rounded shadow-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="absolute top-2 right-2 bg-red-500 text-white px-2 rounded hover:bg-red-600"
                            onClick={closeDialog}
                        >
                            &times;
                        </button>

                        {/* Blog Image */}
                        <div className="w-full md:w-1/2 h-40 md:h-full">
                            <img src={selectedBlog.image} alt="blog" className="w-full h-full object-cover"/>
                        </div>

                        {/* Blog Content */}
                        <div className="flex-1 p-6 flex flex-col justify-center overflow-auto">
                            <h2 className="text-2xl font-bold text-gray-800">{selectedBlog.title}</h2>
                            <h4 className="text-sm text-gray-600 mt-2">
                                Posted <span className="font-semibold">by</span> <a href="#" className="text-blue-600 hover:underline">{selectedBlog.author}</a> on {selectedBlog.date}
                            </h4>
                            <p className="text-gray-700 mt-4">{selectedBlog.content}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
