
'use client';

import type { CartItem } from '@/hooks/use-cart';
import React, { createContext, useContext, useState } from 'react';

export type OrderStatus = 'New' | 'Preparing' | 'Ready for Pickup';

export type Order = {
  id: number;
  customer: string; // For now, we can use a placeholder
  items: CartItem[];
  status: OrderStatus;
  total: number;
};

type OrdersContextType = {
  orders: Order[];
  addOrder: (order: Omit<Order, 'customer'>) => void;
  updateOrderStatus: (orderId: number, status: OrderStatus) => void;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (order: Omit<Order, 'customer'>) => {
    const newOrder: Order = {
        ...order,
        customer: `Customer #${Math.floor(Math.random() * 100) + 1}`,
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const updateOrderStatus = (orderId: number, status: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
  };

  return React.createElement(OrdersContext.Provider, { value }, children);
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
