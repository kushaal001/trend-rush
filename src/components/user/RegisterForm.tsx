"use client";

import React, { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    storeDetails: {
      storeName: "",
      storeType: "",
      storeAddress: "",
      storeCity: "",
      storeState: "",
      storePincode: "",
      storeCountry: "",
      storeContact: "",
      storeEmail: "",
      storeGSTIN: "",
      storeGSTINCertificate: "",
      storeRegisterDoc: "",
      storeContactOTPId: "",
      storeEmailOTPId: "",
    },
    retailerDetails: {
      retailerName: "",
      retailerType: "",
      retailerPhoneNum: "",
      retailerEmail: "",
      retailerAadhar: "",
      retailerPAN: "",
      retailerAadharDoc: "",
      retailerPANDoc: "",
      retailerPasswordHash: "",
      retailerContactOTPId: "",
      retailerEmailOTPId: "",
    },
  });

  const handleChange = (section: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof formData],
        [field]: value,
      },
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { data, errors, status }: any = await fetch("http://localhost:3000/retailer/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then(async (res) => {
      const json = await res.json();
      return res.ok ? { data: json } : { errors: json.errors, status: res.status };
    })
    .catch((err) => {
      return {
        errors: [{ field: "form", message: "Something went wrong" }],
        status: 500,
      };
    });

  if (data) {
    console.log("✅ Registration Successful", data);
    alert("Retailer registered successfully!");
    // Optionally reset form
    // setFormData(initialValues);
  } else if (errors && typeof errors === "object") {
    console.error("Validation errors:", errors);
    alert(errors[0]?.message || "Validation failed");
  } else if (status) {
    alert("Something went wrong. Please try again.");
  } else {
    console.error("Unexpected response format:", errors);
  }
};


  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-semibold">Store Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formData.storeDetails).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={value}
              onChange={(e) => handleChange("storeDetails", key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-10">Retailer Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(formData.retailerDetails).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              value={value}
              onChange={(e) => handleChange("retailerDetails", key, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
}
