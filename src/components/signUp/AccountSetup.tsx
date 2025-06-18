'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AccountSetup() {
  const router = useRouter();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm border-t-4 border-gradient-to-r from-red-400 via-teal-400 to-sky-400">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">Account Setup</h2>
          <p className="text-sm text-center text-gray-500 mb-6">Create your admin credentials</p>

          {/* Step Indicator */}
          <div className="text-sm text-center text-gray-500 mb-2">Step 6 of 6</div>
          <div className="w-full bg-gray-200 h-1 rounded-full mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1 rounded-full w-full"></div>
          </div>

          {/* Password Inputs */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Create Password *</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Terms & Updates */}
          <div className="mb-3">
            <label className="inline-flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <span className="text-sm text-gray-600">
                I agree to the <a href="#" className="text-indigo-600 underline">Terms of Service</a> and{' '}
                <a href="#" className="text-indigo-600 underline">Privacy Policy</a>
              </span>
            </label>
          </div>

          <div className="mb-6">
            <label className="inline-flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={subscribe}
                onChange={() => setSubscribe(!subscribe)}
              />
              <span className="text-sm text-gray-600">
                I want to receive marketing updates and promotional offers from TrendRush
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-3 cursor-pointer rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition mb-3"
          >
            Create Admin Account
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="block cursor-pointer text-sm text-center text-indigo-600 underline mx-auto"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
