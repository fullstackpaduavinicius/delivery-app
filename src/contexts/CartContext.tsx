import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  updateCart: (newCart: CartItem[]) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Tenta carregar do localStorage se existir
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('deliveryAppCart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('deliveryAppCart', JSON.stringify(newCart));
  };

  const addToCart = (product: CartItem) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }
    
    saveCart(updatedCart);
  };

  const updateCart = (newCart: CartItem[]) => {
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};