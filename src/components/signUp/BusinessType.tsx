"use client"
import { useState } from "react";
import { Store, Shirt, Sparkles, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BusinessType() {
  const [selected, setSelected] = useState("multi");
 const router = useRouter();
  const options = [
    {
      id: "brand",
      title: "Brand Outlet",
      subtitle: "Zara, H&M, Westside, etc.",
      icon: <Store className="text-pink-500 w-5 h-5" />,
    },
    {
      id: "local",
      title: "Local Boutique",
      subtitle: "Independent fashion store",
      icon: <Shirt className="text-blue-500 w-5 h-5" />,
    },
    {
      id: "designer",
      title: "Designer Store",
      subtitle: "Premium fashion outlet",
      icon: <Sparkles className="text-amber-500 w-5 h-5" />,
    },
    {
      id: "multi",
      title: "Multi-Brand Store",
      subtitle: "Multiple fashion brands",
      icon: <Building2 className="text-indigo-500 w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-600 px-4">
      <div className="w-full max-w-md rounded-2xl  shadow-xl">
        <div className="bg-white rounded-2xl px-6 py-8">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">TrendRush</h1>
            <p className="text-sm text-gray-500">Choose Your Business Type</p>
          </div>

          {/* Step Progress */}
          <div className="text-sm text-gray-500 text-center mb-2">Step 1 of 6</div>
          <div className="w-full h-1 bg-gray-200 rounded-full mb-4">
            <div className="h-full w-1/6 bg-purple-500 rounded-full"></div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className={`p-7 rounded-xl border-2 cursor-pointer transition ${
                  selected === opt.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {opt.icon}
                  <h3 className="text-sm font-semibold text-gray-800">
                    {opt.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-500">{opt.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
    <button
      onClick={() => router.push('/sign-up/business-information')}
      className="w-full cursor-pointer py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition mb-3"
    >
      Continue
    </button>
          <div className="text-center">
            <a href="/" className="text-sm text-indigo-500 underline hover:text-indigo-600">
              ← Back
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
