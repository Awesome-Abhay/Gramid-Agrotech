"use client";
import { useState } from "react";
import { useAuth } from "@hook/authContext";

export default function ProductFormPage() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    district: "",
    mandi: "",
    productName: "",
    price: "",
    quantity: "",
    negotiable: "No",
  });
  const [productImage, setProductImage] = useState(null);

  // Update text-based fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change separately
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Append user data to formData
    const dataToSend = new FormData();
    dataToSend.append("district", formData.district);
    dataToSend.append("mandi", formData.mandi);
    dataToSend.append("productName", formData.productName);
    dataToSend.append("price", formData.price);
    dataToSend.append("quantity", formData.quantity);
    dataToSend.append("negotiable", formData.negotiable);
    dataToSend.append("phone", user.phone);
    dataToSend.append("name", user.name);
    dataToSend.append("arthi_id", user._id);

    if (productImage) {
      dataToSend.append("image", productImage);
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        // Do not set Content-Type header; the browser will set it automatically
        body: dataToSend,
      });
      const result = await response.json();
      if (response.status === 200) {
        alert("Product added successfully!");
        console.log(result.product);
        // Reset the form
        setFormData({
          district: "",
          mandi: "",
          productName: "",
          price: "",
          quantity: "",
          negotiable: "No",
        });
        setProductImage(null);
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add a Product
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="district"
            placeholder="District"
            value={formData.district}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="mandi"
            placeholder="Mandi"
            value={formData.mandi}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={formData.productName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="negotiable"
            value={formData.negotiable}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="No">Not Negotiable</option>
            <option value="Yes">Negotiable</option>
          </select>
          <div>
            <label className="block mb-1 text-gray-700">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
