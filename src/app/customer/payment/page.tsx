
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { CheckCircle, CreditCard, Loader } from 'lucide-react';

export default function PaymentPage() {
  const { total, clearCart, cart, setOrderStatus } = useCart();
  const router = useRouter();
  const [token, setToken] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');

  useEffect(() => {
    // Ensure this runs only on the client
    setToken(Math.floor(100000 + Math.random() * 900000));
  }, []);
  
  useEffect(() => {
    if (cart.length === 0 && paymentStatus !== 'success') {
      router.replace('/customer');
    }
  }, [cart, router, paymentStatus]);

  const handleConfirmPayment = () => {
    setPaymentStatus('processing');
    // Simulate payment processing
    setTimeout(() => {
        setPaymentStatus('success');
        setOrderStatus('ready for pickup');
    }, 2000);
  };

  const handleNewOrder = () => {
    clearCart();
    router.push('/customer');
  };

  const renderContent = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
            <Loader className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-medium">Processing your payment...</p>
            <p className="text-muted-foreground">Please wait a moment.</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-4">Your order is being prepared and will be ready for pickup shortly.</p>
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium text-foreground">Your Token</p>
                <p className="text-3xl font-bold text-primary tracking-widest">{token}</p>
            </div>
          </div>
        );
      default:
        return (
          <>
            <CardHeader>
              <CardTitle>Confirm Your Payment</CardTitle>
              <CardDescription>Review your order and complete the payment.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-2xl font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
                {token !== null ? (
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Your Order Token</p>
                        <p className="text-2xl font-bold tracking-widest">{token}</p>
                    </div>
                ) : (
                    <div className="bg-muted/50 p-4 rounded-lg text-center">
                        <p className="text-sm text-muted-foreground">Generating token...</p>
                    </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleConfirmPayment}>
                <CreditCard className="mr-2" />
                Confirm Payment
              </Button>
            </CardFooter>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <Card className="w-full max-w-md">
        {renderContent()}
        {paymentStatus === 'success' && (
            <CardFooter>
                <Button className="w-full" onClick={handleNewOrder}>
                    Place a New Order
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
