"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@hook/authContext';
import FarmerComponent from './components/FarmerComponent';
import SellerComponent from './components/SellerComponent';
import BloggerComponent from './components/BloggerComponent';
import ArthiComponent from './components/ArthiComponent';
import Navbar  from '@components/Navigation'

export default function AllPage() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    // Simulate waiting for authentication to resolve
    const timer = setTimeout(() => {
      setIsAuthResolved(true);
    }, 500); // adjust the delay as necessary

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only attempt to redirect once we know authentication has been resolved
    if (isAuthResolved && !user) {
      router.push('/auth/signup');
    }
  }, [isAuthResolved, user, router]);

  if (!isAuthResolved) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      {user?.occupation === 'farmer' && <FarmerComponent />}
      {user?.occupation === 'seller' && <SellerComponent id={user._id} />}
      {user?.occupation === 'blogger' && <BloggerComponent />}
      {user?.occupation === 'arthi' && <ArthiComponent />}

    </>
  );
}
