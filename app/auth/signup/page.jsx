'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@hook/authContext';

export default function SignupForm() {
  const { signUp, onAuth, user } = useAuth();
  const route = useRouter();

  useEffect(() => {
    if(user) {
      route.push('/client')
    }
  });

  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: '',
    city: '',
    state: '',
    zip: '',
    occupation: '',
    phone: '',
    upi_id: null, // default to null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If occupation is changed and it's not 'seller', set upi_id to null
    if (name === 'occupation' && value !== 'seller') {
      setFormData((prev) => ({ ...prev, [name]: value, upi_id: null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
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
        // Move to the next step
        setStep(2);
      } else {
        console.error('Failed to send OTP:', data.message);
        setMessage(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setMessage('An error occurred while sending OTP.');
    } finally {
      setLoading(false);
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
  };

  // Render loading state if OTP is being requested
  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-xs w-full p-6 bg-white text-center">
          <p className="text-lg font-semibold">Sending OTP...</p>
          <p>Please wait while we send the OTP to your email.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xs w-full p-6 bg-white">
        {message && <p className="text-red-500">{message}</p>}
        {step === 1 ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            <fieldset>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded mb-2"
              />

              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded mb-2"
              />

              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded mb-2"
              />
            </fieldset>
            <button type="submit" className="mt-4 w-full p-2 bg-blue-500 text-white rounded">
              Next
            </button>
          </form>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyOTP();
            }}
          >
            <fieldset>
              <label className="block mb-1 font-medium">Enter OTP</label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded mb-2"
              />

              <label className="block mb-1 font-medium">Phone no.</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone no"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded mb-2"
              />

              <div className="flex gap-2 flex-wrap w-full">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">State</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded mb-2"
                  />
                </div>
              </div>

              <label className="block mb-1 font-medium">Zip Code</label>
              <input
                type="text"
                name="zip"
                placeholder="Zip Code"
                value={formData.zip}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded mb-2"
              />

              <label className="block mb-1 font-medium">Occupation</label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">Select an occupation</option>
                <option value="farmer">Farmer</option>
                <option value="seller">Seller</option>
                <option value="blogger">Blogger</option>
              </select>

              {/* Conditionally render the UPI ID field if occupation is seller */}
              {formData.occupation === 'seller' && (
                <>
                  <label className="block mb-1 font-medium">UPI ID</label>
                  <input
                    type="text"
                    name="upi_id"
                    placeholder="Enter UPI ID"
                    value={formData.upi_id || ''}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded mb-2"
                  />
                </>
              )}
            </fieldset>
            <button type="submit" className="mt-4 w-full p-2 bg-green-500 text-white rounded">
              Confirm
            </button>
          </form>
        )}
        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
