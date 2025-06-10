"use client"
import React, { useState } from 'react';

const reviews = [
  {
    user: 'Kushaal',
    email: 'nanimudhiraj001@gmail.com',
    product: 'Dress1',
    rating: 5,
    title: 'Kushaal Review',
    comment: '',
    date: 'February 12, 2025 2:49 PM',
    images: [],
  },
  {
    user: 'Rahul',
    email: 'rahultest3@wmltech.com',
    product: 'Gems',
    rating: 5,
    title: 'Nice product',
    comment: 'nice',
    date: 'January 19, 2024 5:30 PM',
    images: [
      'https://via.placeholder.com/40x40?text=1',
      'https://via.placeholder.com/40x40?text=2',
      'https://via.placeholder.com/40x40?text=3',
      'https://via.placeholder.com/40x40?text=4',
    ],
  },
  {
    user: 'Rahul',
    email: 'rahultest3@wmltech.com',
    product: 'Gems',
    rating: 3,
    title: 'Nice',
    comment: '',
    date: 'January 19, 2024 3:13 PM',
    images: ['https://via.placeholder.com/40x40?text=5'],
  },
];

const getStars = (count: number) =>
  [...Array(5)].map((_, i) => (
    <span key={i}>{i < count ? '⭐' : '☆'}</span>
  ));

export default function ReviewsTable() {
    const [search, setSearch] = useState("");

  const filteredOrders = reviews.filter((review) =>
    review.user.toLowerCase().includes(search.toLowerCase()) ||
    review.email.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="">
     <div className="flex justify-between w-full">
      <h1 className="col-span-1 text-2xl font-bold text-gray-800 mb-4">Reviews List</h1>
      <div className="col-span-2 mb-4">
        <input
          type="text"
          placeholder="Search by User Name 0r Email..."
          className="w-full md:w-60 px-4 py-2 border text-xs rounded-sm shadow-sm focus:outline-none focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
</div>   <div className="bg-white border rounded-md shadow overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Review</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Images</th>
            </tr>
          </thead>
          <tbody>
              {filteredOrders.length ? (
              filteredOrders.map((review, idx) => (
              <tr key={idx} className="border-b">
                {/* User Info */}
                <td className="px-6 py-4 align-top">
                  <p className="font-bold text-black">{review.user}</p>
                  <p className="text-sm text-gray-600">{review.email}</p>
                </td>

                {/* Review Content */}
                <td className="px-6 py-4 align-top">
                  <p>
                    Product:{" "}
                    <a href="#" className="text-blue-600 font-semibold hover:underline">
                      {review.product}
                    </a>
                  </p>
                  <p className="text-yellow-500">{getStars(review.rating)} <b className="text-black">{review.title}</b></p>
                  <p className="text-gray-700">Reviewed on {review.date}</p>
                  {review.comment && <p className="mt-1 text-black">{review.comment}</p>}

                  <div className="flex gap-2 mt-3">
                    <button className="border border-green-500 text-green-600 px-3 py-1 rounded hover:bg-green-50">Unpublish</button>
                    <button className="border border-blue-500 text-blue-600 px-3 py-1 rounded hover:bg-blue-50">Edit</button>
                    <button className="border border-red-500 text-red-600 px-3 py-1 rounded hover:bg-red-50">Delete</button>
                  </div>
                </td>

                {/* Images */}
                <td className="px-6 py-4 align-top">
                  <div className="flex flex-wrap gap-2">
                    {review.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="review"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ))}
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-500 rounded">
                      +
                    </div>
                  </div>
                </td>
              </tr>
       ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No Reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
