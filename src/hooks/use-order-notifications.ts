
'use client';

import { useEffect } from 'react';
import { useOrders } from './use-orders';
import { useToast } from './use-toast';
import { useCart } from './use-cart';

export function useOrderNotifications() {
  const { orders } = useOrders();
  const { toast } = useToast();
  const { cart, orderStatus } = useCart();

  useEffect(() => {
    // Find the current active order based on cart items.
    // This is a simple way to link the notification to the order just placed.
    const activeOrder = orders.find(order => 
        order.items.every((orderItem, index) => 
            cart[index] && orderItem.id === cart[index].id
        ) && order.items.length === cart.length
    );

    if (activeOrder && activeOrder.status === 'Ready for Pickup' && orderStatus !== 'completed') {
      toast({
        title: 'Order Ready!',
        description: `Your order with token #${activeOrder.id} is ready for pickup.`,
      });
    }
  }, [orders, toast, cart, orderStatus]);
}
