import React, { useState } from 'react';

function Payment({ cartItems, onBackToMenu, onCompleteOrder }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'card',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardName: ''
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    // Calculate totals
    const calculateTotals = () => {
        const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.18; // 18% GST
        const deliveryFee = subtotal > 500 ? 0 : 50; // Free delivery above ₹500
        const total = subtotal + tax + deliveryFee;

        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            deliveryFee: deliveryFee.toFixed(2),
            total: total.toFixed(2)
        };
    };

    const totals = calculateTotals();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Personal Information
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\s+/g, ''))) {
            newErrors.phone = 'Phone number must be 10 digits';
        }

        // Address
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.postalCode.trim()) {
            newErrors.postalCode = 'Postal code is required';
        } else if (!/^\d{6}$/.test(formData.postalCode)) {
            newErrors.postalCode = 'Postal code must be 6 digits';
        }

        // Payment (only for card payments)
        if (formData.paymentMethod === 'card') {
            if (!formData.cardNumber.trim()) {
                newErrors.cardNumber = 'Card number is required';
            } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ''))) {
                newErrors.cardNumber = 'Card number must be 16 digits';
            }
            if (!formData.expiryDate.trim()) {
                newErrors.expiryDate = 'Expiry date is required';
            } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
                newErrors.expiryDate = 'Expiry date must be MM/YY format';
            }
            if (!formData.cvv.trim()) {
                newErrors.cvv = 'CVV is required';
            } else if (!/^\d{3}$/.test(formData.cvv)) {
                newErrors.cvv = 'CVV must be 3 digits';
            }
            if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            const orderData = {
                id: Date.now(),
                items: cartItems,
                customer: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    phone: formData.phone,
                    address: `${formData.address}, ${formData.city} - ${formData.postalCode}`
                },
                paymentMethod: formData.paymentMethod,
                totals: totals,
                orderDate: new Date().toISOString(),
                estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString() // 45 minutes
            };

            onCompleteOrder(orderData);
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={onBackToMenu}
                            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                        >
                            ← Back to Menu
                        </button>
                        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
                        <p className="text-gray-600">Complete your order details</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Payment Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                First Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter first name"
                                            />
                                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Last Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter last name"
                                            />
                                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter email address"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                    errors.phone ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter 10-digit phone number"
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Address *
                                            </label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                rows="3"
                                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                    errors.address ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                                placeholder="Enter complete address"
                                            />
                                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    City *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        errors.city ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="Enter city"
                                                />
                                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Postal Code *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="postalCode"
                                                    value={formData.postalCode}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        errors.postalCode ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                    placeholder="Enter 6-digit postal code"
                                                />
                                                {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                                    <div className="space-y-4">
                                        <div className="flex space-x-4">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="card"
                                                    checked={formData.paymentMethod === 'card'}
                                                    onChange={handleInputChange}
                                                    className="mr-2"
                                                />
                                                💳 Credit/Debit Card
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cash"
                                                    checked={formData.paymentMethod === 'cash'}
                                                    onChange={handleInputChange}
                                                    className="mr-2"
                                                />
                                                💵 Cash on Delivery
                                            </label>
                                        </div>

                                        {formData.paymentMethod === 'card' && (
                                            <div className="space-y-4 border-t pt-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Card Number *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                        placeholder="1234 5678 9012 3456"
                                                        maxLength="19"
                                                    />
                                                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Expiry Date *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="expiryDate"
                                                            value={formData.expiryDate}
                                                            onChange={handleInputChange}
                                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                                                            }`}
                                                            placeholder="MM/YY"
                                                            maxLength="5"
                                                        />
                                                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            CVV *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cvv"
                                                            value={formData.cvv}
                                                            onChange={handleInputChange}
                                                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                                errors.cvv ? 'border-red-500' : 'border-gray-300'
                                                            }`}
                                                            placeholder="123"
                                                            maxLength="3"
                                                        />
                                                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Cardholder Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="cardName"
                                                        value={formData.cardName}
                                                        onChange={handleInputChange}
                                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                            errors.cardName ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                        placeholder="Name as on card"
                                                    />
                                                    {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
                                        isProcessing
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-green-600 hover:bg-green-700'
                                    }`}
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Processing Payment...
                                        </span>
                                    ) : (
                                        `Complete Order - ₹${totals.total}`
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                
                                {/* Cart Items */}
                                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="flex justify-between items-start py-2 border-b border-gray-100">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm">{item.name}</h4>
                                                <p className="text-xs text-gray-600">
                                                    Qty: {item.quantity} × ₹{item.price}
                                                </p>
                                                {item.specialInstructions && (
                                                    <p className="text-xs text-orange-600 italic">
                                                        Note: {item.specialInstructions}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-sm font-medium">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Totals */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>₹{totals.subtotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>GST (18%):</span>
                                        <span>₹{totals.tax}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Fee:</span>
                                        <span>₹{totals.deliveryFee}</span>
                                    </div>
                                    {parseFloat(totals.deliveryFee) === 0 && (
                                        <p className="text-xs text-green-600">🎉 Free delivery on orders above ₹500!</p>
                                    )}
                                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                                        <span>Total:</span>
                                        <span className="text-green-600">₹{totals.total}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;