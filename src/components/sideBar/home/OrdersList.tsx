"use client";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  Package,
  Search,
  Truck,
  Undo2,
} from "lucide-react";
import React, { useState } from "react";

type Status = "confirmed" | "preparing" | "ready" | "delivered" | "returned";

type Order = {
  id: string;
  customer: string;
  items: number;
  amount: number;
  status: Status;
  time: string;
};

const icons: Record<Status, JSX.Element> = {
  confirmed: <CheckCircle className="w-4 h-4" />,
  preparing: <Clock className="w-4 h-4" />,
  ready: <Package className="w-4 h-4" />,
  delivered: <Truck className="w-4 h-4" />,
  returned: <Undo2 className="w-4 h-4" />,
};

const recentOrders: Order[] = [
  {
    id: "#TR2024001",
    customer: "Priya Sharma",
    items: 2,
    amount: 2499,
    status: "confirmed",
    time: "2 mins ago",
  },
  {
    id: "#TR2024002",
    customer: "Rahul Gupta",
    items: 1,
    amount: 899,
    status: "preparing",
    time: "15 mins ago",
  },
  {
    id: "#TR2024003",
    customer: "Sneha Patel",
    items: 3,
    amount: 3799,
    status: "ready",
    time: "32 mins ago",
  },
  {
    id: "#TR2024004",
    customer: "Arjun Kumar",
    items: 1,
    amount: 1299,
    status: "delivered",
    time: "1 hr ago",
  },
  {
    id: "#TR2024005",
    customer: "Meera Singh",
    items: 2,
    amount: 1899,
    status: "returned",
    time: "2 hrs ago",
  },
];

export default function OrdersList() {
  const [search, setSearch] = useState("");

  const getStatusIcon = (status: Status) =>
    icons[status] || <AlertCircle className="w-4 h-4" />;

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "ready":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-purple-100 text-purple-800";
      case "returned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = recentOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Order ID</th>
                <th className="text-left p-4 font-medium text-gray-600">Customer</th>
                <th className="text-left p-4 font-medium text-gray-600">Items</th>
                <th className="text-left p-4 font-medium text-gray-600">Amount</th>
                <th className="text-left p-4 font-medium text-gray-600">Status</th>
                <th className="text-left p-4 font-medium text-gray-600">Time</th>
                <th className="text-left p-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length ? (
                filteredOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-t hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-25"
                    }`}
                  >
                    <td className="p-4 font-medium text-blue-600">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.items} items</td>
                    <td className="p-4 font-medium">₹{order.amount}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{order.time}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-green-600 hover:bg-green-100 rounded">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
