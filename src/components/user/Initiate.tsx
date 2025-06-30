"use client";

import React, { useState } from "react";
import axios from "axios";
import GenericForm, { FieldConfig } from "../GenericForm.tsx/GenericForm";

export default function UserAuthInitiateForm() {
  const [code, setCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    type: "",
  });

  const fields: FieldConfig[] = [
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Enter Email",
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "Enter Phone Number",
      type: "number",
    },
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter Name",
    },
    {
      name: "type",
      label: "User Type",
      type: "select",
      required: true,
      placeholder: "Select Store Type",
      options: [
        { label: "Retailer", value: "Retailer" },
        { label: "Store", value: "Store" },
      ],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email && !formData.phone) {
      return alert("Either Email or Phone is required.");
    }

    try {
      const response = await axios.post("http://localhost:3000/user/auth/initiate", {
        email: formData.email || null,
        phone: formData.phone || null,
        name: formData.name || null,
        type: formData.type,
      });

      const res = response.data;
      alert(`✅ OTP sent to ${res.data.otpSentTo}`);
      setIsOtpSent(true); // hide form and show OTP field
    } catch (error: any) {
      const errRes = error.response?.data;
      if (errRes?.message) {
        alert(`❌ ${errRes.message}`);
      } else {
        alert("❌ Something went wrong");
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/auth/verify", {
        ...formData,
        email: formData.email || null,
        phone: formData.phone || null,
        name: formData.name || null,
        code: code,
        type: formData.type,
      });

      const res = response.data;
      alert(`✅ Verified! Welcome, ${formData.name || "User"}`);
    } catch (error: any) {
      const errRes = error.response?.data;
      if (errRes?.message) {
        alert(`❌ ${errRes.message}`);
      } else {
        alert("❌ Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">User Authentication</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isOtpSent ? "Enter the OTP you received to verify" : "Enter Email or Phone to receive an OTP"}
          </p>
        </div>

        {!isOtpSent ? (
          <GenericForm
            title=""
            fields={fields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            showBackButton
          />
        ) : (
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
        )}
      </div>
    </div>
  );
}
