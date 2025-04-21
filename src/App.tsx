import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/global';
import { CartProvider } from './contexts/CartContext';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;