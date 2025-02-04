"use client"
import Link from 'next/link'
import React from 'react';

const FarmerComponent = () => {
    return (
        <div>
            <section className='py-10 bg-gray-100'>
                <div className='max-w-4xl mx-auto flex flex-col  items-center px-6'>
                    <div className="max-w-4xl mx-auto text-center mt-10">
                        <h2 className="text-2xl font-bold text-gray-900 flex justify-center items-center gap-2 mb-3">AI Features 🚀</h2>
                    </div>

                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mt-6 px-6 items-center justify-center">

                        <Link href='/ai/leaf' target='_blank' className="bg-white rounded shadow-lg overflow-hidden max-w-80">
                            <img src="images/feature/f1.jpg" alt="Plant Disease Detection" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">Plant disease detection | Make in India</h3>
                                <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                            </div>
                        </Link>

                        <Link href='/ai/weather' target='_blank'className="bg-white rounded shadow-lg overflow-hidden max-w-80">
                            <img src="images/feature/f2.jpg" alt="Weather Prediction AI" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">Weather prediction using AI | Make in India</h3>
                                <p className="text-gray-700 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                            </div>
                        </Link>
                    </div>
                </div>

            </section>
                        {/* <!-- Features --> */}
                        <section className="bg-white py-10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center px-6">
                    <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                        <img src="images/Bazzar/f1.jpg" alt="Farmer in field" className="w-72 h-auto rounded  border-yellow-300 shadow-yellow-600 shadow-xl" />
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome to AgriMart: Your Trusted Partner in Farming Success! 🌾</h2>
                        <p className="text-gray-600 mt-4">
                            At AgriMart, we are committed to empowering farmers with the best tools, equipment, and resources to grow their farms and livelihoods.
                            Our online shop offers a wide range of agricultural products tailored to meet the unique needs of every farmer.
                        </p>
                        <Link href='/market' target='_blank' className="mt-4 px-5 py-2 border-2 border-black text-black font-semibold rounded shadow hover:bg-gray-200 flex items-center gap-2 w-max">
                            Join 🤝
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FarmerComponent;