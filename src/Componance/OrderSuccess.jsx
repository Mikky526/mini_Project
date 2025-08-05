import React from 'react';

function OrderSuccess({ orderDetails, onBackToMenu }) {
    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No order details found</h2>
                    <button
                        onClick={onBackToMenu}
                        className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        Back to Menu
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const estimatedDeliveryTime = () => {
        const deliveryDate = new Date(orderDetails.estimatedDelivery);
        return deliveryDate.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                        <span className="text-3xl">✅</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
                    <p className="text-lg text-gray-600">
                        Thank you for your order. We're preparing your delicious meal!
                    </p>
                </div>

                {/* Order Details Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Order Header */}
                    <div className="bg-green-600 text-white p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold">Order #{orderDetails.id}</h2>
                                <p className="text-green-100">Placed on {formatDate(orderDetails.orderDate)}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold">₹{orderDetails.totals.total}</p>
                                <p className="text-green-100 capitalize">{orderDetails.paymentMethod} Payment</p>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Information */}
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📍 Delivery Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Delivering to:</h4>
                                <p className="text-gray-600">{orderDetails.customer.name}</p>
                                <p className="text-gray-600">{orderDetails.customer.address}</p>
                                <p className="text-gray-600">{orderDetails.customer.phone}</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-700 mb-2">Estimated Delivery:</h4>
                                <p className="text-2xl font-bold text-green-600">{estimatedDeliveryTime()}</p>
                                <p className="text-sm text-gray-500">Usually delivered within 30-45 minutes</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">🍽️ Your Order</h3>
                        <div className="space-y-3">
                            {orderDetails.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-2">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                                        <p className="text-sm text-gray-600">
                                            Quantity: {item.quantity} × ₹{item.price}
                                        </p>
                                        {item.specialInstructions && (
                                            <p className="text-xs text-orange-600 italic mt-1">
                                                Special instructions: {item.specialInstructions}
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-800">
                                            ₹{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal:</span>
                                <span>₹{orderDetails.totals.subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>GST (18%):</span>
                                <span>₹{orderDetails.totals.tax}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Fee:</span>
                                <span>₹{orderDetails.totals.deliveryFee}</span>
                            </div>
                            {parseFloat(orderDetails.totals.deliveryFee) === 0 && (
                                <p className="text-sm text-green-600">🎉 Free delivery on orders above ₹500!</p>
                            )}
                            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                                <span>Total Paid:</span>
                                <span className="text-green-600">₹{orderDetails.totals.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Tracking */}
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 Order Status</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                                <span className="text-green-600 font-medium">✅ Order Confirmed</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
                                <span className="text-yellow-600 font-medium">👨‍🍳 Preparing your order</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-gray-300 rounded-full mr-3"></div>
                                <span className="text-gray-500">🚚 Out for delivery</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-4 h-4 bg-gray-300 rounded-full mr-3"></div>
                                <span className="text-gray-500">🎉 Delivered</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">📞 Need Help?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <span className="text-2xl mb-2 block">📱</span>
                                <p className="font-medium">Call Us</p>
                                <p className="text-sm text-gray-600">+91 1800-123-4567</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <span className="text-2xl mb-2 block">💬</span>
                                <p className="font-medium">Live Chat</p>
                                <p className="text-sm text-gray-600">Available 24/7</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <span className="text-2xl mb-2 block">📧</span>
                                <p className="font-medium">Email</p>
                                <p className="text-sm text-gray-600">support@foodieexpress.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onBackToMenu}
                        className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                    >
                        Order More Food
                    </button>
                    <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                        Track Order
                    </button>
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                        Download Receipt
                    </button>
                </div>

                {/* Thank You Message */}
                <div className="mt-8 text-center bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You for Choosing FoodieExpress! 🙏</h3>
                    <p className="text-gray-600 mb-4">
                        We're committed to delivering fresh, delicious food right to your doorstep. 
                        Your order is being prepared with care by our expert chefs.
                    </p>
                    <div className="flex justify-center space-x-4 text-sm text-gray-500">
                        <span>⭐ Rate your experience</span>
                        <span>📱 Follow us on social media</span>
                        <span>🎁 Refer friends for rewards</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;