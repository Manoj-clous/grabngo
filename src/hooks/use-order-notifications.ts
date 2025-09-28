
'use client';

import { useEffect, useRef } from 'react';
import { useOrders } from './use-orders';
import { useToast } from './use-toast';
import { useCart } from './use-cart';

export function useOrderNotifications() {
  const { orders } = useOrders();
  const { toast } = useToast();
  const { cart, orderStatus, setOrderStatus } = useCart();
  const notifiedOrders = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Find the current active order based on cart items.
    const activeOrder = orders.find(order => 
        cart.length > 0 && // Ensure there is an active cart session
        order.items.length === cart.length &&
        order.items.every((orderItem) => 
            cart.some(cartItem => cartItem.id === orderItem.id)
        )
    );

    if (
        activeOrder && 
        activeOrder.status === 'Ready for Pickup' && 
        orderStatus !== 'completed' &&
        !notifiedOrders.current.has(activeOrder.id)
    ) {
      toast({
        title: 'Order Ready!',
        description: `Your order with token #${activeOrder.token} is ready for pickup.`,
        duration: 5000,
      });
      setOrderStatus('ready for pickup');
      notifiedOrders.current.add(activeOrder.id);
    }
  }, [orders, toast, cart, orderStatus, setOrderStatus]);
}