"use client"
import React from 'react';

const variants = [
  { name: 'Colors', options: ['Blue', 'Green', 'Red', 'Yellow'] },
  { name: 'Material', options: ['Cotton', 'Nylon', 'Silk'] },
  { name: 'dbewfhb', options: ['A', 'B', 'C'] },
  { name: 'size', options: ['10', '20', '30', 'custom'] },
];

export default function VariantsTable() {
  return (
    <div className="p-8">
           <h1 className="text-3xl font-bold mb-6">Variants</h1>
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
            {variants.map((variant, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 text-blue-600 font-medium">{variant.name}</td>
                <td className="px-6 py-4 text-gray-800">{variant.options.join(', ')}</td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 border border-blue-500 px-3 py-1 rounded hover:bg-blue-50 transition">
                    Manage Option
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
