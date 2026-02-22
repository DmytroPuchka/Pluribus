'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/contexts/TranslationsContext';

interface ChatPageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default function ChatPage({ params }: ChatPageProps) {
  const { t } = useTranslations();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { userId } = use(params);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleBack = () => {
    router.back();
  };

  if (isLoading || !user) {
    return (
      <div className="container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-muted animate-pulse rounded w-1/3 mb-4" />
          <div className="h-96 bg-muted animate-pulse rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('common.buttons.back')}
          </Button>
        </div>

        {/* Chat Interface Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              {t('pages.chat.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">
                {t('pages.chat.comingSoon')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('pages.chat.description')}
              </p>
              <Button onClick={handleBack}>
                {t('common.buttons.back')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
