import React from 'react';

function Navbar({ cartCount, onCartClick, selectedCategory, onCategoryChange, user, onLogin, onSignup, onLogout, onAdminClick }) {
    const categories = ['All', 'Main Course', 'Appetizer', 'Dessert', 'Beverage'];

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-orange-600">
                            🍽️ FoodieExpress
                        </h1>
                    </div>

                    {/* Desktop Navigation
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </a>
                            <a href="#" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                                About
                            </a>
                            <a href="#" className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium">
                                Contact
                            </a>
                        </div>
                    </div> */}

                    {/* Right side - Cart, User, Admin */}
                    <div className="flex items-center space-x-4">
                        {/* User Authentication */}
                        {user ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-700">
                                    Hello, {user.name}
                                </span>
                                
                                {/* Admin Panel Button (only for admin users) */}
                                {user.role === 'admin' && (
                                    <button
                                        onClick={onAdminClick}
                                        className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                                    >
                                        👑 Admin
                                    </button>
                                )}
                                
                                <button
                                    onClick={onLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={onLogin}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={onSignup}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}

                        {/* Cart Button */}
                        <button
                            onClick={onCartClick}
                            className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile menu button */}
                        <div className="md:hidden ml-4">
                            <button className="text-gray-700 hover:text-orange-600 focus:outline-none focus:text-orange-600">
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center py-4">
                        <div className="flex items-center space-x-2 flex-wrap justify-center gap-2">
                            <span className="text-sm font-medium text-gray-700 mr-2">
                                Categories:
                            </span>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => onCategoryChange(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;