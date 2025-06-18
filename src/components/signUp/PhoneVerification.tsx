'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function PhoneVerification() {
  const router = useRouter();
  const otpRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      e.target.value = value;
      if (value && index < 5) {
        otpRefs[index + 1].current?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm border-t-4 border-gradient-to-r from-red-400 via-teal-400 to-sky-400">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">Phone Verification</h2>
          <p className="text-sm text-center text-gray-500 mb-6">Verify your mobile number</p>

          {/* Step Indicator */}
          <div className="text-sm text-center text-gray-500 mb-2">Step 5 of 6</div>
          <div className="w-full bg-gray-200 h-1 rounded-full mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1 rounded-full w-[83%]"></div>
          </div>

          <p className="text-center text-sm text-gray-600 mb-4">
            We&apos;ve sent a 6-digit OTP to <span className="font-semibold text-gray-800">9372837721</span>
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-2 mb-6">
            {otpRefs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type="text"
                maxLength={1}
                className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl font-semibold focus:outline-none focus:border-indigo-500"
                onChange={(e) => handleInput(e, index)}
              />
            ))}
          </div>

          <button
            onClick={() => router.push('/sign-up/account-setup')}
            className="w-full py-3 cursor-pointer rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition mb-3"
          >
            Verify OTP
          </button>

          <p className="text-xs cursor-pointer text-center text-indigo-600 mb-2 cursor-pointer hover:underline">
            Didn&apos;t receive OTP? Resend
          </p>

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
