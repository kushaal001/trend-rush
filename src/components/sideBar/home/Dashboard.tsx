"use client";

import React, { JSX } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  Truck,
  Undo2,
  DollarSign,
  TrendingUp,
  ShoppingBag,
  Zap,
  Star,
  Users,
} from "lucide-react";

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

const getStatusIcon = (status: Status) => icons[status] || <AlertCircle className="w-4 h-4" />;

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

export default function Dashboard() {
  const salesData = [
    { name: "Mon", sales: 4200 },
    { name: "Tue", sales: 3800 },
    { name: "Wed", sales: 5200 },
    { name: "Thu", sales: 4800 },
    { name: "Fri", sales: 6200 },
    { name: "Sat", sales: 7800 },
    { name: "Sun", sales: 5600 },
  ];

  const categoryData = [
    { name: "Casual Wear", value: 35, color: "#FF6B6B" },
    { name: "Formal Wear", value: 25, color: "#4ECDC4" },
    { name: "Accessories", value: 20, color: "#45B7D1" },
    { name: "Footwear", value: 20, color: "#FFA07A" },
  ];

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

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Today's Sales</p>
              <p className="text-2xl font-bold">₹12,450</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-200" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">+12% from yesterday</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Orders</p>
              <p className="text-2xl font-bold">28</p>
            </div>
            <ShoppingBag className="w-8 h-8 text-blue-200" />
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">5 pending pickup</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Avg Delivery</p>
              <p className="text-2xl font-bold">2.4hrs</p>
            </div>
            <Clock className="w-8 h-8 text-green-200" />
          </div>
          <div className="flex items-center mt-2">
            <Zap className="w-4 h-4 mr-1" />
            <span className="text-sm">15min faster</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Rating</p>
              <p className="text-2xl font-bold">4.8</p>
            </div>
            <Star className="w-8 h-8 text-orange-200" />
          </div>
          <div className="flex items-center mt-2">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">156 reviews</span>
          </div>
        </div>
      </div>

      {/* Sales Chart + Category Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Category Split</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {recentOrders.slice(0, 4).map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{order.amount}</p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-gray-500">{order.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
