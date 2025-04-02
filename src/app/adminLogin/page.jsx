'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function AdminLogin() {
  // Define state for form data and error
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null); // Define error state
  const router = useRouter(); // Initialize router for navigation

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.username, // Use username as email for signIn
        password: formData.password,
      });

      if (res?.error) {
        const parsedError = JSON.parse(res.error);
        setError(parsedError);
      } else {
        router.push("/homepage"); // Redirect on successful login
      }
    } catch (err) {
      setError({ general: "An unexpected error occurred." });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Username/Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="email" // Use email type for validation
            name="username" // Use lowercase for consistency
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded-full mt-1"
            placeholder="Your email"
          />
          {error?.username && (
            <p className="text-red-600 text-sm">{error.username}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-full mt-1"
            placeholder="Your password"
          />
          {error?.password && (
            <p className="text-red-600 text-sm">{error.password}</p>
          )}
        </div>

        {/* General Error Message */}
        {error?.general && (
          <p className="text-red-600 text-sm mb-4">{error.general}</p>
        )}

        {/* Submit Button */}
          <button 
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded-full hover:bg-blue-600"
        >
          Login
        </button>          
      </form>
    </div>
  );
}