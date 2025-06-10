"use client";
import Link from "next/link";
import React, { useState } from "react";

const categories = [
  {
    name: "Formal Sneakers",
    url: "/kids-5/shoes/formal-sneakers",
    image: "https://via.placeholder.com/40x40?text=1",
    parent: "Shoes",
    products: 2,
  },
  {
    name: "Gems and Dresses",
    url: "/women-5/gems",
    image: "https://via.placeholder.com/40x40?text=2",
    parent: "Women",
    products: 27,
  },
  {
    name: "Kids",
    url: "/kids-5",
    image: "",
    parent: "-",
    products: 3,
  },
  {
    name: "Men",
    url: "/men-4",
    image: "",
    parent: "-",
    products: 1,
  },
  {
    name: "Shoes",
    url: "/kids-5/shoes",
    image: "https://via.placeholder.com/40x40?text=3",
    parent: "Kids",
    products: 3,
  },
  {
    name: "T-Shirts",
    url: "/men-4/t-shirts",
    image: "https://via.placeholder.com/40x40?text=4",
    parent: "Men",
    products: 1,
  },
  {
    name: "Women",
    url: "/women-5",
    image: "https://via.placeholder.com/40x40?text=5",
    parent: "-",
    products: 27,
  },
];

export default function CategoriesTable() {
    const [search, setSearch] = useState("");
  
    const filteredOrders = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="">
     <div className="flex justify-between w-full">
      <h1 className="col-span-1 text-2xl font-bold text-gray-800 mb-4">Categories List</h1>
      <div className="col-span-2 mb-4">
        <input
          type="text"
          placeholder="Search by Name..."
          className="w-full md:w-60 px-4 py-2 border text-xs rounded-sm shadow-sm focus:outline-none focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
              <Link
  href="/dashboard/catalog/categories/add"
  className="inline-block ml-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium text-sm px-4 py-1.5 rounded-md shadow-sm transition-colors duration-200"
>
  Add Category
</Link>
      </div>
</div>

      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="text-left px-4 py-3 border-b">Name</th>
              <th className="text-left px-4 py-3 border-b">URL</th>
              <th className="text-left px-4 py-3 border-b">Image</th>
              <th className="text-left px-4 py-3 border-b">Parent</th>
              <th className="text-left px-4 py-3 border-b">Products</th>
            </tr>
          </thead>
          <tbody>
           {filteredOrders.length ? (
              filteredOrders.map((cat, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 text-gray-800 font-medium">{cat.name}</td>
                <td className="px-4 py-3 text-gray-800">{cat.url}</td>
                <td className="px-4 py-3">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs border border-gray-300">
                      N/A
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-800">{cat.parent}</td>
                <td className="px-4 py-3 text-gray-800">{cat.products}</td>
              </tr>
             ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No Categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-4 text-sm text-gray-600">
        <p>
          1 - {categories.length} of {categories.length} items
        </p>
        <button className="ml-4 border rounded px-2 py-1 text-sm bg-white">1</button>
      </div>
    </div>
  );
}
