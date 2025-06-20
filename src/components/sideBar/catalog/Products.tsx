"use client";
import Link from "next/link";
import React, { useState } from "react";

const mockProducts = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    category: "Men",
    price: "$20.00",
    stock: 15,
  },
  {
    id: 2,
    name: "Summer Dress",
    category: "Women",
    price: "$35.00",
    stock: 8,
  },
  {
    id: 3,
    name: "Kids Sneakers",
    category: "Kids",
    price: "$30.00",
    stock: 10,
  },
  {
    id: 4,
    name: "Casual Jacket",
    category: "Men",
    price: "$45.00",
    stock: 5,
  },
  {
    id: 5,
    name: "Stylish Handbag",
    category: "Women",
    price: "$55.00",
    stock: 12,
  },
  {
    id: 6,
    name: "Graphic Tee",
    category: "Kids",
    price: "$22.00",
    stock: 20,
  },
];

export default function ProductsTable() {
  const [search, setSearch] = useState("");

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="">
      <div className="flex justify-between w-full">
      <h1 className="col-span-1 text-2xl font-bold text-gray-800 mb-4">Products List</h1>
      <div className="col-span-2 mb-4">
        <input
          type="text"
          placeholder="Search by Name..."
          className="w-full md:w-60 px-4 py-2 border text-xs rounded-sm shadow-sm focus:outline-none focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
       <Link
  href="/dashboard/catalog/products/add"
  className="inline-block ml-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium text-sm px-4 py-1.5 rounded-md shadow-sm transition-colors duration-200"
>
  Add Product
</Link>

      </div>
</div>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-3 border-b">#</th>
              <th className="p-3 border-b text-left">Name</th>
              <th className="p-3 border-b text-left">Category</th>
              <th className="p-3 border-b text-left">Price</th>
              <th className="p-3 border-b text-left">Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">{product.name}</td>
                  <td className="p-3 border-b">{product.category}</td>
                  <td className="p-3 border-b text-indigo-600 font-medium">{product.price}</td>
                  <td className="p-3 border-b">{product.stock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
