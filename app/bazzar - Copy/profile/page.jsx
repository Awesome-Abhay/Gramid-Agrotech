"use client";
import React from "react";
import { useAuth } from "@hook/authContext";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow rounded-lg flex flex-col md:flex-row w-full max-w-3xl">
        {/* Left Side - Profile Section */}
        <div className="flex-shrink-0 p-6 flex flex-col items-center border-b md:border-b-0 md:border-r">
          <img
            src="https://placehold.co/150x150"
            alt="Profile Picture"
            className="w-24 h-24 rounded-full border"
          />
          <h2 className="mt-4 text-xl font-medium text-gray-800">{user.name}</h2>
          <p className="mt-1 text-gray-600">{user.email}</p>
          <p className="mt-1 text-gray-600">{user.phone}</p>
        </div>

        {/* Right Side - Transaction History */}
        <div className="flex-grow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Transaction History
          </h3>
          {user.transactions && user.transactions.length > 0 ? (
            <ul className="space-y-3">
              {user.transactions.map((transaction, index) => (
                <li
                  key={index}
                  className="p-4 border rounded flex flex-col space-y-1"
                >
                  <div className="text-sm text-gray-700">
                    <strong>Invoice No:</strong> {transaction.invoiceNo}
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Seller ID:</strong> {transaction.sellerId}
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Amount Paid:</strong> ${transaction.amountPaid}
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Product ID:</strong> {transaction.productId}
                  </div>
                  <div className="text-sm text-gray-700">
                    <strong>Payment Date:</strong>{" "}
                    {new Date(transaction.paymentDate).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
