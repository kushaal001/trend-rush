"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const variants = [
  { name: 'Colors', options: ['Blue', 'Green', 'Red', 'Yellow'] },
  { name: 'Material', options: ['Cotton', 'Nylon', 'Silk'] },
  { name: 'dbewfhb', options: ['A', 'B', 'C'] },
  { name: 'size', options: ['10', '20', '30', 'custom'] },
];

export default function VariantsTable() {
   const [search, setSearch] = useState("");

     const filteredOrders = variants.filter((variant) =>
    variant.name.toLowerCase().includes(search.toLowerCase()) 
  );

  return (
    <div className="w-full">
            <div className="flex justify-between w-full">
      <h1 className="col-span-1 text-2xl font-bold text-gray-800 mb-4">Variants List</h1>
      <div className="col-span-2 mb-4">
        <input
          type="text"
          placeholder="Search by Name..."
          className="w-full md:w-60 px-4 py-2 border text-xs rounded-sm shadow-sm focus:outline-none focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
              <Link
  href="/dashboard/catalog/variants/add"
  className="inline-block ml-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium text-sm px-4 py-1.5 rounded-md shadow-sm transition-colors duration-200"
>
  Add Variant
</Link>
      </div>
</div>
      <div className="bg-white shadow border rounded-md overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Options</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredOrders.length ? (
              filteredOrders.map((variant, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 text-gray-800 font-medium">{variant.name}</td>
                <td className="px-6 py-4 text-gray-800">{variant.options.join(', ')}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 border border-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition">
                    Manage Option
                  </button>
                </td>
              </tr>
           ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No Variants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
