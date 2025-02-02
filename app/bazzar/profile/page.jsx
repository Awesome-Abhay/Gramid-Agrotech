"use client";
import React from "react";
import { useAuth } from "@hook/authContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile Page</h1>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user._id}</p>
          <p><strong>Phone:</strong> {user.phone}</p>

          <h2>Transactions</h2>
          {user.transactions && user.transactions.length > 0 ? (
            <ul>
              {user.transactions.map((transaction, index) => (
                <li key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
                  <p><strong>Invoice No:</strong> {transaction.invoiceNo}</p>
                  <p><strong>Seller ID:</strong> {transaction.sellerId}</p>
                  <p><strong>Amount Paid:</strong> ${transaction.amountPaid}</p>
                  <p><strong>Product ID:</strong> {transaction.productId}</p>
                  <p><strong>Payment Date:</strong> {new Date(transaction.paymentDate).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
};

export default ProfilePage;
