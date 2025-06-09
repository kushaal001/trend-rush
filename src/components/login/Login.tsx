"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // for client-side navigation

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Your login condition
    if (email === "nanimudhiraj001@gmail.com" && password === "Trendrush") {
      router.push("/dashboard/home/orders");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login to your account</h2>

        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-5">
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

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Don't have an account?</span>
            <a href="/sign-up" className="text-indigo-500 hover:underline">
              Register
            </a>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-xl transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          <a href="/reset-password" className="hover:underline text-indigo-400">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
}
