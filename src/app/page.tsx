"use client";
import Link from "next/link";
import React from "react";

export default function AdminLoginPage() {
  return (
<div className="min-h-screen flex overflow-hidden items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 font-sans">
  <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
    

    {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-teal-400 to-sky-400 rounded-t-2xl"></div> */}


    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-gray-800">TrendRush</h1>
      <p className="text-sm text-gray-500 mt-1">Admin Portal</p>
    </div>

    <h2 className="text-lg font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
<Link href="/login" >
    <button className="w-full cursor-pointer py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition mb-4">
      Sign In to Admin Portal
    </button>
    </Link>
<Link href="/sign-up/business-type">
    <button className="w-full cursor-pointer py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition">
      Register as New Merchant
    </button>
</Link>
    <div className="mt-4 text-center">
      <a href="#" className="text-sm text-indigo-500 underline hover:text-indigo-600">Forgot Password?</a>
    </div>
  </div>
</div>
  );
}
