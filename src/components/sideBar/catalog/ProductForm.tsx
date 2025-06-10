"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    console.log("Submitted Product:", product);
    // Submit logic here
  };

  return (
    <div className=" mx-auto bg-white p-6 rounded shadow">
                 <h2 className="flex justify-between text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-4">

  <span>Add Product</span>
    <Link
    href="/dashboard/catalog/products"
    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded transition"
  >
    <ArrowLeft className="w-4 h-4 mr-1" />
    Back
  </Link>
</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
            placeholder="Enter product name"
            required
          />
        </div>
<div className="flex gap-4">
        <div className="w-1/2">
          <label className="block font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
            required
          >
            <option value="">Select category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

                <div className="w-1/2">
          <label className="block font-medium text-gray-700 mb-1">Collection</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
            required
          >
            <option value="">Select Collection</option>
            <option value="Men">Piant</option>
            <option value="Women">Shirt</option>
            <option value="Kids">T-Shirt</option>
          </select>
        </div>
</div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
              placeholder="e.g. 29.99"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring"
              placeholder="e.g. 10"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="rounded-sm border w-max p-2 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="w-max px-3 ml-auto bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
