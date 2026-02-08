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

const registrationSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string(),
  country: z.string().min(1, {
    message: 'Please select a country.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  role: z.enum(['buyer', 'seller', 'both'], {
    message: 'Please select a role.',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

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
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-base">
              Join Pluribus to buy and sell internationally
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  Account created successfully! Please check your email to verify.
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
              Sign up with Google
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or continue with email</span>
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
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
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
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
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
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        At least 8 characters for security
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
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
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
                        Country
                      </FormLabel>
                      <FormControl>
                        <select
                          disabled={isLoading}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="">Select a country</option>
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
                        City
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New York"
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
                        I want to be a
                      </FormLabel>
                      <FormControl>
                        <select
                          disabled={isLoading}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="buyer">Buyer</option>
                          <option value="seller">Seller</option>
                          <option value="both">Both Buyer & Seller</option>
                        </select>
                      </FormControl>
                      <FormDescription className="text-xs">
                        You can change this later in your profile settings
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
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </Form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary hover:underline transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Terms */}
            <div className="mt-4 text-center text-xs text-muted-foreground">
              <p>
                By creating an account, you agree to our{' '}
                <Link href="/terms" className="hover:underline text-primary">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="hover:underline text-primary">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
