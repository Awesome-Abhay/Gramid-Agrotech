"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@hook/authContext";

export default function EditProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = user._id;
        const response = await fetch(`/api/products?userId=${userId}`);
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user]);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async (updatedProduct) => {
    try {
      await fetch(`/api/products/${updatedProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const handleDelete = async (product) => {
    try {
      await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
      });
      // Remove the deleted product from the state
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Edit Your Listings</h1>
      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : products.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {products.map((product) => (
            <li
              key={product._id}
              className="p-4 border rounded-lg bg-white shadow flex gap-4"
            >
              {/* Show the product image if available */}
              {product.image ? (
                <img
                  src={`data:image/jpeg;base64,${product.image}`}
                  alt={`${product.productName} image`}
                  className="w-32 h-32 object-cover rounded"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">
                    {product.productName}
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  District: {product.district}
                </p>
                <p className="text-sm text-gray-600">
                  Mandi: {product.mandi}
                </p>
                <p className="text-sm text-gray-600">
                  Price: ${product.price}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {product.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {product.phone}
                </p>
                <p className="text-sm text-gray-600">
                  Negotiable: {product.negotiable}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No products found.</p>
      )}

      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="w-full p-2 border rounded mb-2"
              value={editingProduct.productName}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  productName: e.target.value,
                })
              }
            />

            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700"
            >
              District
            </label>
            <input
              type="text"
              id="district"
              className="w-full p-2 border rounded mb-2"
              value={editingProduct.district}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  district: e.target.value,
                })
              }
            />

            <label
              htmlFor="mandi"
              className="block text-sm font-medium text-gray-700"
            >
              Mandi
            </label>
            <input
              type="text"
              id="mandi"
              className="w-full p-2 border rounded mb-2"
              value={editingProduct.mandi}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  mandi: e.target.value,
                })
              }
            />

            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full p-2 border rounded mb-2"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: e.target.value,
                })
              }
            />

            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="w-full p-2 border rounded mb-2"
              value={editingProduct.quantity}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  quantity: e.target.value,
                })
              }
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleUpdate(editingProduct)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
