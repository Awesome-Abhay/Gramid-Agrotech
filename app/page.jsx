"use client"
import React from 'react'
import { useAuth } from '@hook/authContext';
import { useRouter } from 'next/navigation'

export default function Page() {
    const { user } = useAuth();
    const router = useRouter();
    const handleClick = () => {
        if (user) {
            router.push('/client')
        } else {
            router.push('/auth/signup')
        }
    }
    return (
        <div className="bg-green-50">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center min-h-screen p-4 sm:p-6">
                <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] h-auto">
                    <img src="images/bg.png" alt="Bg" className="w-full h-auto object-cover" />
                        <img src="images/tulsi2.png" alt="img" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 sm:w-48 md:w-60 opacity-80" />
                        </div>
                        <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 sm:px-6 md:p-8 mt-20 md:mt-0">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2">कृषि क्रांति में शामिल</h1>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6">हों</h1>
                            <button id="ctaButton" className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-green-700 transition">
                                Get started
                            </button>
                        </div>
                </div>
            </div>
            )
}