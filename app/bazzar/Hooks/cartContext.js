"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create a Cart Context
const CartContext = createContext();

// Provide Cart State
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Add product to cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item._id === product._id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };
    const decreaseQuantity = (id) => {
        const item = cart.find((product) => product._id === id);
        if (item.quantity > 1) {
            setCart((prevCart) => {
                return prevCart.map((item) =>
                    item._id === id ? { ...item, quantity: item.quantity - 1 } : item
                );
            });
        } else {
            removeFromCart(id);
        }
    };
    // Remove product from cart
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use Cart Context
export const useCart = () => useContext(CartContext);
