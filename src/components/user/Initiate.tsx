"use client";

import React, { useState } from "react";
import axios from "axios";
import GenericForm, { FieldConfig } from "../GenericForm.tsx/GenericForm";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function UserAuthInitiateForm() {
  const [code, setCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitLoader, setSubmitLoader] = useState<Boolean>(false);
const router = useRouter();
const [formData, setFormData] = useState({
  contact: "", // <-- unified field
  name: "",
  type: "",
});

const storeOptions = [
  { label: "Retailer", value: "Retailer" },
  { label: "Store", value: "Store" },
];

const fields: FieldConfig[] = [
  {
    name: "contact",
    label: "Email or Phone",
    type: "text",
    required:true,
    placeholder: "Enter your email or phone",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    isText: true,
  },
  {
    name: "type",
    label: "Store Type",
    type: "select",
    required: true,
    placeholder: "Select store type",
    options: storeOptions,
  },
];


async function handleSubmit(e: React.FormEvent) {
  setSubmitLoader(true);
  e.preventDefault();
  setFieldErrors({});

  if (!formData.contact) {
    setFieldErrors({ contact: "Email or Phone is required" });
    return;
  }

  const isPhone = /^\+?[0-9]{10,15}$/.test(formData.contact);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact);

  const payload = {
    email: isEmail ? formData.contact : null,
    phone: isPhone ? formData.contact : null,
    name: formData.name || null,
    type: formData.type,
  };

  const { data, errors, status } :any= await axios
    .post("http://localhost:3000/user/auth/initiate", payload)
    .then((res) => ({ data: res.data }))
    .catch((err) => ({
      errors: err.response?.data?.errors,
      status: err.response?.status,
    }));

  if (data) {
    setSubmitLoader(false)
    toast.success(`OTP sent to ${data.data.otpSentTo}`);
    setIsOtpSent(true);
  } else if (errors && typeof errors === "object") {
    const newErrors: Record<string, string> = {};
    errors.forEach((err: { field: string; message: string }) => {
      newErrors[err.field] = err.message;
    });
    setFieldErrors(newErrors);
  } else if (status) {
    toast.error("Something went wrong");
  } else {
    console.error("Unexpected errors format:", errors);
  }
}


async function handleVerify(e: React.FormEvent) {
  setSubmitLoader(true)
  e.preventDefault();

  const isPhone = /^\+?[0-9]{10,15}$/.test(formData.contact);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact);

  const payload = {
    email: isEmail ? formData.contact : null,
    phone: isPhone ? formData.contact : null,
    name: formData.name || null,
    type: formData.type,
    code,
  };

  const { data, errors, status }:any = await axios
    .post("http://localhost:3000/user/auth/verify", payload)
    .then((res) => ({ data: res.data }))
    .catch((err) => ({
      errors: err.response?.data?.errors,
      status: err.response?.status,
    }));

  if (data) {
    setSubmitLoader(false)
    router.push("/user/register")
    toast.success(`Verified! Welcome, ${formData.name || "User"}`);
  } else if (errors && typeof errors === "object") {
    const newErrors: Record<string, string> = {};
    errors.forEach((err: { field: string; message: string }) => {
      newErrors[err.field] = err.message;
    });
    setFieldErrors(newErrors);
  } else if (status) {
    toast.error("Verification failed");
  } else {
    console.error("Unexpected errors format:", errors);
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7F00FF] to-[#E100FF] px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800">TrendRush</h1>
        </div>

        {!isOtpSent ? (
          <GenericForm
            title=""
            fields={fields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            showBackButton={false}
            gridCols={1}
            showSaveButton={true}
            showCancelButton={false}
            errors={fieldErrors} // ✅ pass to GenericForm
          />
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6-digit OTP"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >{submitLoader ? <Loader2 className="anmate-spin h-5 w-5"/> :
              'Verify OTP' }
            </button>
          </form>
        )}

        {!isOtpSent && (
          <>
            <button onClick={() =>router.push("/login")} className="w-full cursor-pointer border border-gray-300 mt-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition">
              Already a user SignIn
            </button>
            <div className="text-center mt-3">
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Forgot Password?
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
