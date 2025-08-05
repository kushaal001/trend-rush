"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterForm() {
  
const router = useRouter();
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

  const handleChange = (section: string, field: string, value: string | File) => {
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

  const form = new FormData();

  Object.entries(formData.storeDetails).forEach(([key, value]) => {
    form.append(`storeDetails.${key}`, value as Blob | string);
  });
  Object.entries(formData.retailerDetails).forEach(([key, value]) => {
    form.append(`retailerDetails.${key}`, value as Blob | string);
  });

  try {
    const res = await fetch("http://localhost:3000/retailer/signup", {
      method: "POST",
      body: form,
    });

    const json = await res.json();

    if (res.ok) {
      alert("Retailer registered successfully!");
      router.push("/dashboard");
    } else {
      alert(json.errors?.[0]?.message || "Validation failed");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
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
    {["storeRegisterDoc", "storeGSTINCertificate"].includes(key) ? (
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) =>
          handleChange("storeDetails", key, e.target.files?.[0] || "")
        }
        className="w-full"
      />
    ) : (
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        value={value as string}
        onChange={(e) => handleChange("storeDetails", key, e.target.value)}
      />
    )}
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
    {["retailerPANDoc", "retailerAadharDoc"].includes(key) ? (
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) =>
          handleChange("retailerDetails", key, e.target.files?.[0] || "")
        }
        className="w-full"
      />
    ) : (
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        value={value as string}
        onChange={(e) => handleChange("retailerDetails", key, e.target.value)}
      />
    )}
  </div>
))}

      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Register
      </button>
    </form>
  );
}
