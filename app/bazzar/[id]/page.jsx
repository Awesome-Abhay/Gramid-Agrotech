"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../Hooks/cartContext";


const ProductPage = () => {
    const route = useRouter();
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/bazzar/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const onPay = () => {
        route.push(`/bazzar/payment?seller=${product.seller_id}&product=${id}&price=${product.price}&quantity=1`);
    }

    if (loading) return <p className="text-center text-gray-600">Loading product...</p>;
    if (!product) return <p className="text-center text-gray-600">Product not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Product Image */}
            <div className="relative w-full h-80 rounded-lg overflow-hidden">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    fill="true" 
                    className="object-cover"
                />
            </div>

            {/* Product Info */}
            <div className="mt-6">
                <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
                <p className="text-green-600 text-xl font-semibold mt-2">${product.price}</p>
                <p className="text-gray-600 mt-4">{product.description}</p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
                <button 
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition w-full"
                    onClick={() => onPay()}
                >
                    Buy Now
                </button>
                <button 
                    className="border border-green-600 text-green-600 py-2 px-4 rounded-lg hover:bg-green-600 hover:text-white transition w-full"
                    onClick={() => addToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductPage;
