"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import GenericForm, { FieldConfig } from "../GenericForm.tsx/GenericForm";

export default function BusinessInformationForm() {
     const router = useRouter();
      const [form, setForm] = useState({
         businessName: "",
         gstNumber: "",
         storeAddress: "",
         city: "",
         phoneNumber: "",
       });

 const fields: FieldConfig[] = [
    {
      name: "businessName",
      label: "Business Name",
      type: "text",
      required: true,
    },
     {
      name: "gstNumber",
      label: " GST Number",
      type: "text",
      required: true,
      colSpan: 2,
    }
    ,
     {
      name: "storeAddress",
      label: "Store Address",
      type: "text",
      required: true,
      colSpan: 2,
    },

 { name: "city", label: "City", type: "select", required: true, options: [
        { label: "Delhi", value: "delhi" },
        { label: "Mumbai", value: "mumbai" },
         { label: "Bangalore", value: "bangalore" },
      ]
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      type: "text",
      required: true,
      colSpan: 1,
    },
    
  ];

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form Submitted:", form);
    };




  return (
    <div className="min-h-screen flex items-center py-12 justify-center bg-gradient-to-br from-indigo-400 to-purple-600 px-4">
      <div className="w-full max-w-md rounded-2xl  shadow-xl">
        <div className="bg-white rounded-2xl px-6 py-8">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Business Information</h1>
            <p className="text-sm text-gray-500">Tell us about your store</p>
          </div>

          {/* Step Progress */}
          <div className="text-sm text-gray-500 text-center mb-2">Step 2 of 6</div>
          <div className="w-full h-1 bg-gray-200 rounded-full mb-6">
            <div className="h-full w-2/6 bg-purple-500 rounded-full"></div>
          </div>

          {/* Form */}

            <GenericForm
                  title="Add Discount"
                  fields={fields}
                  formData={form}
                  setFormData={setForm}
                  onSubmit={handleSubmit}
                  showBackButton
                  // onGenerateCode={handleGenerateCode}
                />
          {/* <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue=""
                placeholder="Enter GST Number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Address <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Select City</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                defaultValue=""
                placeholder="Enter Phone Number"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  <button
              type="button"
              onClick={() => router.push('/sign-up/owner-information')} // change as needed
              className="w-full cursor-pointer py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition"
            >
              Continue
            </button>
            <div className="text-center">
              <button
              onClick={() => router.push('/sign-up/business-type')}
                type="button"
                className="text-sm cursor-pointer text-indigo-500 underline hover:text-indigo-600"
              >
                ← Back
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
}
