"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useAuth } from '@hook/authContext';

export default function Page() {
    const { logIn, onAuth } = useAuth();

    const route = useRouter();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password:''
    })
    const handleChannge = (e) => {
        setFormData(
            {...formData, [e.target.name]: e.target.value }
        )
    }

    const handleSubmit = async () => {
        const result = await logIn(formData);
        if(result.status === 200) {
            // console.log(result.user["result"])
            onAuth(result.user["result"]);
            route.push('/client')
        }
        else {
            setMessage(result.message)
        }
    }

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-xs w-full p-6 bg-white">
                { message && <p className='text-red-500'>{message}</p> }
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <fieldset>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" required className="w-full p-2 border rounded mb-2" onChange={handleChannge} value={formData.email} />

                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" required className="w-full p-2 border rounded mb-2" onChange={handleChannge} value={formData.password} />

                    </fieldset>
                    <button type="submit" className="mt-4 w-full p-2 bg-blue-500 text-white rounded">Next</button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Create a account? <Link href="/auth/signup" className="text-blue-500 hover:underline">Signup</Link>
                </p>
            </div>
        </main>
    )
}