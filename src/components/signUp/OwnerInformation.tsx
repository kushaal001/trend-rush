'use client';

import { useRouter } from 'next/navigation';

export default function OwnerInformation() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md border-t-4 border-gradient-to-r from-red-400 via-teal-400 to-sky-400">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">Owner Information</h2>
          <p className="text-sm text-center text-gray-500 mb-6">Personal details for verification</p>

          {/* Step Indicator */}
          <div className="text-sm text-center text-gray-500 mb-2">Step 3 of 6</div>
          <div className="w-full bg-gray-200 h-1 rounded-full mb-6">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1 rounded-full w-[50%]"></div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" placeholder='Enter Name' className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input type="email" placeholder='Enter Email' className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number *</label>
              <input type="text" placeholder="XXXX XXXX XXXX" className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number *</label>
              <input type="text" placeholder="ABCDE1234F" className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>

            <button
              type="button"
              onClick={() => router.push('/sign-up/document-verification')} // change as needed
              className="w-full cursor-pointer py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition"
            >
              Continue
            </button>

            <button
              type="button"
              onClick={() => router.push('/sign-up/business-information')}
              className="block cursor-pointer text-sm text-center text-indigo-600 underline mx-auto"
            >
              ← Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
