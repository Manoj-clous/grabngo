
'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import type { MenuItem } from '@/app/customer/shop/[shopId]/page';

export type CartItem = MenuItem & {
  quantity: number;
};

type OrderStatus = 'pending' | 'preparing' | 'ready for pickup' | 'completed';

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  total: number;
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  orderStatus: OrderStatus;
  setOrderStatus: (status: OrderStatus) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending');

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };
  
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
    setOrderStatus('pending');
  }

  const total = useMemo(() => {
    return cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    total,
    isSidebarOpen,
    setSidebarOpen,
    orderStatus,
    setOrderStatus,
    clearCart,
  };

  return React.createElement(CartContext.Provider, { value }, children);
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
