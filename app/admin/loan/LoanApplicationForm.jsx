import React, { useState } from 'react';

const LoanApplicationForm = ({ totalTransactions, totalAmountPaid }) => {
  // Example calculation for maximum allowed loan amount.
  // Adjust this formula as needed.
  const calculateMaxLoan = () => {
    // For example: max loan is (totalTransactions * totalAmountPaid) / 10
    return Math.floor((totalTransactions * totalAmountPaid) / 10);
  };

  const maxLoan = calculateMaxLoan();

  // Component state for the form fields.
  const [bankAccount, setBankAccount] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  // For simplicity, using an array of banks. You can replace these with your data.
  const banks = ['PNB', 'SBI', 'YES Bank', 'Bank of Baroda', 'HDFC Bank'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert loan amount to a number.
    const requestedAmount = Number(loanAmount);

    // Validate that the requested amount is a positive number and does not exceed the maximum.
    if (requestedAmount <= 0) {
      alert('Please enter a valid loan amount.');
      return;
    }
    if (requestedAmount > maxLoan) {
      alert(`The requested loan amount exceeds your maximum eligible amount of ₹${maxLoan}.`);
      return;
    }

    // Create an object with the form data.
    const applicationData = {
      bankAccount,
      panNumber,
      aadhaarNumber,
      description,
      selectedBank,
      loanAmount: requestedAmount,
    };

    setLoading(true);
    setApiMessage('');
    try {
      const response = await fetch(`/api/mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            email: "gourav.sharma.apsmat2932@gmail.com", 
            subject: "Loan Application",
            message: `
       <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
      <h2 style="color: #2c3e50;">Loan Request Submission</h2>
      <p>Dear Loan Officer,</p>
      <p>We are submitting a loan request on behalf of our customer. Below are the applicant's details and loan requirements for your review:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f2f2f2;"><strong>Bank Account Number</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${bankAccount}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f2f2f2;"><strong>PAN Number</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${panNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f2f2f2;"><strong>Aadhaar Number</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${aadhaarNumber}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f2f2f2;"><strong>Selected Bank</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${selectedBank}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f2f2f2;"><strong>Requested Loan Amount (₹)</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd; color: #27ae60; font-weight: bold;">₹${loanAmount}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd; background: #f2f2f2;"><strong>Reason for Loan</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${description}</td>
        </tr>
      </table>

      <p style="margin-top: 20px;">We kindly request you to review this application and proceed with the necessary formalities. If any further documentation is required, please let us know.</p>
      
      <p>Looking forward to your prompt response.</p>

      <p>Best regards,<br><strong>Your Loan Processing Team</strong><br>Contact: support@yourbank.com</p>
    </div>
  </body>
  `
          }),
      });

      if (response.status != 200) {
        setApiMessage('Failed to submit loan application. Please try again.');
      }

      const data = await response.json();
      console.log('Loan application submitted:', data);
      setApiMessage('Loan application submitted successfully.');

      // Optionally clear the form.
      setBankAccount('');
      setPanNumber('');
      setAadhaarNumber('');
      setDescription('');
      setSelectedBank('');
      setLoanAmount('');
    } catch (error) {
      console.error('Error submitting loan application:', error);
      setApiMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">Apply for a Loan</h2>
      <p className="text-md text-gray-600 mb-8 text-center">
        Your maximum eligible loan amount is:{' '}
        <span className="font-bold text-blue-600">₹{maxLoan}</span>
      </p>
      <form onSubmit={handleSubmit}>
        {/* Bank Account Number */}
        <div className="mb-6">
          <label htmlFor="bankAccount" className="block text-gray-700 font-semibold mb-2">
            Bank Account Number
          </label>
          <input
            type="text"
            id="bankAccount"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your bank account number"
            required
          />
        </div>

        {/* PAN Number */}
        <div className="mb-6">
          <label htmlFor="panNumber" className="block text-gray-700 font-semibold mb-2">
            PAN Number
          </label>
          <input
            type="text"
            id="panNumber"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your PAN number"
            required
          />
        </div>

        {/* Aadhaar Number */}
        <div className="mb-6">
          <label htmlFor="aadhaarNumber" className="block text-gray-700 font-semibold mb-2">
            Aadhaar Number
          </label>
          <input
            type="text"
            id="aadhaarNumber"
            value={aadhaarNumber}
            onChange={(e) => setAadhaarNumber(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Aadhaar number"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Why do you need the loan?
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your need for the loan"
            required
          ></textarea>
        </div>

        {/* Bank Select */}
        <div className="mb-6">
          <label htmlFor="selectedBank" className="block text-gray-700 font-semibold mb-2">
            Select Bank
          </label>
          <select
            id="selectedBank"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Choose a bank
            </option>
            {banks.map((bank, index) => (
              <option key={index} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </div>

        {/* Loan Amount */}
        <div className="mb-8">
          <label htmlFor="loanAmount" className="block text-gray-700 font-semibold mb-2">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Up to ₹${maxLoan}`}
            required
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow transform hover:scale-105 transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Send'}
        </button>
      </form>
      {apiMessage && (
        <p className="mt-4 text-center text-sm text-gray-700">
          {apiMessage}
        </p>
      )}
    </div>
  );
};

export default LoanApplicationForm;
