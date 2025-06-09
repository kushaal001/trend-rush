"use client"
import React from 'react';

const categories = [
  {
    name: 'Formal Sneakers',
    url: '/kids-5/shoes/formal-sneakers',
    image: 'https://via.placeholder.com/40x40?text=1',
    parent: 'Shoes',
    products: 2,
  },
  {
    name: 'Gems and Dresses',
    url: '/women-5/gems',
    image: 'https://via.placeholder.com/40x40?text=2',
    parent: 'Women',
    products: 27,
  },
  {
    name: 'Kids',
    url: '/kids-5',
    image: '',
    parent: '-',
    products: 3,
  },
  {
    name: 'Men',
    url: '/men-4',
    image: '',
    parent: '-',
    products: 1,
  },
  {
    name: 'Shoes',
    url: '/kids-5/shoes',
    image: 'https://via.placeholder.com/40x40?text=3',
    parent: 'Kids',
    products: 3,
  },
  {
    name: 'T-Shirts',
    url: '/men-4/t-shirts',
    image: 'https://via.placeholder.com/40x40?text=4',
    parent: 'Men',
    products: 1,
  },
  {
    name: 'Women',
    url: '/women-5',
    image: 'https://via.placeholder.com/40x40?text=5',
    parent: '-',
    products: 27,
  },
];

export default function CategoriesTable() {
  return (
    <div className="p-8">
           <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <div className="bg-white border rounded-md shadow overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">URL</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Parent</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Products</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 text-blue-600 font-medium">{cat.name}</td>
                <td className="px-6 py-4 text-gray-800">{cat.url}</td>
                <td className="px-6 py-4">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                      N/A
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-800">{cat.parent}</td>
                <td className="px-6 py-4 text-gray-800">{cat.products}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
