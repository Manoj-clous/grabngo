
'use client';

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/ui/mobile-nav";
import { useOrderNotifications } from "@/hooks/use-order-notifications";

// Mock data for shops
const shops = [
  { id: '1', name: 'Darling Food Court', description: 'Coffee, pastries, and sandwiches' },
  { id: '2', name: 'Namma Chai', description: 'Quick bites and snacks' },
  { id: '3', name: 'KC Foods', description: 'Books, stationery, and more' },
  { id: '4', name: 'Dominos', description: 'Freshly baked pizzas and sides' },
  { id: '5', name: 'Arasan', description: 'Salads, smoothies, and juices' },
  { id: '6', name: 'Olive Restaurant', description: 'Electronics and accessories' },
];

export default function CustomerPage() {
  useOrderNotifications();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-8">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-primary font-headline">Shops & Restaurants</h1>
              <p className="text-lg text-foreground/80 mt-2">Explore the best spots on campus</p>
            </div>
            <Button variant="link" asChild className="hidden md:flex">
                <Link href="/">&larr; Back to Home</Link>
            </Button>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map(shop => (
            <Link href={`/customer/shop/${shop.id}`} key={shop.id} className="group">
              <Card className="h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl flex flex-col justify-center">
                <CardHeader className="flex-grow">
                  <CardTitle className="text-2xl text-primary group-hover:text-accent transition-colors">{shop.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
