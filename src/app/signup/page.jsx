// src/app/signup/page.jsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobilePhone: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
      if (formData.password && value) {
        setConfirmPasswordError(
          formData.password !== value ? 'Passwords do not match.' : ''
        );
      } else {
        setConfirmPasswordError('');
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === 'password' && confirmPassword) {
        setConfirmPasswordError(
          value !== confirmPassword ? 'Passwords do not match.' : ''
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPasswordError) return;

    try {
      const res = await signIn('credentials', {
        redirect: false,
        action: 'signup',
        fullName: formData.fullName,
        email: formData.email,
        mobilePhone: formData.mobilePhone,
        password: formData.password,
      });

      if (res?.error) {
        const parsedError = JSON.parse(res.error);
        setError(parsedError);
      } else {
        router.push('/login'); // Redirect to dashboard or home page after successful sign-up
      }
    } catch (err) {
      setError({ general: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Let’s sign you up.</h1>
      <p className="text-gray-600 mb-6">Welcome.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-full mt-1"
            placeholder="Your name"
          />
          {error?.fullName && (
            <p className="text-red-600 text-sm">{error.fullName}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-full mt-1"
            placeholder="Your email"
          />
          {error?.email && (
            <p className="text-red-600 text-sm">{error.email}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Mobile Phone</label>
          <input
            type="tel"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleChange}
            className="w-full p-2 border rounded-full mt-1"
            placeholder="1234567890"
            pattern="\d{10}"
            inputMode="numeric"
            maxLength={10}
          />
          {error?.mobilePhone && (
            <p className="text-red-600 text-sm">{error.mobilePhone}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-full mt-1"
            placeholder="Enter password"
          />
          {error?.password && (
            <div className="text-red-600 text-sm">
              <p>Password must:</p>
              <ul>
                {Array.isArray(error.password) ? (
                  error.password.map((err) => (
                    <li key={err}>- {err}</li>
                  ))
                ) : (
                  <li>- {error.password}</li>
                )}
              </ul>
            </div>
          )}
        </div>
        <div>
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded-full mt-1"
            placeholder="Confirm password"
          />
          {confirmPasswordError && (
            <p className="text-red-600 text-sm">{confirmPasswordError}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={confirmPasswordError !== ''}
          className="w-full bg-red-600 text-white p-2 rounded-full hover:bg-red-700 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Sign up
        </button>
        <p className="text-center text-red-600 mt-2">
          Already a member? <a href="/login" className="underline">Log in</a>
        </p>
        {error?.general && (
          <p className="text-red-600 text-sm text-center">{error.general}</p>
        )}
      </form>
    </div>
  );
}