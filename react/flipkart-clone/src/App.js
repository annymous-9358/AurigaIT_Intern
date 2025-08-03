import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import { LoginProvider } from './contexts/LoginContext';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import OrderPage from './pages/OrderPage';
import './App.css';

function App() {
  return (
    <LoginProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/order" element={<OrderPage />} />
              </Routes>
            </div>
          </Router>
        </ToastProvider>
      </CartProvider>
    </LoginProvider>
  );
}

export default App;
