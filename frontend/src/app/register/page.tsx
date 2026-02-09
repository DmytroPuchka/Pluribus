'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Logo } from '@/components/common/Logo';
import { Mail, Lock, User, Globe, MapPin, UserCheck } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Mexico',
  'South Korea',
  'Netherlands',
  'Other',
];

export default function RegisterPage() {
  const { t } = useTranslations();

  const registrationSchema = z.object({
    name: z.string().min(2, {
      message: t('auth.signup.validation.nameMinLength'),
    }),
    email: z.string().email({
      message: t('auth.signup.validation.emailInvalid'),
    }),
    password: z.string().min(8, {
      message: t('auth.signup.validation.passwordMinLength'),
    }),
    confirmPassword: z.string(),
    country: z.string().min(1, {
      message: t('auth.signup.validation.countryRequired'),
    }),
    city: z.string().min(2, {
      message: t('auth.signup.validation.cityMinLength'),
    }),
    role: z.enum(['buyer', 'seller', 'both'], {
      message: t('auth.signup.validation.roleRequired'),
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('auth.signup.validation.passwordMismatch'),
    path: ['confirmPassword'],
  });

  type RegistrationFormValues = z.infer<typeof registrationSchema>;
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      city: '',
      role: 'buyer',
    },
  });

  async function onSubmit(values: RegistrationFormValues) {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Form values:', values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      form.reset();

      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual Google OAuth implementation
      console.log('Google sign up clicked');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Google sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" href="/" />
        </div>

        {/* Main Card */}
        <Card className="border shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">{t('auth.signup.title')}</CardTitle>
            <CardDescription className="text-base">
              {t('auth.signup.subtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  {t('auth.signup.success.message')}
                </p>
              </div>
            )}

            {/* Google OAuth Button */}
            <Button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              variant="outline"
              className="w-full mb-6 h-10"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="20" fill="currentColor">
                  G
                </text>
              </svg>
              {t('auth.signup.google')}
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('auth.signup.or')}</span>
              </div>
            </div>

            {/* Registration Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {t('auth.signup.fullName')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('auth.signup.placeholders.fullName')}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {t('auth.signup.email')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('auth.signup.placeholders.email')}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        {t('auth.signup.password')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t('auth.signup.placeholders.password')}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        {t('auth.signup.passwordDescription')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        {t('auth.signup.confirmPassword')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder={t('auth.signup.placeholders.password')}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country Field */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {t('auth.signup.country')}
                      </FormLabel>
                      <FormControl>
                        <select
                          disabled={isLoading}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">{t('auth.signup.placeholders.country')}</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City Field */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {t('auth.signup.city')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('auth.signup.placeholders.city')}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role Field */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4" />
                        {t('auth.signup.role')}
                      </FormLabel>
                      <FormControl>
                        <select
                          disabled={isLoading}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="buyer">{t('auth.signup.roleOptions.buyer')}</option>
                          <option value="seller">{t('auth.signup.roleOptions.seller')}</option>
                          <option value="both">{t('auth.signup.roleOptions.both')}</option>
                        </select>
                      </FormControl>
                      <FormDescription className="text-xs">
                        {t('auth.signup.roleDescription')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 mt-6"
                >
                  {isLoading ? t('auth.signup.submitting') : t('auth.signup.submit')}
                </Button>
              </form>
            </Form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t('auth.signup.haveAccount')}{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline transition-colors"
                >
                  {t('auth.signup.loginLink')}
                </Link>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-4 text-center text-xs text-muted-foreground">
              <p>
                {t('auth.signup.termsFooter')}{' '}
                <Link href="/terms" className="hover:underline text-primary">
                  {t('auth.signup.termsLink')}
                </Link>
                {' '}{t('auth.signup.and')}{' '}
                <Link href="/privacy" className="hover:underline text-primary">
                  {t('auth.signup.privacyLink')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
