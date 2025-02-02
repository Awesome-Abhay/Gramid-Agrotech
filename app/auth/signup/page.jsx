'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@hook/authContext';

export default function SignupForm() {

  const { signUp, onAuth } = useAuth();

  const route = useRouter();
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: '',
    city: '',
    state: '',
    zip: '',
    occupation: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const response = await fetch('/api/authentication/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setOtp(data.OTP);
      console.log('OTP:', data.OTP);

      setStep(2);

    } else {
      console.error('Failed to send OTP:', data.message);
    }
  };

  const handleVerifyOTP = async () => {
    if (formData.otp !== otp) {
      setMessage('Invalid OTP');
      return;
    }
    submitForm();
  };

  const submitForm = async () => {
    const response = await signUp(formData);
    if (response.status === 200) {
      // onAuth(formData);
      alert('User created successfully, now you can login');
      route.push('/auth/login');
    } else {
      setMessage(response.message);
    }

  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="max-w-xs w-full p-6 bg-white">
        {message && <p className='text-red-500'>{message}</p>}
        {step === 1 ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
            {/* <h2 className="text-xl font-semibold mb-4">Signup</h2> */}
            <fieldset>
              <label>Full Name</label>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />

              <label>Email</label>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />

              <label>Password</label>
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
            </fieldset>
            <button type="submit" className="mt-4 w-full p-2 bg-blue-500 text-white rounded">Next</button>
          </form>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleVerifyOTP() }}>
            {/* <h2 className="text-xl font-semibold mb-4">OTP Confirmation</h2> */}
            <fieldset>
              <label>Enter OTP</label>
              <input type="text" name="otp" placeholder="Enter OTP" value={formData.otp} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />

              <label>Phone no.</label>
              <input type="tel" name="phone" placeholder="Enter Phone no" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />

              <div className='flex gap-2 wrap w-full'>
                <div>
                  <label>City</label>
                  <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
                </div>
                <div>
                  <label>State</label>
                  <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
                </div>

              </div>

              <label>Zip Code</label>
              <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} required className="w-full p-2 border rounded mb-2" />

              <label>Occupation</label>
              <select name="occupation" value={formData.occupation} onChange={handleChange} required className="w-full p-2 border rounded mb-4">
                <option value="">Select an occupation</option>
                <option value="farmer">Farmer</option>
                <option value="seller">Seller</option>
                <option value="blogger">Blogger</option>
              </select>
            </fieldset>
            <button type="submit" className="mt-4 w-full p-2 bg-green-500 text-white rounded">Confirm</button>
          </form>
        )}
        <p className="text-center mt-4 text-gray-600">
          Already have an account? <Link href="/auth/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </main>
  );
}
