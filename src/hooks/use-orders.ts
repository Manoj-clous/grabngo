
'use client';

import type { CartItem } from '@/hooks/use-cart';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore';

export type OrderStatus = 'New' | 'Preparing' | 'Ready for Pickup';

export type Order = {
  id: string; // Firestore document ID
  token: number;
  customer: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
};

type OrdersContextType = {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'customer' | 'createdAt'>) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData: Order[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        ordersData.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        } as Order);
      });
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, []);

  const addOrder = async (order: Omit<Order, 'id' | 'customer' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'orders'), {
        ...order,
        customer: `Customer #${Math.floor(Math.random() * 100) + 1}`,
        createdAt: new Date(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const orderDocRef = doc(db, 'orders', orderId);
      await updateDoc(orderDocRef, {
        status: status,
      });
    } catch (e) {
      console.error("Error updating document: ", e);
    }
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