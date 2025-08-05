import React, { useState } from 'react';

function AddToCart({ product, onClose, onAddToCart }) {
    const [quantity, setQuantity] = useState(1);
    const [specialInstructions, setSpecialInstructions] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const cartItem = {
            ...product,
            quantity: quantity,
            specialInstructions: specialInstructions,
            totalPrice: product.price * quantity
        };
        onAddToCart(cartItem);
        onClose();
        
        // Show success message
        const message = `Added ${quantity} ${product.name}(s) to cart!`;
        if (window.alert) {
            alert(message);
        }
    };

    const totalPrice = product.price * quantity;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">Add to Cart</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ×
                        </button>
                    </div>
                    
                    <div className="flex gap-4 mb-4">
                        <img
                            className="w-20 h-20 object-cover rounded"
                            src={product.image}
                            alt={product.name}
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/80x80?text=Food';
                            }}
                        />
                        <div>
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <p className="text-green-600 font-semibold">₹{product.price}</p>
                            <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded"
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 bg-gray-100 rounded text-center min-w-12">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Special Instructions (Optional)
                            </label>
                            <textarea
                                value={specialInstructions}
                                onChange={(e) => setSpecialInstructions(e.target.value)}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="Any special requests for your order..."
                            />
                        </div>
                        
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-xl font-bold text-green-600">₹{totalPrice}</span>
                        </div>
                        
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddToCart;