"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const brands = [
  { id: 1, name: 'Nike', slug:'nike', logo: 'https://logo.clearbit.com/nike.com' },
  { id: 2, name: 'Adidas', slug:'nike', logo: 'https://logo.clearbit.com/adidas.com' },
  { id: 3, name: 'Zudio', slug:'zudio', logo: 'https://logo.clearbit.com/apple.com' },
  { id: 4, name: 'H&M', slug:'h&m', logo: 'https://logo.clearbit.com/samsung.com' },
  { id: 5, name: 'Trends', slug:'trends', logo: 'https://logo.clearbit.com/sony.com' },
];

export default function BrandsTable() {
   const [search, setSearch] = useState("");
  const filteredOrders = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="w-full">
            <div className="flex justify-between w-full">
      <h1 className="col-span-1 text-2xl font-bold text-gray-800 mb-4">Brands List</h1>
      <div className="col-span-2 mb-4">
        <input
          type="text"
          placeholder="Search by Brand Name..."
          className="w-full md:w-60 px-4 py-2 border text-xs rounded-sm shadow-sm focus:outline-none focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />      <Link
  href="/dashboard/catalog/brands/add"
  className="inline-block ml-3 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium text-sm px-4 py-1.5 rounded-md shadow-sm transition-colors duration-200"
>
  Add Brand
</Link>
      </div>
</div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Brand Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Slug</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Logo</th>
            </tr>
          </thead>
          <tbody>
           {filteredOrders.length ? (
              filteredOrders.map((brand) => (
              <tr key={brand.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 text-md">{brand.name}</td>
                <td className="px-6 py-4 text-gray-800 text-md">{brand.slug}</td>
                <td className="px-6 py-4">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                </td>
              </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No Brands found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
