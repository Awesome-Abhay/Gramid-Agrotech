"use client";
import React from 'react';
import LoanApplicationForm from './LoanApplicationForm';
import { useAuth } from '@hook/authContext';

const App = () => {
  const { user } = useAuth();

  // If the user data is not yet available, show a loading message.
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    );
  }

  // Calculate the total number of transactions and total amount paid.
  // We assume that the user object has a "transaction" key that holds an array
  // of transaction objects, each with an "amount" property.
  const totalTransactions = user.transactions?.length || 0;
  const totalAmountPaid = user.transactions
    ? user.transactions.reduce((sum, txn) => sum + (Number(txn.amountPaid) || 0), 0)
    : 0;
  console.log('totalTransactions:', totalTransactions, totalAmountPaid);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LoanApplicationForm
        totalTransactions={totalTransactions}
        totalAmountPaid={totalAmountPaid}
      />
    </div>
  );
};

export default App;
