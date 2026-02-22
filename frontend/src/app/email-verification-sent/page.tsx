'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from '@/contexts/TranslationsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/common/Logo';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';

export default function EmailVerificationSentPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('Email address not found');
      return;
    }

    setIsResending(true);
    setCanResend(false);

    try {
      await apiClient.post('/auth/resend-verification', { email });

      toast.success(t('auth.emailVerification.sent.success.title'), {
        description: t('auth.emailVerification.sent.success.message'),
      });

      setCountdown(60);
    } catch (error: any) {
      console.error('Resend error:', error);

      if (error?.response?.status === 429) {
        toast.error(t('auth.emailVerification.sent.error.tooManyRequests'));
        setCountdown(60);
      } else if (error?.response?.status === 400 && error?.response?.data?.code === 'ALREADY_VERIFIED') {
        toast.info('Email already verified', {
          description: 'You can now log in to your account.',
        });
        setTimeout(() => router.push('/login'), 2000);
      } else {
        toast.error(t('auth.emailVerification.sent.error.generic'));
        setCanResend(true);
      }
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo size="lg" href="/" />
        </div>

        <Card className="border shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">{t('auth.emailVerification.sent.title')}</CardTitle>
            <CardDescription className="text-base mt-2">
              {t('auth.emailVerification.sent.message')}
            </CardDescription>
            {email && (
              <p className="text-sm font-semibold text-foreground mt-1">{email}</p>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                {t('auth.emailVerification.sent.instructions')}
              </p>
              <p>
                {t('auth.emailVerification.sent.note')}
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>{t('auth.emailVerification.sent.didntReceive')}</strong>
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  {t('auth.emailVerification.sent.checkSpam')}
                </p>
              </div>

              <Button
                onClick={handleResendEmail}
                disabled={!canResend || isResending || countdown > 0}
                variant="outline"
                className="w-full"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    {t('auth.emailVerification.sent.resending')}
                  </>
                ) : countdown > 0 ? (
                  <>{t('auth.emailVerification.sent.resendIn', { seconds: countdown })}</>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    {t('auth.emailVerification.sent.resendButton')}
                  </>
                )}
              </Button>

              <Button
                onClick={() => router.push('/login')}
                variant="ghost"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('auth.emailVerification.sent.backToLogin')}
              </Button>
            </div>

            <div className="mt-6 text-center text-xs text-muted-foreground border-t pt-4">
              <p>
                {t('auth.emailVerification.sent.contactSupport')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
