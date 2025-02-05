"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState("All");
    const categories = ["All", "Grains", "Dairy", "Fruits", "Oils", "Vegetables"];

    // Fetch
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/bazzar?category=${category}`);
                const data = await response.json();
                if (data) setProducts(data.products);

            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
            setLoading(false);
        };

        fetchProduct();

    }, [category]);

    return (
        <main className="container mx-auto px-4 py-8 ">
            {/* Categories */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 border rounded-lg transition duration-300 ${category === cat
                                ? "bg-blue-500 text-white"
                                : "bg-white border-gray-300 hover:bg-gray-100"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            { loading ? ( <p className="text-center text-gray-600">Loading products...</p>) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products?.length > 0 ? (
                        products.map((product) => (
                            <Link
                                key={product._id}
                                className="bg-white max-w-72 rounded shadow-md hover:shadow-lg transition duration-300 cursor-pointer"
                                href={`/bazzar/${product._id}`}
                                target="_blank"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-44 object-cover mb-4"
                                />
                                <div className="p-4">
                                    <div className="text-sm text-gray-500 mb-2">
                                        {product.category.toUpperCase()} - ₹{product.price}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-600">{product.description}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-600 col-span-4">
                            No products found for "{category}"
                        </p>
                    )}
                </div>
            )}
        </main>
    )
}