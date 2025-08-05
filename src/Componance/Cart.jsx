import React from 'react';

function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onClose, onCheckout }) {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const totalAmount = calculateTotal();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
            <div className="bg-white w-full max-w-md h-full overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-gray-500">Your cart is empty</p>
                        </div>
                    ) : (
                        <>
                            {cartItems.map(item => (
                                <div key={item.id} className="border-b pb-4 mb-4">
                                    <div className="flex gap-3">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold">{item.name}</h3>
                                            <p className="text-green-600 font-bold">₹{item.price}</p>
                                            
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1 bg-gray-100 rounded">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => onRemoveItem(item.id)}
                                                    className="ml-auto text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right mt-2">
                                        <span className="font-bold">Subtotal: ₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                            ))}

                            {/* Total */}
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between items-center text-xl font-bold">
                                    <span>Total:</span>
                                    <span className="text-green-600">₹{totalAmount}</span>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <button
                                onClick={onCheckout}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg mt-4 transition-colors"
                            >
                                Proceed to Checkout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;
