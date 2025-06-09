"use client"
import React, { useState } from "react";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // You can call your password reset API here
    console.log("Reset link sent to:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Password</h2>
        <p className="text-center text-sm text-gray-500">
          Enter your email and we’ll send you a link to reset your password.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-medium">
            ✅ A reset link has been sent to your email.
          </div>
        )}

        <p className="text-center text-sm text-gray-500">
          <a href="/login" className="hover:underline cursor-pointer text-indigo-500 font-medium">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
}
