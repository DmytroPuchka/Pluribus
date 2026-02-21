'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = () => {
      const token = searchParams.get('token');
      const refresh = searchParams.get('refresh');
      const error = searchParams.get('error');

      if (error) {
        toast.error('Google Sign In failed', {
          description: 'Please try again with email/password',
        });
        router.push('/login');
        return;
      }

      if (token && refresh) {
        // Save tokens to localStorage with correct keys
        localStorage.setItem('pluribus_access_token', token);
        localStorage.setItem('pluribus_refresh_token', refresh);

        toast.success('Signed in successfully!', {
          description: 'Welcome to Pluribus',
        });

        // Redirect to home page with full page reload to refresh auth context
        window.location.href = '/';
      } else {
        toast.error('Authentication failed', {
          description: 'Missing authentication tokens',
        });
        router.push('/login');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary" />
        <p className="text-lg text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
