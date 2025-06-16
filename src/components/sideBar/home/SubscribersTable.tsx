"use client"
import React, { useState } from 'react';
import { Filter, Pencil, Search, Trash2 } from 'lucide-react';



const subscribers = [
  {
    name: 'kushaal',
    email: 'nanimudhiraj001@gmail.com',
    phone: '+91-9573270071',
    subscribed: false,
    date: 'July 18, 2024 2:39 PM',
  },
  {
    name: 'kushaal',
    email: 'kushaal@wmltech.com',
    phone: '+91-9573270071',
    subscribed: false,
    date: 'June 20, 2024 12:38 PM',
  },
  {
    name: 'kushaal',
    email: 'kushaal_nani@wmltech.com',
    phone: '+91-9573270071',
    subscribed: false,
    date: 'May 28, 2024 4:05 PM',
  },
  {
    name: 'ksuhaal 10',
    email: 'ksuhaal10@wmltech.com',
    phone: '6303806951',
    subscribed: true,
    date: 'January 18, 2024 5:47 PM',
  },
  {
    name: 'kushaal',
    email: 'kushaal1@wmltech.com',
    phone: '+91-9573270071',
    subscribed: false,
    date: 'January 18, 2024 2:06 PM',
  },
  {
    name: 'hiii',
    email: 'divya@gmail.com',
    phone: '+91-8712104232',
    subscribed: false,
    date: 'December 27, 2023 6:57 AM',
  },
  {
    name: 'Rahul test',
    email: 'rahultest@wmltech.com',
    phone: '+91-7981762274',
    subscribed: false,
    date: 'December 26, 2023 5:30 PM',
  },
];

export default function SubscribersTable() {
 const [search, setSearch] = useState("");

  const filteredOrders = subscribers.filter((sub) =>
    sub.name.toLowerCase().includes(search.toLowerCase()) ||
    sub.email.toLowerCase().includes(search.toLowerCase()) || 
    sub.phone.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left font-semibold">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Subscribed</th>
              <th className="px-4 py-3">Subscribed Date</th>
              {/* <th className="px-4 py-3">Actions</th> */}
            </tr>
          </thead>
          <tbody>
             {filteredOrders.length ? (
              filteredOrders.map((s, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? '' : 'bg-gray-50'}>
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.phone}</td>
                <td className="px-4 py-2">
                  <span className={`px-3 py-1 rounded text-white text-sm font-semibold ${s.subscribed ? 'bg-green-500' : 'bg-red-500'}`}>
                    {s.subscribed ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-2">{s.date}</td>
                {/* <td className="px-4 py-2 flex gap-2">
                  <button className="p-2 text-blue-600 border border-blue-400 rounded hover:bg-blue-50">
                    <Pencil size={16} />
                  </button>
                  <button className="p-2 text-red-600 border border-red-400 rounded hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </td> */}
              </tr>
             ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No Subscribers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
