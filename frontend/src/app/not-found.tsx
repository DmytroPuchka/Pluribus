import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-6">
            <FileQuestion className="w-16 h-16 text-blue-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
          <p className="text-lg text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. The page may have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button asChild size="lg">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/help">Get Help</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
