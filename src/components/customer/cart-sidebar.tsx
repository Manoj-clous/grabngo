
'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

export function CartSidebar() {
  const {
    isSidebarOpen,
    setSidebarOpen,
    cart,
    removeFromCart,
    updateQuantity,
    total,
    orderStatus,
    setOrderStatus,
    clearCart,
  } = useCart();

  const handlePlaceOrder = () => {
    // In a real app, this would trigger a backend process
    setOrderStatus('preparing');
    // Simulate order progress
    setTimeout(() => {
        setOrderStatus('ready for pickup');
    }, 5000); // 5 seconds
  }

  const handleNewOrder = () => {
    clearCart();
    setSidebarOpen(false);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
        case 'preparing':
            return <Badge variant="secondary">Preparing</Badge>;
        case 'ready for pickup':
            return <Badge variant="default">Ready for Pickup</Badge>;
        default:
            return <Badge variant="outline">Pending</Badge>;
    }
  }

  return (
    <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Your Order</SheetTitle>
        </SheetHeader>
        <Separator />
        
        {cart.length > 0 ? (
            <>
            <div className="flex flex-1 flex-col justify-between">
                <ScrollArea className="flex-1 px-6">
                    <div className="flex flex-col gap-4 py-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-start justify-between">
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">₹{item.price}</p>
                            <div className="mt-2 flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span>{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground"
                            onClick={() => removeFromCart(item.id)}
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                        </div>
                    ))}
                    </div>
                </ScrollArea>

                <SheetFooter className="flex-col gap-4 p-6 bg-card border-t">
                    <div className="flex items-center justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Status</span>
                        {getStatusBadge(orderStatus)}
                    </div>
                    {orderStatus === 'ready for pickup' ? (
                        <Button className="w-full" onClick={handleNewOrder}>
                            Start New Order
                        </Button>
                    ) : (
                        <Button className="w-full" onClick={handlePlaceOrder} disabled={orderStatus === 'preparing'}>
                            {orderStatus === 'preparing' ? 'Waiting for Pickup...' : 'Place Order'}
                        </Button>
                    )}
                </SheetFooter>
            </div>
            </>
        ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-muted-foreground">Your cart is empty.</p>
                <SheetClose asChild>
                    <Button variant="outline">Continue Shopping</Button>
                </SheetClose>
            </div>
        )}

      </SheetContent>
    </Sheet>
  );
}
