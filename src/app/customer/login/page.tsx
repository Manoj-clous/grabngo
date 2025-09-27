import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="items-center text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Users className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Customer Login</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="id">ID</Label>
                    <Input id="id" placeholder="Enter your ID" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-6">
                <Button asChild className="w-full">
                    <Link href="/customer">Login</Link>
                </Button>
                <Button variant="link" asChild>
                    <Link href="/">&larr; Back to Home</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
