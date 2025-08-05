import React, { useState } from 'react';

function Login({ onLogin, onBackToMenu, onGoToSignup, loginError, isLoading }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.email && formData.password) {
            await onLogin(formData.email, formData.password);
        }
    };

    const handleDemoLogin = async (email, password) => {
        setFormData({ email, password });
        await onLogin(email, password);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <button
                        onClick={onBackToMenu}
                        className="text-orange-600 hover:text-orange-800 mb-4 inline-flex items-center"
                    >
                        ← Back to Menu
                    </button>
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-orange-100">
                        <span className="text-2xl">🍕</span>
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Sign in to FoodieExpress
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Access your account to order delicious food
                    </p>
                </div>

                {/* Demo Credentials */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-3">Demo Accounts:</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => handleDemoLogin('admin@foodorder.com', 'admin123')}
                            className="w-full text-left bg-white border border-blue-200 rounded px-3 py-2 text-sm hover:bg-blue-50 transition-colors"
                            disabled={isLoading}
                        >
                            <div className="font-medium text-blue-900">👑 Admin Account</div>
                            <div className="text-blue-700">admin@foodorder.com / admin123</div>
                        </button>
                        <button
                            onClick={() => handleDemoLogin('user@foodorder.com', 'user123')}
                            className="w-full text-left bg-white border border-blue-200 rounded px-3 py-2 text-sm hover:bg-blue-50 transition-colors"
                            disabled={isLoading}
                        >
                            <div className="font-medium text-blue-900">👤 User Account</div>
                            <div className="text-blue-700">user@foodorder.com / user123</div>
                        </button>
                    </div>
                </div>

                {/* Login Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="space-y-4">
                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-10"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {loginError && (
                                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <span className="text-red-400">⚠️</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-700">{loginError}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || !formData.email || !formData.password}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                                    isLoading || !formData.email || !formData.password
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                                }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Signup Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={onGoToSignup}
                            className="font-medium text-orange-600 hover:text-orange-500 transition-colors"
                        >
                            Create one here
                        </button>
                    </p>
                </div>

                {/* Features */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Login?</h3>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <span className="text-green-500 mr-3">✅</span>
                            <span className="text-sm text-gray-600">Track your orders in real-time</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-green-500 mr-3">✅</span>
                            <span className="text-sm text-gray-600">Save your favorite items</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-green-500 mr-3">✅</span>
                            <span className="text-sm text-gray-600">Faster checkout with saved addresses</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-green-500 mr-3">✅</span>
                            <span className="text-sm text-gray-600">Access exclusive offers and discounts</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-xs text-gray-500">
                        By signing in, you agree to our{' '}
                        <a href="#" className="text-orange-600 hover:text-orange-500">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-orange-600 hover:text-orange-500">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;