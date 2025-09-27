
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { LoginForm } from './login-form';
import React from 'react';

export default function Login() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Users className="h-12 w-12 text-primary" />
            </div>
            <CardTitle>Customer Login</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
            {isClient && <LoginForm />}
        </CardContent>
      </Card>
    </div>
  );
}
