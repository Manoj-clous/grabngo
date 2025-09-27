import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, Edit } from "lucide-react";
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";

// Mock Data
const orders = [
    { id: 'ORD-001', customer: 'Alice', items: 3, status: 'New' },
    { id: 'ORD-002', customer: 'Bob', items: 1, status: 'Preparing' },
    { id: 'ORD-003', customer: 'Charlie', items: 5, status: 'Ready for Pickup' },
    { id: 'ORD-004', customer: 'David', items: 2, status: 'New' },
];

const menuItems = [
    { id: 'ITEM-1', name: 'Espresso', price: '200', available: true },
    { id: 'ITEM-2', name: 'Croissant', price: '250', available: true },
    { id: 'ITEM-3', name: 'Latte', price: '300', available: false },
    { id: 'ITEM-4', name: 'Avocado Toast', price: '600', available: true },
];


export default function VendorPage() {
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
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Incoming Orders</CardTitle>
                <CardDescription>Here are the latest orders from customers.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {orders.map(order => (
                    <li key={order.id} className="flex justify-between items-center p-4 bg-card rounded-lg border">
                      <div>
                        <p className="font-semibold">{order.id} - {order.customer}</p>
                        <p className="text-sm text-muted-foreground">{order.items} items</p>
                      </div>
                      <Badge variant={order.status === 'Ready for Pickup' ? 'default' : order.status === 'Preparing' ? 'secondary' : 'outline'}>{order.status}</Badge>
                    </li>
                  ))}
                </ul>
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
