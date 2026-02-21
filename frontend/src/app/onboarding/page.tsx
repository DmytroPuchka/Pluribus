'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, MapPin, Globe, UserCircle } from 'lucide-react';
import axios from 'axios';
import { useTranslations } from '@/contexts/TranslationsContext';
import { CountrySelect } from '@/components/CountrySelect';

const onboardingSchema = z.object({
  role: z.enum(['BUYER', 'SELLER'], {
    required_error: 'Please select a role',
  }),
  country: z.string().min(2, 'Please select a country'),
  city: z.string().min(2, 'City is required'),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { t, language } = useTranslations();

  const token = searchParams.get('token');
  const refresh = searchParams.get('refresh');

  useEffect(() => {
    if (!token || !refresh) {
      toast.error('Invalid onboarding link');
      router.push('/login');
    } else {
      // Save tokens with correct keys
      localStorage.setItem('pluribus_access_token', token);
      localStorage.setItem('pluribus_refresh_token', refresh);
    }
  }, [token, refresh, router]);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      role: 'SELLER',
      country: '',
      city: '',
    },
  });

  async function onSubmit(values: OnboardingFormValues) {
    try {
      setIsLoading(true);

      // Update user profile with onboarding data
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          role: values.role,
          country: values.country,
          city: values.city,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Profile completed!', {
        description: 'Welcome to Pluribus',
      });

      // Redirect to home page with full page reload to refresh auth context
      window.location.href = '/';
    } catch (error: any) {
      console.error('Onboarding error:', error);
      toast.error('Failed to complete profile', {
        description: 'Please try again',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">{t('auth.onboarding.title')}</CardTitle>
            <CardDescription>
              {t('auth.onboarding.subtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Role Selection */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <UserCircle className="w-4 h-4" />
                        {t('auth.onboarding.roleSection.title')}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div>
                            <RadioGroupItem
                              value="SELLER"
                              id="seller"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="seller"
                              className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm font-semibold">{t('auth.onboarding.roleSection.seller.title')}</span>
                              <span className="text-xs text-muted-foreground mt-1">{t('auth.onboarding.roleSection.seller.description')}</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="BUYER"
                              id="buyer"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="buyer"
                              className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <span className="text-sm font-semibold">{t('auth.onboarding.roleSection.buyer.title')}</span>
                              <span className="text-xs text-muted-foreground mt-1">{t('auth.onboarding.roleSection.buyer.description')}</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country Selection */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {t('auth.onboarding.location.country')}
                      </FormLabel>
                      <FormControl>
                        <CountrySelect
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder={t('auth.onboarding.location.countryPlaceholder')}
                          searchPlaceholder={t('auth.onboarding.location.countrySearchPlaceholder')}
                          emptyMessage={t('auth.onboarding.location.countryEmptyMessage')}
                          language={language}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City Input */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {t('auth.onboarding.location.city')}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={t('auth.onboarding.location.cityPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('auth.onboarding.buttons.completing')}
                    </>
                  ) : (
                    t('auth.onboarding.buttons.complete')
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}
