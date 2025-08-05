import React from 'react';

function ViewDetails({ product, onClose }) {
    if (!product) return null;

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center"
                    >
                        ×
                    </button>
                    
                    <img
                        className="w-full h-64 object-cover rounded-t-lg"
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x300?text=Food+Image';
                        }}
                    />
                    
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
                            <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                        </div>
                        
                        <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 mr-2">
                                {renderStars(product.rating)}
                            </div>
                            <span className="text-lg text-gray-600">({product.rating})</span>
                        </div>
                        
                        <p className="text-gray-700 text-lg mb-6">
                            {product.description}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Details</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Category:</span>
                                        <span className="font-medium">{product.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Preparation Time:</span>
                                        <span className="font-medium">{product.preparationTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Vegetarian:</span>
                                        <span className="font-medium">
                                            {product.isVegetarian ? '🌱 Yes' : '🥩 No'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Availability:</span>
                                        <span className={`font-medium ${product.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.isAvailable ? '✅ Available' : '❌ Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.ingredients.map((ingredient, index) => (
                                        <span 
                                            key={index}
                                            className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                        >
                                            {ingredient}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={onClose}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewDetails;
