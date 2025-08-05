import React, { useState } from 'react';

function AdminDashboard({ onBackToMenu, getAllUsers, user }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [orders, setOrders] = useState([
        {
            id: 1001,
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            items: [
                { name: 'Margherita Pizza', quantity: 2, price: 450 },
                { name: 'Garlic Bread', quantity: 1, price: 180 }
            ],
            total: 1080,
            status: 'pending',
            orderDate: '2025-01-15T10:30:00Z',
            estimatedDelivery: '2025-01-15T11:15:00Z'
        },
        {
            id: 1002,
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            items: [
                { name: 'Chicken Burger', quantity: 1, price: 350 },
                { name: 'French Fries', quantity: 1, price: 120 }
            ],
            total: 470,
            status: 'preparing',
            orderDate: '2025-01-15T11:00:00Z',
            estimatedDelivery: '2025-01-15T11:45:00Z'
        },
        {
            id: 1003,
            customerName: 'Mike Johnson',
            customerEmail: 'mike@example.com',
            items: [
                { name: 'Chicken Biryani', quantity: 1, price: 280 }
            ],
            total: 280,
            status: 'delivered',
            orderDate: '2025-01-15T09:00:00Z',
            estimatedDelivery: '2025-01-15T09:45:00Z'
        }
    ]);

    const registeredUsers = getAllUsers();

    const updateOrderStatus = (orderId, newStatus) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'preparing': return 'bg-blue-100 text-blue-800';
            case 'ready': return 'bg-green-100 text-green-800';
            case 'delivered': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    const calculateStats = () => {
        const totalOrders = orders.length;
        const pendingOrders = orders.filter(order => order.status === 'pending').length;
        const totalRevenue = orders
            .filter(order => order.status === 'delivered')
            .reduce((sum, order) => sum + order.total, 0);
        const totalCustomers = registeredUsers.length + 2; // +2 for default users

        return { totalOrders, pendingOrders, totalRevenue, totalCustomers };
    };

    const stats = calculateStats();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center">
                            <button
                                onClick={onBackToMenu}
                                className="text-gray-600 hover:text-gray-800 mr-4"
                            >
                                ← Back to Menu
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                                <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                Last updated: {new Date().toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-2xl">📋</span>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Orders
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {stats.totalOrders}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-2xl">⏳</span>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Pending Orders
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {stats.pendingOrders}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Revenue
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            ₹{stats.totalRevenue}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            Total Customers
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {stats.totalCustomers}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'overview'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Orders Management
                            </button>
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'users'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                User Management
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Recent Orders
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                Manage and track customer orders
                            </p>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <li key={order.id} className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <span className="text-xl">🍽️</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    Order #{order.id} - {order.customerName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {order.customerEmail} • {formatDateTime(order.orderDate)}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Items: {order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="text-sm font-medium text-gray-900">
                                                    ₹{order.total}
                                                </div>
                                                <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </div>
                                            </div>
                                            <div className="flex flex-col space-y-1">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    className="text-xs border-gray-300 rounded-md"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="preparing">Preparing</option>
                                                    <option value="ready">Ready</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Registered Users
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                View and manage user accounts
                            </p>
                        </div>
                        <ul className="divide-y divide-gray-200">
                            {/* Default Users */}
                            <li className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="text-xl">👑</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                Admin User
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                admin@foodorder.com
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                        Admin
                                    </div>
                                </div>
                            </li>
                            <li className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="text-xl">👤</span>
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                Regular User
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                user@foodorder.com
                                            </div>
                                        </div>
                                    </div>
                                    <div className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        User
                                    </div>
                                </div>
                            </li>
                            {/* Registered Users */}
                            {registeredUsers.map((regUser) => (
                                <li key={regUser.id} className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <span className="text-xl">👤</span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {regUser.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {regUser.email} • {regUser.phone}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    Joined: {new Date(regUser.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            {regUser.role.charAt(0).toUpperCase() + regUser.role.slice(1)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {registeredUsers.length === 0 && (
                            <div className="px-4 py-8 text-center text-gray-500">
                                <span className="text-4xl mb-4 block">👥</span>
                                <p>No registered users yet</p>
                                <p className="text-sm">Users who sign up will appear here</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;