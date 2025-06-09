"use client"
import React, { useState } from "react";

const mockOrders = [
  { id: 1, orderNo: "ORD001", customer: "John Doe", status: "Shipped", date: "2025-06-08T10:15:00" },
  { id: 2, orderNo: "ORD002", customer: "Alice Smith", status: "Pending", date: "2025-06-07T12:30:00" },
  { id: 3, orderNo: "ORD003", customer: "Bob Johnson", status: "Delivered", date: "2025-06-06T09:45:00" },
  { id: 4, orderNo: "ORD004", customer: "Emma Brown", status: "Pending", date: "2025-06-05T14:20:00" },
  { id: 5, orderNo: "ORD005", customer: "Liam Davis", status: "Shipped", date: "2025-06-04T16:00:00" },
  { id: 6, orderNo: "ORD006", customer: "Olivia Wilson", status: "Delivered", date: "2025-06-03T11:10:00" },
  { id: 7, orderNo: "ORD007", customer: "Noah Martinez", status: "Pending", date: "2025-06-02T08:25:00" },
  { id: 8, orderNo: "ORD008", customer: "Sophia Anderson", status: "Shipped", date: "2025-06-01T17:45:00" },
  { id: 9, orderNo: "ORD009", customer: "Mason Thomas", status: "Delivered", date: "2025-05-31T13:50:00" },
  { id: 10, orderNo: "ORD010", customer: "Isabella Taylor", status: "Shipped", date: "2025-05-30T10:05:00" },
  { id: 11, orderNo: "ORD011", customer: "James Moore", status: "Pending", date: "2025-05-29T15:30:00" },
  { id: 12, orderNo: "ORD012", customer: "Ava Jackson", status: "Shipped", date: "2025-05-28T09:00:00" },
  { id: 13, orderNo: "ORD013", customer: "Logan White", status: "Delivered", date: "2025-05-27T12:40:00" },
  { id: 14, orderNo: "ORD014", customer: "Mia Harris", status: "Pending", date: "2025-05-26T18:10:00" },
  { id: 15, orderNo: "ORD015", customer: "Lucas Martin", status: "Shipped", date: "2025-05-25T11:25:00" },
  { id: 16, orderNo: "ORD016", customer: "Charlotte Thompson", status: "Delivered", date: "2025-05-24T16:55:00" },
  { id: 17, orderNo: "ORD017", customer: "Benjamin Garcia", status: "Pending", date: "2025-05-23T13:35:00" },
  { id: 18, orderNo: "ORD018", customer: "Amelia Martinez", status: "Shipped", date: "2025-05-22T08:45:00" },
  { id: 19, orderNo: "ORD019", customer: "Elijah Robinson", status: "Delivered", date: "2025-05-21T14:05:00" },
  { id: 20, orderNo: "ORD020", customer: "Harper Clark", status: "Pending", date: "2025-05-20T17:20:00" },
];


export default function OrdersList() {
  const [search, setSearch] = useState("");

  const filteredOrders = mockOrders.filter((order) =>
    order.orderNo.toLowerCase().includes(search.toLowerCase()) ||
    order.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
      <h1 className="col-span-1 text-2xl font-bold text-gray-800 mb-4">Orders List</h1>
      <div className="col-span-2 mb-4">
        <input
          type="text"
          placeholder="Search by Order No or Customer..."
          className="w-full md:w-60 px-4 py-2 border text-xs rounded-sm shadow-sm focus:outline-none focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
</div>
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-left text-sm uppercase text-gray-700">
            <tr>
              <th className="p-3 border-b">Order No</th>
              <th className="p-3 border-b">Customer</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length ? (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{order.orderNo}</td>
                  <td className="p-3 border-b">{order.customer}</td>
                  <td className="p-3 border-b">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 border-b">{order.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}





// "use client";
// import React, { useState } from "react";

// const mockOrders = [
//   { id: 1, orderNo: "ORD001", customer: "John Doe", status: "Shipped", date: "2025-06-08" },
//   { id: 2, orderNo: "ORD002", customer: "Alice Smith", status: "Pending", date: "2025-06-07" },
//   { id: 3, orderNo: "ORD003", customer: "Bob Johnson", status: "Delivered", date: "2025-06-06" },
// ];

// export default function OrdersList() {
//   const [search, setSearch] = useState("");

//   const filteredOrders = mockOrders.filter((order) =>
//     order.orderNo.toLowerCase().includes(search.toLowerCase()) ||
//     order.customer.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">📦 Orders List</h1>

//         <div className="mb-6">
//           <input
//             type="text"
//             placeholder="🔍 Search by Order No or Customer..."
//             className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <table className="w-full table-auto border-collapse">
//             <thead className="bg-indigo-50 text-left text-sm text-indigo-700 uppercase tracking-wide">
//               <tr>
//                 <th className="px-6 py-3">Order No</th>
//                 <th className="px-6 py-3">Customer</th>
//                 <th className="px-6 py-3">Status</th>
//                 <th className="px-6 py-3">Date</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-700">
//               {filteredOrders.length ? (
//                 filteredOrders.map((order, i) => (
//                   <tr key={order.id} className="hover:bg-indigo-50 transition-all">
//                     <td className="px-6 py-4 border-t">{order.orderNo}</td>
//                     <td className="px-6 py-4 border-t">{order.customer}</td>
//                     <td className="px-6 py-4 border-t">
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           order.status === "Shipped"
//                             ? "bg-blue-100 text-blue-700"
//                             : order.status === "Pending"
//                             ? "bg-yellow-100 text-yellow-800"
//                             : "bg-green-100 text-green-700"
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 border-t">{order.date}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={4} className="px-6 py-6 text-center text-gray-500">
//                     🚫 No orders found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
