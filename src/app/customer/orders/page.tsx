
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrders } from '@/hooks/use-orders';
import { ArrowLeft, ChefHat, ShoppingBag, Truck } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const { orders } = useOrders();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return <ShoppingBag className="h-5 w-5" />;
      case 'Preparing':
        return <ChefHat className="h-5 w-5" />;
      case 'Ready for Pickup':
        return <Truck className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-primary font-headline">My Orders</h1>
              <p className="text-lg text-foreground/80 mt-2">Track your recent orders and view their status.</p>
            </div>
            <Button variant="link" asChild>
              <Link href="/customer" className="flex items-center gap-2">
                <ArrowLeft /> Back to Shops
              </Link>
            </Button>
          </div>
        </header>
        
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">Order Token: <span className="text-primary font-mono tracking-widest">{order.token}</span></CardTitle>
                      <CardDescription>Placed on {new Date(order.createdAt).toLocaleString()}</CardDescription>
                    </div>
                    <Badge variant={order.status === 'Ready for Pickup' ? 'default' : order.status === 'Preparing' ? 'secondary' : 'outline'} className="flex items-center gap-2 text-sm">
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`order-${order.id}`}>
                      <AccordionTrigger className="text-sm">View Details</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm mt-2">
                          {order.items.map((item) => (
                            <li key={item.id} className="flex justify-between">
                              <span>{item.name} x {item.quantity}</span>
                              <span>₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="border-t my-2" />
                        <div className="flex justify-between font-bold text-base">
                          <span>Total</span>
                          <span>₹{order.total.toFixed(2)}</span>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">You haven't placed any orders yet.</p>
            <Button asChild className="mt-4">
              <Link href="/customer">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}