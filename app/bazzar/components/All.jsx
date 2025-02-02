"use client";

import Link from "next/link";
import { useCart } from "@cart/cartContext";


export function Header() {
    const { cart } = useCart();
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Count total items

    return (
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center relative">
                    <h1 className="text-2xl font-bold text-white">Bazzar</h1>
                    <nav className="text-sm text-gray-200 flex items-center gap-4">
                        <Link href="/bazzar" className="hover:text-white transition duration-300">HOME</Link>
                        <Link href="/bazzar/profile" className="hover:text-white transition duration-300">PROFILE</Link>
                        
                        {/* Cart Link with Badge */}
                        <div className="relative">
                            <Link href="/bazzar/cart" className="hover:text-white transition duration-300">
                                CART
                            </Link>
                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
