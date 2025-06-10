"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function CategoryForm() {
  const [product, setProduct] = useState({
    name: "",
    url: "",
    category: "",
    active: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } :any= e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Category:", product);
  };

  return (
    <div className="">
      <div className=" mx-auto bg-white rounded shadow-sm p-6">
        <h2 className="flex justify-between text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-4">

  <span>Add Category</span>
    <Link
    href="/dashboard/catalog/categories"
    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition"
  >
    <ArrowLeft className="w-4 h-4 mr-1" />
    Back
  </Link>
</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Category Name"
              className="w-full border rounded px-4 py-2 bg-white focus:outline-none focus:ring"
              required
            />
          </div>

          {/* Parent Category */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Parent Category
            </label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 bg-white focus:outline-none focus:ring"
            >
              <option value="">Select Parent Category</option>
              <option value="Paint">Paint</option>
              <option value="Shirt">Shirt</option>
              <option value="TShirt">T-Shirt</option>
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">URL</label>
            <input
              type="text"
              name="url"
              value={product.url}
              onChange={handleChange}
              placeholder="URL"
              className="w-full border rounded px-4 py-2 bg-white focus:outline-none focus:ring"
            />
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={product.active}
              onChange={handleChange}
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="active" className="text-gray-700 font-medium">
              Active
            </label>
          </div>

          {/* Buttons */}
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
