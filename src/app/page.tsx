import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Store, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-bold text-primary animate-fade-in-down">
          GrabNgo
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto animate-fade-in-up">
          Campus cravings, delivered. Your favorite eats, just a tap away.
        </p>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/customer/login" className="group">
            <Card className="h-full transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-primary/20 border-2 border-transparent group-hover:border-primary/50">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4 transition-colors duration-300">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl font-semibold">I'm a Customer</CardTitle>
                <CardDescription>
                  Order delicious food and get it delivered in a flash.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="ghost" className="text-primary font-semibold group-hover:translate-x-2 transition-transform">
                  Order Now <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/vendor/login" className="group">
            <Card className="h-full transform transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-accent-foreground/10 border-2 border-transparent group-hover:border-foreground/20">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-secondary rounded-full mb-4 transition-colors duration-300">
                  <Store className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl font-semibold">I'm a Vendor</CardTitle>
                <CardDescription>
                  Reach more customers and streamline your campus business.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                 <Button variant="ghost" className="text-foreground/80 font-semibold group-hover:translate-x-2 transition-transform">
                  Manage Store <ArrowRight className="ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
