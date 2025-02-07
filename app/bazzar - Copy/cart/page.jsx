"use client";

import { useCart } from "@cart/cartContext";

const CartPage = () => {
    const { cart, removeFromCart, clearCart, addToCart, decreaseQuantity } = useCart();

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

            {cart.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item._id} className="flex items-center justify-between border-b py-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    width={80}
                                    height={80}
                                    className="rounded"
                                />
                                <div>
                                    <h2 className="font-semibold">{item.name}</h2>
                                    <p className="text-gray-600">${item.price} x {item.quantity}</p>
                                </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                                    onClick={() => alert("Proceeding to checkout...")}
                                >
                                    Checkout
                                </button>

                                <button
                                    className="text-red-600 hover:underline ml-4"
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Cart Actions */}
                    <div className="mt-6 flex justify-between">
                        <button
                            className="text-red-600 border border-red-600 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
