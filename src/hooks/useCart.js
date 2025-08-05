import { useState } from 'react';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (cartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === cartItem.id && item.specialInstructions === cartItem.specialInstructions
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === cartItem.id && item.specialInstructions === cartItem.specialInstructions
            ? { ...item, quantity: item.quantity + cartItem.quantity }
            : item
        );
      } else {
        return [...prevItems, cartItem];
      }
    });
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(index);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    cartCount
  };
};
