import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-green-500 text-white p-10 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <img src="icon.png" alt="Logo" className="w-16 h-16 rounded-full" />
                        <h2 className="text-2xl font-bold">Gramid</h2>
                </div>
                <div className="flex flex-col md:flex-row text-lg space-y-3 md:space-y-0 md:space-x-8 text-center">
                    <Link href="#">About Us</Link>
                    <Link href="#">Contact Us</Link>
                    <Link href="/blog">Blog</Link>
                </div>
                <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
                    <div className="flex bg-white py-1 px-2 rounded items-center space-x-3 w-full md:w-auto">
                        <span className="text-black text-xl">📧</span>
                        <input type="email" disabled placeholder="Email Us" className="border-none outline-none text-black px-3 py-2 flex-1 md:w-auto text-lg" />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded text-lg">Send</button>
                    </div>
                    <div className="text-lg mt-4 text-center md:text-right gap-2 flex items-center justify-center">
                        <Link href="#">Privacy Policy</Link> |
                        <Link href="#">Terms & Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}