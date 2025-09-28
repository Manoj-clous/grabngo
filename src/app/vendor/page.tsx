
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, Edit } from "lucide-react";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { useOrders, OrderStatus } from "@/hooks/use-orders";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data for menu
const menuItems = [
    { id: 'ITEM-1', name: 'Espresso', price: '200', available: true },
    { id: 'ITEM-2', name: 'Croissant', price: '250', available: true },
    { id: 'ITEM-3', name: 'Latte', price: '300', available: false },
    { id: 'ITEM-4', name: 'Avocado Toast', price: '600', available: true },
];

const statusOptions: OrderStatus[] = ['New', 'Preparing', 'Ready for Pickup'];

export default function VendorPage() {
  const { orders, updateOrderStatus } = useOrders();

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus => {
    const currentIndex = statusOptions.indexOf(currentStatus);
    return statusOptions[(currentIndex + 1) % statusOptions.length];
  };

  const handleStatusChange = (orderId: number, currentStatus: OrderStatus) => {
    const nextStatus = getNextStatus(currentStatus);
    updateOrderStatus(orderId, nextStatus);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-primary font-headline">Vendor Dashboard</h1>
              <p className="text-lg text-foreground/80 mt-2">Manage your campus business</p>
            </div>
            <Button variant="link" asChild>
                <Link href="/">&larr; Back to Home</Link>
            </Button>
          </div>
        </header>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Orders {orders.length > 0 && `(${orders.length})`}</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Incoming Orders</CardTitle>
                <CardDescription>Here are the latest orders from customers.</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {orders.map(order => (
                      <Card key={order.id}>
                        <CardHeader>
                          <CardTitle className="text-lg flex justify-between items-center">
                            <span>Token: {order.id}</span>
                             <Badge variant={order.status === 'Ready for Pickup' ? 'default' : order.status === 'Preparing' ? 'secondary' : 'outline'}>
                                {order.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{order.customer}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm">
                            {order.items.map(item => (
                              <li key={item.id} className="flex justify-between">
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{(Number(item.price) * item.quantity).toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="border-t my-2" />
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>₹{order.total.toFixed(2)}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="w-full">
                                Update Status
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {statusOptions.map(status => (
                                <DropdownMenuItem key={status} onSelect={() => updateOrderStatus(order.id, status)}>
                                  {status}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No incoming orders yet.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Your Menu</CardTitle>
                  <CardDescription>Update item availability and prices.</CardDescription>
                </div>
                <Button>
                  <FilePlus className="mr-2 h-4 w-4" /> Add Item
                </Button>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {menuItems.map(item => (
                    <li key={item.id} className="flex justify-between items-center p-4 bg-card rounded-lg border">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-4">
                          <Badge variant={item.available ? "secondary" : "destructive"}>
                              {item.available ? 'Available' : 'Unavailable'}
                          </Badge>
                          <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit Item</span>
                          </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
