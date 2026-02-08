/**
 * Product Details Page Error State
 * Error boundary for product details page
 */

'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Product details page error:', error);
  }, [error]);

  return (
    <div className="container px-4 py-16">
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-semibold mb-2">Something went wrong!</h2>

          <p className="text-muted-foreground mb-6">
            We couldn't load the product details. Please try again.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={reset}>Try Again</Button>
            <Button variant="outline" asChild>
              <Link href="/products">Back to Products</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
