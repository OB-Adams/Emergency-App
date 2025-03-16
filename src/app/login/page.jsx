'use client'

import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mock API call (replace with real endpoint later)
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) alert('Login successful! Redirecting to Home...');
    else alert('Login failed. Check your credentials.');
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
        </div>
        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded-full hover:bg-red-700 mt-4"
        >
          Log in
        </button>
        <p className="text-center text-red-600 mt-2">
          Don’t have an account? <a href="/signup" className="underline">Sign up</a>
        </p>
      </form>
    </div>
  );
}