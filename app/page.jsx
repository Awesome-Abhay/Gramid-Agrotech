"use client"
import React from 'react'
import { useAuth } from '@hook/authContext';
import { useRouter } from 'next/navigation'

export default function Page() {
    const { user } = useAuth();
    const router = useRouter();
    const handleClick = () => {
        console.log(user)
        if(user) {
            router.push('/client')
        }else {
            router.push('/auth/signup')
        }
    }
    return (
        <div className="bg-green-50">
            <div className="max-w-6xl mx-auto flex flex-row md:flex-row justify-center items-center">
                <div className="relative w-full max-w-[400px] h-auto">
                    <img src="/images/bg.png" alt="Bg" className="w-full h-full object-cover" />
                    <img src="/images/tulsi2.png" alt="img" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-90 -mt-11 -ml-8 opacity-80" />
                </div>
                <div className="min-h-screen flex flex-col justify-center items-start text-center p-4 ">
                    <h1 className="text-5xl font-bold text-black-900 mb-5">कृषि क्रांति में शामिल </h1>
                    <h1 className="text-5xl font-bold text-black-900 mb-5">हों</h1>
                    <button id="ctaButton" className="bg-green-600 text-white px-6 py-3 rounded shadow-lg hover:bg-green-700" onClick={handleClick}>Get started</button>
                </div>
            </div>
        </div>
    )
}