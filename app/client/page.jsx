"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@components/Footer'
import { useAuth } from '@hook/authContext'
import { useRouter } from 'next/navigation';
import Navbar from '@components/Navigation'
import AllPage from '@/admin/killo'
// import FarmerComponent from '@/admin/components/FarmerComponent'

export default function Page() {
    const redirect = useRouter();
    const { user } = useAuth();
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
            redirect.push('/auth/signup');
        }
    }, [isAuthResolved, user, redirect]);

    if (!isAuthResolved) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* <!-- Navbar --> */}
            <Navbar />
            {/* <header className="bg-white shadow-lg fixed w-full z-10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-5xl font-bold text-black-600">Gramid</h1>
                    <nav className="hidden md:flex space-x-6 text-lg">
                        <Link href="/bazzar" className="text-gray-700 hover:text-blue-500 transition">Market</Link>
                        <Link href="/blog" className="text-gray-700 hover:text-blue-500 transition">Social</Link>
                        <Link href="/admin" className="text-gray-700 hover:text-blue-500 transition">Profile</Link>
                        <Link href="/legal" className="text-gray-700 hover:text-blue-500 transition">Help</Link>
                    </nav>
                </div>
            </header> */}

            {/* <!-- Hero Section --> */}
            <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('/images/fld3.jpg')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-6">
                    <h2 className="text-6xl font-bold">Explore the Organic bazzar</h2>
                    <p className="text-xl mt-4">A place where nature and Health unite</p>
                    <Link href='/bazzar' target='_blank' className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition">Visit now</Link>
                </div>
            </section>

            {/* <!-- Blog --> */}
            <section className="p-10 bg-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold">News and Articles</h2>
                    <p className="text-gray-600 mt-2">Always up to date with our latest News and Articles</p>
                    <div className="mt-4 text-right">
                        <Link href='/blog' target='_blank' className="px-4 py-2 border-2 border-black text-black font-semibold rounded shadow hover:bg-gray-200 flex items-center gap-2 w-max">
                            Read <span role="img" aria-label="book">📚</span>
                        </Link>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white rounded shadow-lg overflow-hidden">
                        <img src="images/blog/b1.jpg" alt="Startup" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">AgroTech startup for Farmers of India | Make in India</h3>
                            <p className="text-gray-500 text-sm">Posted by admin Jan 2025</p>
                            <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="images/blog/b2.jpg" alt="AI Disease Prevention" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Don't let disease take your profit use AI to fight back</h3>
                            <p className="text-gray-500 text-sm">Posted by admin Jan 2025</p>
                            <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="images/blog/b3.jpg" alt="Best Rates" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">Find the best Rate in your area and district</h3>
                            <p className="text-gray-500 text-sm">Posted by admin Jan 2025</p>
                            <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white py-10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center px-6">
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                        <img src="images/Bazzar/f1.jpg" alt="Farmer in field" className="w-72 h-auto rounded  border-yellow-300 shadow-yellow-600 shadow-xl" />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome to Zarori Suchna: Your Trusted Source for government news 🥇</h2>
                        <p className="text-gray-600 mt-4">
                        At Zaroori Suchna, we are dedicated to keeping citizens informed with the latest updates, policies, and announcements from the government. Our platform serves as a reliable source for crucial information, ensuring that you stay up to date with schemes, subsidies, regulations, and initiatives that impact your daily life.
                        </p>
                        <Link href='/legal/gov' target='_blank' className="mt-4 px-5 py-2 border-2 border-black text-black font-semibold rounded shadow hover:bg-gray-200 flex items-center gap-2 w-max">
                            Read 🤝
                        </Link>
                    </div>
                </div>
            </section>
            <AllPage />
            <Footer />

        </>
    )
}