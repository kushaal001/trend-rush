import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

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
  return (
    <div className="p-6">
           <h1 className="text-3xl font-bold mb-6">Subscribers</h1>
      <div className="bg-white border rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left font-semibold">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Subscribed</th>
              <th className="px-4 py-3">Subscribed Date</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s, idx) => (
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
                <td className="px-4 py-2 flex gap-2">
                  <button className="p-2 text-blue-600 border border-blue-400 rounded hover:bg-blue-50">
                    <Pencil size={16} />
                  </button>
                  <button className="p-2 text-red-600 border border-red-400 rounded hover:bg-red-50">
                    <Trash2 size={16} />
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
