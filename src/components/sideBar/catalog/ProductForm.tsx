"use client";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Select from "react-select/base";
import ReactSelect from "react-select";

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

  const variantList = {
  Colors: ["Blue", "Green", "Red", "Yellow"],
  Material: ["Cotton", "Nylon", "Silk"],
  Sizes: ["22 Inches", "32 Inches"],
};

const variantOptions = Object.keys(variantList).map((key) => ({
  label: key,
  value: key,
}));
const [variants, setVariants] = useState([
    { name: "", options: [] as string[] },
  ]);

  const handleVariantChange = (index: number, selected: any) => {
    const updated = [...variants];
    updated[index].name = selected.value;
    updated[index].options = [];
    setVariants(updated);
  };

  const handleOptionsChange = (index: number, selected: any) => {
    const updated = [...variants];
    updated[index].options = selected.map((s: any) => s.value);
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", options: [] }]);
  };

  const removeVariant = (index: number) => {
    const updated = variants.filter((_, i) => i !== index);
    setVariants(updated);
  };

  const saveVariant = (index: number) => {
    console.log("Saved Variant:", variants[index]);
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
<div className="space-y-4">
      {variants.map((variant, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 border rounded-md"
        >
          <div className="w-1/4">
            <label className="block mb-1 font-semibold text-sm">
              Selected Variant
            </label>
          <ReactSelect
  options={variantOptions}
  value={
    variant.name
      ? { label: variant.name, value: variant.name }
      : null
  }
  onChange={(val) => handleVariantChange(index, val)}
/>

          </div>

          <div className="w-1/2">
            <label className="block mb-1 font-semibold text-sm">Options</label>
            <ReactSelect
              isMulti
              isDisabled={!variant.name}
              options={
                variant.name
                  ? variantList[variant.name].map((opt:any) => ({
                      label: opt,
                      value: opt,
                    }))
                  : []
              }
              value={variant.options.map((opt) => ({
                label: opt,
                value: opt,
              }))}
              onChange={(val) => handleOptionsChange(index, val)}
              placeholder="Select options"
            />
          </div>

          <div className="flex items-center gap-2 mt-6">
            <button
              type="button"
              onClick={() => saveVariant(index)}
              className="border px-3 py-2 rounded text-gray-700 hover:bg-gray-100"
            >
              <Save size={16} />
            </button>
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="border px-3 py-2 rounded text-red-600 border-red-500 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
      >
        + Add Variant
      </button>
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
