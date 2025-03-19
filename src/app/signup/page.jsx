'use client';

import { useActionState, useState } from 'react';
import { signup } from '../actions/auth';
import { toast } from 'sonner';

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobilePhone: '',
    password: '',
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); // Local state for confirmPassword error

  const [state, action, pending] = useActionState(signup, undefined);
  console.log('Validation errors:', state?.errors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Validate confirmPassword in real-time
    if (name === 'password' || name === 'confirmPassword') {
      const newFormData = { ...formData, [name]: value };
      if (newFormData.password && newFormData.confirmPassword) {
        setConfirmPasswordError(
          newFormData.password !== newFormData.confirmPassword
            ? 'Passwords do not match.'
            : ''
        );
      } else {
        setConfirmPasswordError('');
      }
    }
  };

  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Let’s sign you up.</h1>
      <p className="text-gray-600 mb-6">Welcome.</p>
      <form action={action} className="space-y-4">
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
          {state?.errors?.fullName && (
            <p className="text-red-600 text-sm">{state.errors.fullName}</p>
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
          {state?.errors?.email && (
            <p className="text-red-600 text-sm">{state.errors.email}</p>
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
          {state?.errors?.mobilePhone && (
            <p className="text-red-600 text-sm">{state.errors.mobilePhone}</p>
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
          {state?.errors?.password && (
            <div className="text-red-600 text-sm">
              <p>Password must:</p>
              <ul>
                {Array.isArray(state.errors.password) ? (
                  state.errors.password.map((error) => (
                    <li key={error}>- {error}</li>
                  ))
                ) : (
                  <li>- {state.errors.password}</li>
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
            value={formData.confirmPassword}
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
          disabled={pending || confirmPasswordError !== ''} // Disable if there's a confirmPassword error
          className="w-full bg-red-600 text-white p-2 rounded-full hover:bg-red-700 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Sign up
        </button>
        <p className="text-center text-red-600 mt-2">
          Already a member? <a href="/login" className="underline">Log in</a>
        </p>
        {state?.errors?.general && (
          <p className="text-red-600 text-sm text-center">{state.errors.general}</p>
        )}
      </form>
    </div>
  );
}