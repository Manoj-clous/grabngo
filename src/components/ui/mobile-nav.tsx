
'use client';

import Link from 'next/link';
import { Home, ShoppingCart, User, Receipt } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/customer', label: 'Shops', icon: Home },
  { href: '/customer/orders', label: 'Orders', icon: Receipt },
  { href: '/customer/profile', label: 'Profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card border-t border-border shadow-t-lg">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href) && (item.href !== '/customer' || pathname === '/customer');
          return (
            <Link
              href={item.href}
              key={item.label}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full text-foreground/70 transition-colors',
                isActive ? 'text-primary' : 'hover:text-primary/90'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
