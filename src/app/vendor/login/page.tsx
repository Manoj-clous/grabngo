
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Store } from 'lucide-react';
import { LoginForm } from './login-form';
import React from 'react';

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Store className="h-12 w-12 text-primary" />
            </div>
            <CardTitle>Vendor Login</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
            <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
