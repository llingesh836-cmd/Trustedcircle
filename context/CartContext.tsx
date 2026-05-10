'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type CartItem = {
  voucherId: string;
  voucherName: string;
  amount: 100 | 500 | 1000;
  quantity: number;
  price: number;
  discount: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (voucherId: string, amount: number) => void;
  updateQuantity: (voucherId: string, amount: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('trustedcircle-cart') : null;
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('trustedcircle-cart', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.voucherId === newItem.voucherId && item.amount === newItem.amount);
      if (existing) {
        return prev.map((item) =>
          item.voucherId === newItem.voucherId && item.amount === newItem.amount
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (voucherId: string, amount: number) => {
    setItems((prev) => prev.filter((item) => !(item.voucherId === voucherId && item.amount === amount)));
  };

  const updateQuantity = (voucherId: string, amount: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(voucherId, amount);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.voucherId === voucherId && item.amount === amount ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
