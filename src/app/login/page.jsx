'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        const parsedError = JSON.parse(res.error);
        setError(parsedError);
      } else {
        router.push('/homepage');
      }
    } catch (err) {
      setError({ general: 'An unexpected error occurred.' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Let’s log you in.</h1>
      <p className="text-gray-600 mb-6">Welcome back.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            <p className="text-red-600 text-sm">{error.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded-full hover:cursor-pointer  hover:bg-red-700 mt-4"
        >
          Log in
        </button>
        <p className="text-center text-red-600 mt-2">
          Don’t have an account? <a href="/signup" className="underline">Sign up</a>
        </p>
        {error?.general && (
          <p className="text-red-600 text-sm text-center">{error.general}</p>
        )}
      </form>
    </div>
  );
}