import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Store } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold text-primary">
          CampusConnect
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-foreground/80">
          Your campus, connected. Order food and products with ease.
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 text-foreground font-headline">Choose Your Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/customer" className="group">
            <Card className="h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">I'm a Customer</CardTitle>
                <CardDescription className="text-base">
                  Browse menus, place orders, and get your items quickly.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-semibold text-accent group-hover:underline">Proceed as a customer &rarr;</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/vendor" className="group">
            <Card className="h-full transform transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Store className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">I'm a Vendor</CardTitle>
                <CardDescription className="text-base">
                  Manage orders, update your menu, and grow your business.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-semibold text-accent group-hover:underline">Proceed as a vendor &rarr;</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
