'use client'

import { useState } from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobilePhone: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mock API call (replace with real endpoint later)
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) alert('Sign up successful! Please log in.');
    else alert('Sign up failed. Try again.');
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
        </div>
        <div>
          <label className="block text-gray-700">Mobile Phone</label>
          <input
            type="tel"
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleChange}
            className="w-full p-2 border rounded-full mt-1"
            placeholder="Your password"
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
          Sign up
        </button>
        <p className="text-center text-red-600 mt-2">
          Already a member? <a href="/login" className="underline">Log in</a>
        </p>
      </form>
    </div>
  );
}