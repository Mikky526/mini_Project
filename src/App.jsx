import React from 'react'
import './App.css'
import MenuPage from './Componance/MenuPage.jsx'
import Payment from './Componance/Payment.jsx'
import OrderSuccess from './Componance/OrderSuccess.jsx'
import Login from './Componance/Login.jsx'
import Signup from './Componance/Signup.jsx'
import AdminDashboard from './Componance/AdminDashboard.jsx'
import { useCart } from './hooks/useCart.js'
import { useNavigation } from './hooks/useNavigation.js'
import { useAuth } from './hooks/useAuth.js'

function App() {
  const cart = useCart();
  const navigation = useNavigation();
  const auth = useAuth();

  const handlePaymentSuccess = (orderData) => {
    navigation.goToSuccess(orderData);
    cart.clearCart();
  };

  const handleLoginClick = () => {
    navigation.goToLogin();
  };

  const handleSignupClick = () => {
    navigation.goToSignup();
  };

  const handleAdminClick = () => {
    navigation.goToAdmin();
  };

  const handleLogout = () => {
    auth.logout();
    navigation.goToMenu();
  };

  const handleLogin = async (email, password) => {
    const result = await auth.login(email, password);
    if (result.success) {
      // Navigate based on user role
      if (result.user.role === 'admin') {
        navigation.goToAdmin();
      } else {
        navigation.goToMenu();
      }
    }
    return result;
  };

  const handleSignup = async (userData) => {
    const result = await auth.signup(userData);
    // Don't auto-navigate after signup, let user click "Go to Login"
    return result;
  };

  // Route rendering based on current page
  if (navigation.currentPage === 'login') {
    return (
      <Login 
        onLogin={handleLogin}
        onBackToMenu={navigation.goToMenu}
        onGoToSignup={navigation.goToSignup}
        loginError={auth.loginError}
        isLoading={auth.isLoading}
      />
    );
  }

  if (navigation.currentPage === 'signup') {
    return (
      <Signup 
        onSignup={handleSignup}
        onBackToMenu={navigation.goToMenu}
        onGoToLogin={navigation.goToLogin}
        signupError={auth.signupError}
        signupSuccess={auth.signupSuccess}
        isLoading={auth.isLoading}
      />
    );
  }

  if (navigation.currentPage === 'payment') {
    return (
      <Payment 
        cartItems={cart.cartItems}
        onBackToMenu={navigation.goToMenu}
        onCompleteOrder={handlePaymentSuccess}
      />
    );
  }

  if (navigation.currentPage === 'success') {
    return (
      <OrderSuccess 
        orderDetails={navigation.orderDetails}
        onBackToMenu={navigation.goToMenu}
      />
    );
  }

  if (navigation.currentPage === 'admin' && auth.isAdmin()) {
    return (
      <AdminDashboard 
        onBackToMenu={navigation.goToMenu}
        getAllUsers={auth.getAllUsers}
        user={auth.user}
      />
    );
  }

  // Default: Menu page
  return (
    <MenuPage 
      cartItems={cart.cartItems}
      cartCount={cart.cartCount}
      onAddToCart={cart.addToCart}
      onUpdateQuantity={cart.updateQuantity}
      onRemoveItem={cart.removeItem}
      onCheckout={navigation.goToPayment}
      user={auth.user}
      onLogin={handleLoginClick}
      onSignup={handleSignupClick}
      onLogout={handleLogout}
      onAdminClick={handleAdminClick}
    />
  );
}

export default App;