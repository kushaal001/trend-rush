"use client"
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { 
  Package, ShoppingBag, TrendingUp, Clock, Users, 
  Plus, Edit3, Eye, Settings, Bell, Search,
  Calendar, MapPin, Star, DollarSign, Truck,
  CheckCircle, AlertCircle, XCircle, Camera,
  Filter, Download, RefreshCw, Zap,
  CheckCircle2,
  ChefHat,
  Undo2
} from 'lucide-react';

const TrendRush = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [inventoryFilter, setInventoryFilter] = useState('all');

  // Mock data
  const salesData = [
    { name: 'Mon', sales: 4200, orders: 24 },
    { name: 'Tue', sales: 3800, orders: 18 },
    { name: 'Wed', sales: 5200, orders: 32 },
    { name: 'Thu', sales: 4800, orders: 28 },
    { name: 'Fri', sales: 6200, orders: 38 },
    { name: 'Sat', sales: 7800, orders: 45 },
    { name: 'Sun', sales: 5600, orders: 35 }
  ];

  const categoryData = [
    { name: 'Casual Wear', value: 35, color: '#FF6B6B' },
    { name: 'Formal Wear', value: 25, color: '#4ECDC4' },
    { name: 'Accessories', value: 20, color: '#45B7D1' },
    { name: 'Footwear', value: 20, color: '#FFA07A' }
  ];

  const recentOrders = [
    { id: '#TR2024001', customer: 'Priya Sharma', items: 2, amount: 2499, status: 'confirmed', time: '2 mins ago' },
    { id: '#TR2024002', customer: 'Rahul Gupta', items: 1, amount: 899, status: 'preparing', time: '15 mins ago' },
    { id: '#TR2024003', customer: 'Sneha Patel', items: 3, amount: 3799, status: 'ready', time: '32 mins ago' },
    { id: '#TR2024004', customer: 'Arjun Kumar', items: 1, amount: 1299, status: 'delivered', time: '1 hr ago' },
    { id: '#TR2024005', customer: 'Meera Singh', items: 2, amount: 1899, status: 'returned', time: '2 hrs ago' }
  ];

  const inventory = [
    { id: 1, name: 'Casual Denim Jacket', category: 'Casual', stock: 12, price: 1899, image: '👕', trending: true },
    { id: 2, name: 'Formal Black Blazer', category: 'Formal', stock: 8, price: 3499, image: '🧥', trending: false },
    { id: 3, name: 'Summer Floral Dress', category: 'Casual', stock: 5, price: 1299, image: '👗', trending: true },
    { id: 4, name: 'Classic White Sneakers', category: 'Footwear', stock: 15, price: 2299, image: '👟', trending: true },
    { id: 5, name: 'Leather Handbag', category: 'Accessories', stock: 3, price: 2899, image: '👜', trending: false },
    { id: 6, name: 'Cotton T-Shirt Pack', category: 'Casual', stock: 0, price: 999, image: '👕', trending: false }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const icons = {
  confirmed: <CheckCircle2 className="w-4 h-4" />,
  preparing: <ChefHat className="w-4 h-4" />,
  ready: <Clock className="w-4 h-4" />,
  delivered: <Truck className="w-4 h-4" />,
  returned: <Undo2 className="w-4 h-4" />,
};

type Status = keyof typeof icons;

  const getStatusColor = (status:Status) => {
    const colors = {
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-yellow-100 text-yellow-800',
      ready: 'bg-green-100 text-green-800',
      delivered: 'bg-emerald-100 text-emerald-800',
      returned: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status:Status) => {
    const icons = {
      confirmed: <CheckCircle className="w-4 h-4" />,
      preparing: <Clock className="w-4 h-4" />,
      ready: <Package className="w-4 h-4" />,
      delivered: <Truck className="w-4 h-4" />,
      returned: <XCircle className="w-4 h-4" />
    };
    return icons[status] || <AlertCircle className="w-4 h-4" />;
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
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

      {/* Charts */}
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
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
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
          {recentOrders.slice(0, 4).map((order:any) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
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

  const OrdersView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
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
              {recentOrders.map((order:any, index) => (
                <tr key={order.id} className={`border-t hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                  <td className="p-4 font-medium text-blue-600">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.items} items</td>
                  <td className="p-4 font-medium">₹{order.amount}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 w-fit ${getStatusColor(order.status)}`}>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const InventoryView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <div className="flex items-center space-x-3">
          <select
            value={inventoryFilter}
            onChange={(e) => setInventoryFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="accessories">Accessories</option>
            <option value="footwear">Footwear</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{item.image}</div>
              <div className="flex items-center space-x-2">
                {item.trending && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </span>
                )}
                <div className="flex space-x-1">
                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <h3 className="font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{item.category}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-green-600">₹{item.price}</div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                item.stock > 10 ? 'bg-green-100 text-green-800' :
                item.stock > 5 ? 'bg-yellow-100 text-yellow-800' :
                item.stock > 0 ? 'bg-orange-100 text-orange-800' :
                'bg-red-100 text-red-800'
              }`}>
                {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Update Stock
              </button>
              <button className="py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TR</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TrendRush
                </span>
              </div>
              <div className="hidden md:block h-6 w-px bg-gray-300"></div>
              <div className="hidden md:block">
                <span className="text-sm text-gray-600">Merchant Portal</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                className={`p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${refreshing ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">Zara Fashion Store</p>
                  <p className="text-xs text-gray-600">Bangalore Central</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">ZF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 w-fit">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'inventory', label: 'Inventory', icon: Package },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'inventory' && <InventoryView />}
        {activeTab === 'analytics' && (
          <div className="text-center py-20">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">Analytics Dashboard</h3>
            <p className="text-gray-500">Advanced analytics and insights coming soon!</p>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="text-center py-20">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">Settings Panel</h3>
            <p className="text-gray-500">Store settings and configuration options coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendRush;