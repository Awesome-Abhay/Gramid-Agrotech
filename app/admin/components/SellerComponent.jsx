"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProduct({ id }) {
  // In a real-world scenario, you'd get the seller's user ID from your authentication context.
  const currentUserId = id; // Replace with actual logged-in user id

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    rating: "",
    reviews: "",
    createdAt: "",
    seller_id: currentUserId,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert fields to appropriate types if necessary.
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews, 10),
      createdAt: new Date(formData.createdAt),
    };

    const res = await fetch("/api/bazzar/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status == 200) {
      alert("Product published successfully!");
      router.push("/client");
    } else {
      const error = await res.json();
      alert(`Error: ${error.error}`);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <header>
        <h1 className="text-3xl font-bold mb-6">Publish New Product</h1>
      </header>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-lg font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="Organic Almond Butter"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-lg font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="Vehicles">Vehicle</option>
            <option value="Instruments">Instrument</option>
            <option value="Seeds">Seed</option>
            <option value="Fertilizers">Fertilizers</option>
            {/* <option value="Oils">Fertilizer</option> */}
            <option value="Cattle Food">Food</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-medium">
            Price (₹)
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="8.49"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="Smooth and creamy almond butter made from organic almonds."
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="https://placehold.co/150x150"
            required
          />
        </div>
        <div>
          {/* <label htmlFor="stock" className="block text-lg font-medium">
            Stock (kg in weight or number of products)
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            placeholder="30"
            required
          /> */}
        </div>
        <div>
          {/* <label htmlFor="createdAt" className="block text-lg font-medium">
            Created At
          </label>
          <input
            type="datetime-local"
            id="createdAt"
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 p-2 rounded"
            required
          /> */}
        </div>
        {/* Hidden input for seller_id */}
        <input type="hidden" name="seller_id" value={formData.seller_id} />
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          >
            Publish Product
          </button>
        </div>
      </form>
    </main>
  );
}
