import React, { useState } from 'react';
import ViewDetails from './ViewDetails';
import AddToCart from './AddToCart';

function ProductCard({ product, onAddToCart }) {
    const [showViewDetails, setShowViewDetails] = useState(false);
    const [showAddToCart, setShowAddToCart] = useState(false);

    const handleAddToCart = (cartItem) => {
        onAddToCart(cartItem);
    };

    // Function to render star rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-400">★</span>);
        }
        
        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-400">★</span>);
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
        }
        
        return stars;
    };

    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white h-full flex flex-col hover:shadow-xl transition-shadow">
            <img
                className="w-full h-48 object-cover"
                src={product.image}
                alt={product.name}
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Food+Image';
                }}
            />
            <div className="px-6 py-4 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-xl mb-2">{product.name}</div>
                    <span className="text-lg font-semibold text-green-600">₹{product.price}</span>
                </div>
                
                <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 mr-2">
                        {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-600">({product.rating})</span>
                </div>

                <p className="text-gray-700 text-base mb-3">
                    {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {product.category}
                    </span>
                    {product.isVegetarian && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            🌱 Vegetarian
                        </span>
                    )}
                    <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        ⏱️ {product.preparationTime}
                    </span>
                </div>

                <div className="mb-3 flex-grow">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Ingredients:</h4>
                    <p className="text-xs text-gray-600">
                        {product.ingredients.join(', ')}
                    </p>
                </div>

                {!product.isAvailable && (
                    <div className="mb-3 p-2 bg-red-100 border border-red-300 rounded">
                        <span className="text-red-700 text-sm font-medium">Currently Unavailable</span>
                    </div>
                )}
            </div>
            
            {/* Buttons section - always at bottom */}
            <div className="px-6 pb-4">
                <div className="flex gap-2">
                    <button 
                        className={`flex-1 font-bold py-2 px-4 rounded transition-colors ${
                            product.isAvailable 
                                ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!product.isAvailable}
                        onClick={() => setShowAddToCart(true)}
                    >
                        Add to Cart
                    </button>
                    <button 
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
                        onClick={() => setShowViewDetails(true)}
                    >
                        View Details
                    </button>
                </div>
            </div>

            {/* Modals */}
            {showViewDetails && (
                <ViewDetails
                    product={product}
                    onClose={() => setShowViewDetails(false)}
                />
            )}

            {showAddToCart && (
                <AddToCart
                    product={product}
                    onClose={() => setShowAddToCart(false)}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
}

export default ProductCard;