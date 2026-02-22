'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from '@/contexts/TranslationsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/common/Logo';
import { CheckCircle2, XCircle, Loader2, Mail } from 'lucide-react';
import { apiClient } from '@/lib/api';

export default function VerifyEmailPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'already-verified'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setErrorMessage('Verification token is missing');
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await apiClient.post('/auth/verify-email', { token: verificationToken });

      if (response.data.data?.code === 'ALREADY_VERIFIED') {
        setStatus('already-verified');
      } else {
        setStatus('success');
        setTimeout(() => {
          router.push('/login?verified=true');
        }, 3000);
      }
    } catch (error: any) {
      console.error('Verification error:', error);
      setStatus('error');

      const errorCode = error?.response?.data?.code;
      const errorMsg = error?.response?.data?.error;

      if (errorCode === 'INVALID_TOKEN' || errorCode === 'TOKEN_EXPIRED') {
        setErrorMessage(errorMsg || 'The verification link is invalid or has expired');
      } else if (errorCode === 'USER_NOT_FOUND') {
        setErrorMessage('User not found');
      } else {
        setErrorMessage(errorMsg || 'Failed to verify email. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="lg" href="/" />
        </div>

        <Card className="border shadow-lg">
          {status === 'verifying' && (
            <>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{t('auth.emailVerification.verify.verifying')}</CardTitle>
              </CardHeader>
            </>
          )}

          {status === 'success' && (
            <>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{t('auth.emailVerification.verify.success.title')}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {t('auth.emailVerification.verify.success.message')}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  onClick={() => router.push('/login')}
                  className="w-full"
                >
                  {t('auth.emailVerification.verify.success.button')}
                </Button>
              </CardContent>
            </>
          )}

          {status === 'already-verified' && (
            <>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{t('auth.emailVerification.verify.alreadyVerified.title')}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {t('auth.emailVerification.verify.alreadyVerified.message')}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  onClick={() => router.push('/login')}
                  className="w-full"
                >
                  {t('auth.emailVerification.verify.alreadyVerified.button')}
                </Button>
              </CardContent>
            </>
          )}

          {status === 'error' && (
            <>
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">{t('auth.emailVerification.verify.failed.title')}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {errorMessage || t('auth.emailVerification.verify.failed.message')}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  onClick={() => router.push('/login')}
                  className="w-full"
                >
                  {t('auth.emailVerification.verify.alreadyVerified.button')}
                </Button>

                <Button
                  onClick={() => router.push('/register')}
                  variant="outline"
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t('auth.emailVerification.verify.failed.button')}
                </Button>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
