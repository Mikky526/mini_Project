import React, { useState } from 'react';
import Navbar from './Navbar';
import ProductList from './ProductList';
import Cart from './Cart';
import Footer from './Footer';
import productsData from '../Data/Product.json';

function MenuPage({ 
    cartItems, 
    cartCount, 
    onAddToCart, 
    onUpdateQuantity, 
    onRemoveItem, 
    onCheckout, 
    user, 
    onLogin, 
    onSignup,
    onLogout, 
    onAdminClick 
}) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showCart, setShowCart] = useState(false);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleCartClick = () => {
        setShowCart(true);
    };

    const handleCloseCart = () => {
        setShowCart(false);
    };

    const handleCheckout = () => {
        setShowCart(false);
        onCheckout();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                cartCount={cartCount}
                onCartClick={handleCartClick}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                user={user}
                onLogin={onLogin}
                onSignup={onSignup}
                onLogout={onLogout}
                onAdminClick={onAdminClick}
            />
            
            <main className="py-8">
                <ProductList
                    products={productsData.foods}
                    selectedCategory={selectedCategory}
                    onAddToCart={onAddToCart}
                />
            </main>

            <Footer />

            {showCart && (
                <Cart
                    cartItems={cartItems}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                    onClose={handleCloseCart}
                    onCheckout={handleCheckout}
                />
            )}
        </div>
    );
}

export default MenuPage;
