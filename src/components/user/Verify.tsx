"use client";

import React, { useState } from "react";
import axios from "axios";

interface UserAuthDetails {
  email: string | null;
  phone: string | null;
  name: string | null;
  type: "Retailer" | "Store";
}

interface Props {
  userData: UserAuthDetails;
  onSuccess?: () => void;
}

export default function UserAuthVerifyForm({ userData, onSuccess }: Props) {
  const [code, setCode] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code) return alert("Please enter the OTP code.");

    try {
      const response = await axios.post("http://localhost:3000/user/auth/verify", {
        ...userData,
        code,
      });

      const res = response.data;
      alert(`✅ Verification successful for ${res.data?.verifiedWith || userData.email || userData.phone}`);

      if (onSuccess) onSuccess();
    } catch (error: any) {
      const errRes = error.response?.data;
      alert(errRes?.message || "❌ Verification failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Verify OTP</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter the OTP sent to {userData.email || userData.phone}
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">OTP Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
