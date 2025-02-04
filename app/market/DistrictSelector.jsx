"use client";
import React, { useState } from "react";

const DistrictSelector = () => {
  // Hard-coded arrays for demonstration.
  const [districts] = useState(["Mathura", "Aligarh", "Manipur"]);
  const [products] = useState(["Wheat", "Rice", "Bajra", "Jowar", "Maize"]);
  const [show, setShow] = useState(false);

  // Selected values and messages
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [messageBox, setMessageBox] = useState("");

  // Data fetched from the API
  const [shopPrices, setShopPrices] = useState([]);
  const [averagePrice, setAveragePrice] = useState(null);

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setShow(false);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    setShow(false);
  };

  const handleFindClick = async () => {
    if (!selectedDistrict || !selectedProduct) {
      alert("Please select both a district and a product.");
      return;
    }

    try {
      const response = await fetch("/api/products/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          district: selectedDistrict,
          product: selectedProduct,
        }),
      });

      const data = await response.json();

      // Check if the API returned a successful status and valid result data.
      if (
        data.status !== 200 ||
        !data.result ||
        !data.result.result ||
        data.result.result.length === 0
      ) {
        setMessageBox("No data found");
        setShopPrices([]);
        setAveragePrice(null);
        setShow(true);
        return;
      }

      // Extract the array of documents from the nested result structure.
      const docs = data.result.result;
      setShopPrices(docs);

      // Calculate the average price from the fetched data.
      const total = docs.reduce((acc, shop) => acc + Number(shop.price), 0);
      const avg = (total / docs.length).toFixed(2);
      setAveragePrice(avg);

      setShow(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessageBox("Error fetching data");
      setShopPrices([]);
      setAveragePrice(null);
      setShow(true);
    }
  };

  return (
    <div className="w-11/12 mx-auto p-5 font-sans">
      <div className="flex flex-wrap justify-between mb-5">
        {/* District Selector */}
        <div className="flex-1 min-w-fit mx-2">
          <h1 className="text-lg font-bold mb-2 text-gray-800">
            Select a District
          </h1>
          <select
            value={selectedDistrict}
            onChange={handleDistrictChange}
            className="w-full p-2 text-base border border-gray-300 rounded bg-gray-50"
          >
            <option value="">Select a district</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Product Selector */}
        <div className="flex-1 min-w-fit mx-2">
          <h1 className="text-lg font-bold mb-2 text-gray-800">
            Select a Product
          </h1>
          <select
            value={selectedProduct}
            onChange={handleProductChange}
            className="w-full p-2 text-base border border-gray-300 rounded bg-gray-50"
          >
            <option value="">Select a product</option>
            {products.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Find Button */}
      <div className="text-center mb-5">
        <button
          onClick={handleFindClick}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none"
        >
          Find
        </button>
      </div>

      {/* Display the results if data is fetched */}
      {show && (
        <div className="mt-5">
          {averagePrice !== null && (
            <h2 className="text-xl font-bold mb-5 text-gray-900">
              Average Price: {averagePrice}
            </h2>
          )}
          <div className="flex flex-wrap justify-center gap-5">
            {shopPrices.length > 0 ? (
              shopPrices.map((shop, index) => {
                // If shop.img exists, check if it starts with "data:" already. 
                // If not, prepend a Base64 JPEG prefix.
                const imageUrl =
                  shop.image && !shop.image.startsWith("data:")
                    ? `data:image/jpeg;base64,${shop.image}`
                    : shop.image;

                return (
                  <div
                    key={index}
                    className="cursor-pointer flex flex-col border border-gray-200 rounded shadow-md text-center overflow-hidden hover:shadow-lg bg-gray-50 p-2"
                  >
                    {/* Display the product image if available */}
                    {shop.image ? (
                      <div className="w-full h-40 overflow-hidden">
                        <img
                          src={imageUrl}
                          alt={`${shop.name} image`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="p-4 text-left">
                      <h3 className="text-lg font-semibold mb-2">{shop.name}</h3>
                      <p className="text-sm text-gray-600">Mandi: {shop.mandi}</p>
                      <p className="text-sm text-gray-600">
                        Product: {shop.productName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price:{" "}
                        <span className="text-black font-medium">
                          {shop.price}
                        </span>{" "}
                        per {shop.quantity}Kg
                      </p>
                      <p className="text-sm text-gray-600">
                        Negotiable: {shop.negotiable}
                      </p>
                      <p className="text-sm text-gray-600">Phone: {shop.phone}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600">{messageBox}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictSelector;
