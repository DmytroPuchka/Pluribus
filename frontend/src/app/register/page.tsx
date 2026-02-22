'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Mail, Lock, User, Globe, MapPin, UserCheck, Truck } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { CountrySelect } from '@/components/CountrySelect';
import { countries, getCountryName, getSortedCountries } from '@/utils/countries';

export default function RegisterPage() {
  const { t, language } = useTranslations();
  const { register: registerUser } = useAuth();
  const router = useRouter();

  // Get sorted countries based on current language
  const sortedCountries = getSortedCountries(language);

  // Search state for delivery countries
  const [deliveryCountrySearch, setDeliveryCountrySearch] = useState('');

  const registrationSchema = z.object({
    name: z.string().min(2, {
      message: t('auth.signup.validation.nameMinLength'),
    }),
    email: z.string().email({
      message: t('auth.signup.validation.emailInvalid'),
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters',
    }),
    confirmPassword: z.string(),
    country: z.string().min(1, {
      message: t('auth.signup.validation.countryRequired'),
    }),
    city: z.string().min(2, {
      message: t('auth.signup.validation.cityMinLength'),
    }),
    role: z.enum(['BUYER', 'SELLER'], {
      message: t('auth.signup.validation.roleRequired'),
    }),
    deliveryCountries: z.array(z.string()).optional(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('auth.signup.validation.passwordMismatch'),
    path: ['confirmPassword'],
  }).refine((data) => {
    // Delivery countries required for sellers
    if (data.role === 'SELLER') {
      return data.deliveryCountries && data.deliveryCountries.length > 0;
    }
    return true;
  }, {
    message: t('auth.signup.validation.deliveryCountriesRequired'),
    path: ['deliveryCountries'],
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
      role: 'SELLER',
      deliveryCountries: [],
    },
  });

  // Watch the role field to show/hide delivery countries
  const selectedRole = form.watch('role');

  // Filter countries based on search
  const filteredCountries = sortedCountries.filter((country) => {
    const searchLower = deliveryCountrySearch.toLowerCase();
    const countryName = language === 'uk' ? country.uk : country.en;
    return countryName.toLowerCase().includes(searchLower) ||
           country.en.toLowerCase().includes(searchLower);
  });

  async function onSubmit(values: RegistrationFormValues) {
    setIsLoading(true);
    try {
      // Register user via API
      const response = await registerUser({
        email: values.email,
        password: values.password,
        name: values.name,
        role: values.role,
        country: values.country,
        city: values.city,
        deliveryCountries: values.role === 'SELLER' ? values.deliveryCountries : undefined,
      });

      // Check if email verification is required
      if (response?.requiresEmailVerification) {
        // Show success message about email verification
        toast.success('Registration successful!', {
          description: 'Please check your email to verify your account.',
        });

        // Redirect to email verification sent page
        setTimeout(() => {
          router.push(`/email-verification-sent?email=${encodeURIComponent(values.email)}`);
        }, 1000);
      } else {
        // Show success message for immediate login
        toast.success('Registration successful!', {
          description: `Welcome to Pluribus, ${values.name}!`,
        });

        // Redirect to dashboard after short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      }
    } catch (error: any) {
      // Handle specific error codes
      if (error?.response?.status === 409) {
        // Email already exists - this is expected behavior, not a critical error
        console.log('Registration attempt with existing email:', error?.response?.data);

        toast.error(t('auth.signup.errors.emailExists.title'), {
          description: t('auth.signup.errors.emailExists.description'),
        });
        // Highlight the email field
        form.setError('email', {
          type: 'manual',
          message: t('auth.signup.errors.emailExists.field'),
        });
      } else {
        // Generic error - log for debugging
        console.error('Registration error:', error);
        const errorMessage = error?.response?.data?.error || 'Registration failed. Please try again.';
        toast.error(t('auth.signup.errors.general.title'), {
          description: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignUp = () => {
    // Redirect to Google OAuth endpoint
    // Backend will handle creating new user or linking existing account
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
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
                        <CountrySelect
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder={t('auth.signup.placeholders.country')}
                          searchPlaceholder={t('auth.onboarding.location.countrySearchPlaceholder')}
                          emptyMessage={t('auth.onboarding.location.countryEmptyMessage')}
                          language={language}
                          disabled={isLoading}
                        />
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
                          <option value="SELLER">{t('auth.signup.roleOptions.seller')}</option>
                          <option value="BUYER">{t('auth.signup.roleOptions.buyer')}</option>
                        </select>
                      </FormControl>
                      <FormDescription className="text-xs">
                        {t('auth.signup.roleDescription')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Delivery Countries Field - Only for Sellers */}
                {selectedRole === 'SELLER' && (
                  <FormField
                    control={form.control}
                    name="deliveryCountries"
                    render={() => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Truck className="w-4 h-4" />
                          {t('auth.signup.deliveryCountries')}
                        </FormLabel>
                        <FormDescription className="text-xs mb-3">
                          {t('auth.signup.deliveryCountriesDescription')}
                        </FormDescription>
                        <div className="mb-3">
                          <Input
                            type="text"
                            placeholder={t('auth.onboarding.location.countrySearchPlaceholder')}
                            value={deliveryCountrySearch}
                            onChange={(e) => setDeliveryCountrySearch(e.target.value)}
                            disabled={isLoading}
                            className="w-full"
                          />
                        </div>
                        <div className="border rounded-md p-4 max-h-60 overflow-y-auto space-y-3">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                            <FormField
                              key={country.code}
                              control={form.control}
                              name="deliveryCountries"
                              render={({ field }) => {
                                const countryName = language === 'uk' ? country.uk : country.en;
                                return (
                                  <FormItem
                                    key={country.code}
                                    className="flex flex-row items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(country.en)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), country.en])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== country.en
                                                )
                                              );
                                        }}
                                        disabled={isLoading}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {countryName}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              {t('auth.onboarding.location.countryEmptyMessage')}
                            </p>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

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
