'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/common/Logo'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react'

// Validation schema
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [error, setError] = useState('')

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      setIsLoading(true)
      setError('')

      // TODO: Implement actual password reset API call
      console.log('Password reset requested for:', values.email)
      // Example: const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   body: JSON.stringify(values)
      // })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200))

      setSubmittedEmail(values.email)
      setIsSubmitted(true)
    } catch (err) {
      console.error('Forgot password error:', err)
      setError('An error occurred. Please try again.')
      form.setError('root', { message: 'Failed to process password reset. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    try {
      setIsLoading(true)

      // TODO: Implement actual resend email API call
      console.log('Resending password reset email to:', submittedEmail)
      // Example: const response = await fetch('/api/auth/forgot-password/resend', {
      //   method: 'POST',
      //   body: JSON.stringify({ email: submittedEmail })
      // })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (err) {
      console.error('Resend error:', err)
      setError('Failed to resend email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    setIsSubmitted(false)
    form.reset()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50/50 to-white px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/login"
          className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>

        {/* Header with Logo */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <Logo size="lg" href="/" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Reset Your Password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSubmitted
              ? 'Check your email for a password reset link'
              : 'Enter your email address and we\'ll send you a link to reset your password'}
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            {isSubmitted ? (
              // Success State
              <div className="space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-50 p-4">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                </div>

                {/* Success Message */}
                <div className="space-y-2 text-center">
                  <h2 className="text-lg font-semibold text-foreground">Check your email</h2>
                  <p className="text-sm text-muted-foreground">
                    We've sent a password reset link to <span className="font-medium text-foreground">{submittedEmail}</span>
                  </p>
                </div>

                {/* Instructions */}
                <div className="rounded-lg bg-blue-50/50 p-4 text-sm text-muted-foreground space-y-2">
                  <p>The reset link will expire in 24 hours.</p>
                  <p>If you don't see the email, check your spam folder.</p>
                </div>

                {/* Resend Email Button */}
                <Button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? 'Sending...' : 'Didn\'t receive the email? Resend'}
                </Button>

                {/* Back to Login Button */}
                <Button
                  onClick={handleBackToLogin}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  Back to Login
                </Button>

                {/* Help Text */}
                <p className="text-center text-xs text-muted-foreground">
                  Having trouble?{' '}
                  <Link href="/contact-support" className="text-primary hover:underline">
                    Contact support
                  </Link>
                </p>
              </div>
            ) : (
              // Form State
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Instructions */}
                  <div className="rounded-lg bg-blue-50/50 p-3 text-sm text-muted-foreground">
                    <p>Enter the email address associated with your account, and we'll send you a link to reset your password.</p>
                  </div>

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="email"
                              placeholder="name@example.com"
                              type="email"
                              autoComplete="email"
                              className="pl-10"
                              disabled={isLoading}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Error Message */}
                  {error && (
                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? 'Sending reset link...' : 'Send Reset Link'}
                  </Button>

                  {/* Root Error Message */}
                  {form.formState.errors.root && (
                    <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                      {form.formState.errors.root.message}
                    </div>
                  )}
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        {/* Additional Help Links */}
        <div className="mt-6 text-center space-y-2 text-sm text-muted-foreground">
          <p>
            Remember your password?{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Sign in instead
            </Link>
          </p>
          <p>
            Don't have an account?{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
