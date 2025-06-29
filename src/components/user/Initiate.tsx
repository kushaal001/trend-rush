"use client";

import React, { useState } from "react";
import axios from "axios";
import GenericForm, { FieldConfig } from "../GenericForm.tsx/GenericForm";

export default function UserAuthInitiateForm() {
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
      placeholder:"Enter Email",
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder:"Enter Phone Number",
      type: "number",
    },
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder:"Enter Name",
    },
    {
      name: "type",
      label: "User Type",
      type: "select",
      required: true,
      placeholder:"Select Store Type",
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
            Enter either Email or Phone to initiate OTP authentication
          </p>
        </div>

        <GenericForm
          title=""
          fields={fields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          showBackButton
        />
      </div>
    </div>
  );
}
