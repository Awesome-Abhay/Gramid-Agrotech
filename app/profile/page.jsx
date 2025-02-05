"use client";
import React from 'react';
import { useAuth } from '@hook/authContext'; // adjust the path as necessary
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  // Destructure the user and authentication functions from your auth context.
  const { user, logOut, deleteAccount } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    router.push('/');
  };

  // Render a loading state if the user object isn't available yet.
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-900">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Profile
        </h2>

        <div className="mt-8">
          {/* Display User Information */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-gray-900">{user.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <p className="mt-1 text-gray-900">{user.occupation}</p>
          </div>
          {/* Add any additional user details here */}
        </div>

        <div className="mt-6 flex justify-between">
          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
