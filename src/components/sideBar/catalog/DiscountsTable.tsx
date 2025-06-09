"use client"
import React, { useState } from 'react';

const discounts = [
  {
    code: 'FLAT50',
    type: 'Amount',
    value: 50,
    used: 12,
    limit: 100,
    status: 'Active',
    startDate: '2024-06-01',
    endDate: '2024-07-01',
    createdBy: 'Admin',
  },
  {
    code: 'SAVE20',
    type: 'Percentage',
    value: 20,
    used: 50,
    limit: 200,
    status: 'Expired',
    startDate: '2024-05-01',
    endDate: '2024-06-01',
    createdBy: 'Marketing',
  },
];

const getStatusBadge = (status: string) => {
  const statusStyles: Record<string, string> = {
    Active: 'bg-green-500',
    Expired: 'bg-gray-500',
    Upcoming: 'bg-yellow-400',
  };

  return (
    <span
      className={`px-3 py-1 rounded text-white text-sm ${statusStyles[status] || 'bg-gray-300'}`}
    >
      {status}
    </span>
  );
};

export default function DiscountsTable() {
    const [search, setSearch] = useState("");

  const filteredOrders = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(search.toLowerCase()) ||
    discount.status.toLowerCase().includes(search.toLowerCase()) ||
    discount.type.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="w-full">
     <div className="flex justify-between w-full">
      <h1 className="col-span-1 text-2xl font-bold text-gray-800 mb-4">Discounts List</h1>
      <div className="col-span-2 mb-4">
        <input
          type="text"
          placeholder="Search by Code or Status..."
          className="w-full md:w-60 px-4 py-2 border text-xs rounded-sm shadow-sm focus:outline-none focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
</div>   <div className="bg-white border rounded-md shadow overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-sm font-semibold text-left text-gray-700">
            <tr>
              <th className="px-4 py-3">Discount Code</th>
              <th className="px-4 py-3">Discount Type</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Used</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">End Date</th>
              <th className="px-4 py-3">Created By</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
               {filteredOrders.length ? (
              filteredOrders.map((d, index) => (
              <tr key={index} className="border-t text-sm text-gray-800">
                <td className="px-4 py-3 text-blue-600 font-medium hover:underline cursor-pointer">{d.code}</td>
                <td className="px-4 py-3">{d.type}</td>
                <td className="px-4 py-3">{d.value}</td>
                <td className="px-4 py-3">{d.used}/{d.limit}</td>
                <td className="px-4 py-3">{d.startDate}</td>
                <td className="px-4 py-3">{d.endDate}</td>
                <td className="px-4 py-3">{d.createdBy}</td>
                <td className="px-4 py-3">{getStatusBadge(d.status)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-50">Edit</button>
                    <button className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-50">Delete</button>
                  </div>
                </td>
              </tr>
        ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No Discount Codes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
