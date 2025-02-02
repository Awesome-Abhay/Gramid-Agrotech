"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "@hook/authContext";

// -----------------------------------------------------
// This component uses useSearchParams and holds all your logic.
// It is wrapped by Suspense in the parent PaymentForm component.
function PaymentFormContent() {
  const { user, onAuth } = useAuth();
  const searchParams = useSearchParams();

  // Retrieve query parameters from the URL
  const sellerId = searchParams.get("seller");
  const productId = searchParams.get("product");
  const amount = searchParams.get("price");
  const quantity = searchParams.get("quantity");

  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState({ seller_name: "", upi_id: "" });
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Fetch seller and product details when sellerId or productId changes
  useEffect(() => {
    if (!sellerId || !productId) return;

    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/bazzar/seller/${sellerId}`);
        const data = await res.json();
        setSeller(data);
      } catch (error) {
        console.error("Error fetching seller:", error);
      }
    };

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/bazzar/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchSeller();
    fetchProduct();
  }, [sellerId, productId]);

  // Create the QR code value using seller details and amount from query params
  const qrValue = `upi://pay?pa=${seller.upi_id}&pn=OrganicFoods&am=${amount}&cu=INR`;

  // Handle payment confirmation
  const handleConfirmPayment = async () => {
    setPaymentConfirmed(true);
    const invoiceNumber = Math.floor(Math.random() * 1000000);

    // Record the transaction
    const res = await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        invoiceNo: invoiceNumber,
        sellerId,
        amountPaid: amount,
        productId,
        paymentDate: new Date().toISOString()
      })
    });
    const resData = await res.json();
    console.log("Transaction result:", resData.result);
    onAuth(resData.result);

    // Send invoice email (example code)
    await fetch("/api/mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email, // send to user's email
        subject: "Payment Invoice 📩",
        message: generateInvoiceHTML(user, product, { quantity, amount }, invoiceNumber)
      })
    });
  };

  return (
    <div className="flex flex-col items-center p-6 h-full justify-center">
      <div className="p-6 text-center border border-gray-300 flex flex-wrap justify-center items-center gap-6">
        <div className="flex flex-col items-center mt-4 gap-2">
          <h2 className="text-xl font-bold">Complete Your Payment</h2>
          <p className="text-gray-600 mt-2">Scan the QR code to pay</p>
          <QRCodeSVG value={qrValue} size={200} />
        </div>

        <div className="flex flex-col items-center mt-4">
          <div className="mt-4 text-left w-full">
            <label className="block text-sm font-medium">Seller UPI ID:</label>
            <input
              type="text"
              value={seller.upi_id}
              disabled
              className="border border-gray-300 p-2 w-full mt-1 rounded-md"
            />
            <label className="block text-sm font-medium mt-2">Amount:</label>
            <input
              type="number"
              value={amount}
              disabled
              className="border border-gray-300 p-2 w-full mt-1 rounded-md"
            />
            <p className="mt-2">
              <strong>Seller:</strong> {seller.seller_name}
            </p>
            <p>
              <strong>Amount:</strong> {amount} INR
            </p>
            <p>
              <strong>Method:</strong> UPI
            </p>
          </div>
          {!paymentConfirmed ? (
            <button
              className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
              onClick={handleConfirmPayment}
            >
              Confirm Payment
            </button>
          ) : (
            <p className="mt-4 text-green-600 font-semibold">Payment Confirmed ✅</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to generate invoice HTML
const generateInvoiceHTML = (user, product, params, invoiceNumber) => `
<html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
      .invoice-container { max-width: 800px; margin: 50px auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
      .header { text-align: center; margin-bottom: 40px; }
      .header h1 { font-size: 36px; color: #333; }
      .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
      .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
      .invoice-table th, .invoice-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
      .invoice-table th { background: #f9f9f9; color: #555; }
      .total { display: flex; justify-content: flex-end; font-size: 18px; font-weight: bold; }
      .footer { text-align: center; margin-top: 40px; font-size: 14px; color: #888; }
    </style>
  </head>
  <body>
    <div class="invoice-container">
      <div class="header">
        <h1>Invoice</h1>
        <p>Thank you for your purchase!</p>
      </div>
      <div class="invoice-details">
        <div>
          <h3>Invoice ${invoiceNumber}</h3>
          <p>Date: ${new Date().toLocaleString()}</p>
        </div>
        <div>
          <h3>Billing To:</h3>
          <p>${user.name}</p>
          <p>Phone: ${user.phone}</p>
        </div>
      </div>
      <table class="invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${product?.name || "Item"}</td>
            <td>${params.quantity}</td>
            <td>${product?.price || "0"}</td>
            <td>${(product?.price || 0) * params.quantity}</td>
          </tr>
        </tbody>
      </table>
      <div class="total">
        <p>Total: ${(product?.price || 0) * params.quantity} INR</p>
      </div>
      <div class="footer">
        <p>If you have any questions, contact us at support@yourstore.com</p>
        <p>&copy; 2025 Your Store. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

// -----------------------------------------------------
// The default export wraps PaymentFormContent with Suspense.
// This ensures that any usage of useSearchParams() within PaymentFormContent
// is executed within a Suspense boundary.
export default function PaymentForm() {
  return (
    <Suspense fallback={<div>Loading Payment Details...</div>}>
      <PaymentFormContent />
    </Suspense>
  );
}
