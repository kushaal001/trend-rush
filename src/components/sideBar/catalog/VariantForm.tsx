"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function VariantForm() {
  const [product, setProduct] = useState({
    name: "",
    url: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProduct({ ...product, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Brand:", product);
  };

  return (
    <div className="min-h-screen">
      <div className=" mx-auto bg-white p-8 rounded shadow-sm">
           <h2 className="flex justify-between text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-4">

  <span>Add Variant</span>
    <Link
    href="/dashboard/catalog/variants"
    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition"
  >
    <ArrowLeft className="w-4 h-4 mr-1" />
    Back
  </Link>
</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
              placeholder="Name"
              required
            />
          </div>

          {/* URL Field */}
          {/* <div>
            <label className="block text-gray-700 font-semibold mb-1">
              URL <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="flex w-[100px] inline-flex items-center px-3 bg-gray-200 border border-r-0 text-gray-600 rounded-l">
                /brand/
              </span>
              <input
                type="text"
                name="url"
                value={product.url}
                onChange={handleChange}
                className="w-full border rounded-r px-4 py-2 focus:outline-none focus:ring"
                placeholder="URL"
                required
              />
            </div>
          </div> */}

          {/* Logo Upload */}
          {/* <div>
            <label className="block text-gray-700 font-semibold mb-2">Logo</label>
            <div className="flex gap-4 items-center">
              <label className="w-36 h-14 bg-gray-200 text-center text-sm text-gray-600 flex items-center justify-center rounded cursor-pointer">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <div className="w-32 h-14 bg-gray-100 border flex items-center justify-center text-gray-400 text-xs rounded">
                No Image Available
              </div>
            </div>
          </div> */}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
