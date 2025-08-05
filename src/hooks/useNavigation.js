import { useState } from 'react';

export const useNavigation = () => {
  const [currentPage, setCurrentPage] = useState('menu'); // 'menu', 'payment', 'success', 'login', 'signup', 'admin'
  const [orderDetails, setOrderDetails] = useState(null);

  const goToPayment = () => {
    setCurrentPage('payment');
  };

  const goToSuccess = (orderData) => {
    setOrderDetails(orderData);
    setCurrentPage('success');
  };

  const goToMenu = () => {
    setCurrentPage('menu');
    setOrderDetails(null);
  };

  const goToLogin = () => {
    setCurrentPage('login');
  };

  const goToSignup = () => {
    setCurrentPage('signup');
  };

  const goToAdmin = () => {
    setCurrentPage('admin');
  };

  return {
    currentPage,
    orderDetails,
    goToPayment,
    goToSuccess,
    goToMenu,
    goToLogin,
    goToSignup,
    goToAdmin
  };
};
