
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileNav } from "@/components/ui/mobile-nav";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { CartSidebar } from "@/components/customer/cart-sidebar";
import { useParams } from "next/navigation";

// Mock data for shops and menus
const shops = [
  { id: '1', name: 'Darling Food Court', description: 'Coffee, pastries, and sandwiches' },
  { id: '2', name: 'Namma Chai', description: 'Quick bites and snacks' },
  { id: '3', name: 'KC Foods', description: 'Books, stationery, and more' },
  { id: '4', name: 'Dominos', description: 'Freshly baked pizzas and sides' },
  { id: '5', name: 'Arasan', description: 'Salads, smoothies, and juices' },
  { id: '6', name: 'Olive Restaurant', description: 'Electronics and accessories' },
];

const menus: Record<string, MenuItem[]> = {
  '1': [
    { id: 'm1-1', name: 'Veg Sandwich', description: 'Fresh vegetables and sauces in bread', price: '50' },
    { id: 'm1-2', name: 'Chicken Noodles', description: 'Stir-fried noodles with chicken and vegetables', price: '75' },
    { id: 'm1-3', name: 'White Sauce Pasta', description: 'Creamy pasta with vegetables', price: '100' },
  ],
  '2': [
    { id: 'm2-1', name: 'Masala Chai', description: 'Spiced Indian tea', price: '20' },
    { id: 'm2-2', name: 'Samosa', description: 'Fried pastry with a savory filling', price: '40' },
    { id: 'm2-3', name: 'Vada Pav', description: 'Potato fritter in a bread bun', price: '60' },
  ],
  '3': [
    { id: 'm3-1', name: 'Chicken Puffs', description: 'Spicy chicken in a puff pastry', price: '80' },
    { id: 'm3-2', name: 'Veg Roll', description: 'Mixed vegetables in a soft roll', price: '30' },
    { id: 'm3-3', name: 'Lemonade', description: 'Freshly squeezed lemons', price: '100' },
  ],
  '4': [
    { id: 'm4-1', name: 'Margherita Pizza', description: 'Classic cheese and tomato pizza', price: '149' },
    { id: 'm4-2', name: 'Garlic Bread', description: 'Buttery and topped with garlic', price: '139' },
    { id: 'm4-3', name: 'Choco Lava Cake', description: 'Warm chocolate cake with a molten center', price: '109' },
  ],
  '5': [
    { id: 'm5-1', name: 'Chicken Biryani', description: 'Flavorful rice with chicken', price: '130' },
    { id: 'm5-2', name: 'Parotta', description: 'Layered flatbread', price: '50' },
    { id: 'm5-3', name: 'Gobi Manchurian', description: 'Spicy and tangy cauliflower dish', price: '100' },
  ],
  '6': [
    { id: 'm6-1', name: 'Shawarma Roll', description: 'Grilled meat in a wrap', price: '150' },
    { id: 'm6-2', name: 'Grilled Chicken', description: 'Marinated and grilled chicken', price: '210' },
    { id: 'm6-3', 'name': 'Falafel Platter', description: 'Fried chickpea balls with dips', price: '250' },
  ],
};

export type MenuItem = {
    id: string;
    name: string;
    description: string;
    price: string;
    image?: string;
    imageHint?: string;
}

export default function MenuPage() {
  const params = useParams();
  const shopId = params.shopId as string;

  const shop = shops.find(s => s.id === shopId);
  const menuItems: MenuItem[] = menus[shopId as keyof typeof menus] || [];
  const { addToCart, setSidebarOpen } = useCart();

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    setSidebarOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4 sm:p-8">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-primary font-headline">{shop?.name || 'Menu'}</h1>
                <p className="text-lg text-foreground/80 mt-2">{shop?.description || 'Explore the delicious offerings'}</p>
              </div>
              <Button variant="link" asChild className="hidden md:flex">
                <Link href="/customer" className="flex items-center gap-2">
                  <ArrowLeft /> Back to Shops
                </Link>
              </Button>
            </div>
          </header>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map(item => (
              <Card key={item.id} className="flex flex-col overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
                <CardHeader className="p-0">
                  {item.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        data-ai-hint={item.imageHint}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <CardTitle className="text-xl text-primary">{item.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">{item.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4 pt-0">
                  <p className="text-lg font-semibold text-foreground">₹{item.price}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" onClick={() => handleAddToCart(item)}>
                    <ShoppingCart className="mr-2" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <MobileNav />
      </div>
      <CartSidebar />
    </>
  );
}
