import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, selectedCategory, onAddToCart }) {
    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'All' 
        ? products 
        : products?.filter(product => product.category === selectedCategory);

    return (
        <div className="container mx-auto px-4">
            {/* Category Header */}
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedCategory === 'All' ? 'All Items' : selectedCategory}
                </h2>
                <p className="text-gray-600">
                    {filteredProducts?.length || 0} items available
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                {filteredProducts && filteredProducts.map(product => (
                    <div key={product.id} className="h-full">
                        <ProductCard product={product} onAddToCart={onAddToCart} />
                    </div>
                ))}
            </div>

            {/* No items message */}
            {filteredProducts?.length === 0 && (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🍽️</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No items found in {selectedCategory}
                    </h3>
                    <p className="text-gray-500">
                        Try selecting a different category or check back later!
                    </p>
                </div>
            )}
        </div>
    );
}

export default ProductList;
