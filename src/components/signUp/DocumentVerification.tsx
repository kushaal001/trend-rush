'use client';

import { useRouter } from 'next/navigation';

export default function DocumentVerification() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md border-t-4 border-gradient-to-r from-red-400 via-teal-400 to-sky-400">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">Document Verification</h2>
          <p className="text-sm text-center text-gray-500 mb-6">Upload required documents</p>

          {/* Step Indicator */}
          <div className="text-sm text-center text-gray-500 mb-2">Step 4 of 6</div>
          <div className="w-full bg-gray-200 h-1 rounded-full mb-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1 rounded-full w-[66%]"></div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm p-3 rounded mb-6">
            📄 Please upload clear, high-quality images of your documents. Accepted formats: JPG, PNG, PDF (Max 5MB each)
          </div>

          {/* File Upload Boxes */}
          {[
            { label: 'GST Certificate', id: 'gst' },
            { label: 'Store License/Registration', id: 'license' },
            { label: 'Aadhaar Card', id: 'aadhaar' },
            { label: 'PAN Card', id: 'pan' },
          ].map(({ label, id }) => (
            <div key={id} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-sm text-gray-600 mb-4 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition">
              <label htmlFor={id} className="block font-medium text-gray-700 mb-1">
                📎 Click to upload {label}
              </label>
              <span className="text-xs text-gray-500">or drag and drop file here</span>
              <input type="file" id={id} name={id} className="hidden" />
            </div>
          ))}

          {/* Continue Button */}
          <button
            type="button"
            onClick={() => router.push('/sign-up/phone-verification')}
            className="w-full py-3 cursor-pointer rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition mb-3"
          >
            Continue to Verification
          </button>

          {/* Back Link */}
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
