'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/common/Logo'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'

// Validation schema
const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .min(1, 'Password is required'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

type TokenStatus = 'loading' | 'valid' | 'invalid' | 'expired'

export default function ResetPasswordPage() {
  const params = useParams()
  const token = params.token as string

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>('loading')
  const [error, setError] = useState('')

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        // TODO: Implement actual token validation API call
        console.log('Validating token:', token)
        // Example: const response = await fetch(`/api/auth/reset-password/validate-token?token=${token}`)
        // if (!response.ok) throw new Error('Invalid token')

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800))
        setTokenStatus('valid')
      } catch (err) {
        console.error('Token validation error:', err)
        setTokenStatus('invalid')
        setError('Invalid or expired reset link. Please request a new one.')
      }
    }

    if (token) {
      validateToken()
    }
  }, [token])

  async function onSubmit(values: ResetPasswordFormValues) {
    try {
      setIsLoading(true)
      setError('')

      // TODO: Implement actual password reset API call
      console.log('Resetting password with token:', token)
      // Example: const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     token,
      //     password: values.password
      //   })
      // })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200))

      setIsSubmitted(true)
    } catch (err) {
      console.error('Password reset error:', err)
      setError('Failed to reset password. Please try again.')
      form.setError('root', { message: 'Failed to reset password. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  if (tokenStatus === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50/50 to-white px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <Logo size="lg" href="/" />
            </div>
            <div className="space-y-4">
              <div className="h-8 w-48 animate-pulse rounded bg-muted mx-auto" />
              <div className="h-4 w-64 animate-pulse rounded bg-muted mx-auto" />
            </div>
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-2xl font-bold text-foreground">Create New Password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSubmitted
              ? 'Your password has been reset successfully'
              : 'Enter a new password for your account'}
          </p>
        </div>

        {/* Main Card */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            {tokenStatus === 'invalid' ? (
              // Invalid Token State
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-destructive/10 p-4">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <h2 className="text-lg font-semibold text-foreground">Invalid Link</h2>
                  <p className="text-sm text-muted-foreground">
                    The password reset link has expired or is invalid. Please request a new one.
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <Link href="/forgot-password">
                    Request New Reset Link
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Link href="/login">
                    Back to Login
                  </Link>
                </Button>
              </div>
            ) : isSubmitted ? (
              // Success State
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-50 p-4">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                </div>

                <div className="space-y-2 text-center">
                  <h2 className="text-lg font-semibold text-foreground">Password Reset Successfully</h2>
                  <p className="text-sm text-muted-foreground">
                    Your password has been updated. You can now sign in with your new password.
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <Link href="/login">
                    Sign In
                  </Link>
                </Button>
              </div>
            ) : (
              // Form State
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Password Requirements */}
                  <div className="rounded-lg bg-blue-50/50 p-3 text-sm text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">Password requirements:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>At least 8 characters</li>
                      <li>One uppercase letter</li>
                      <li>One lowercase letter</li>
                      <li>One number</li>
                    </ul>
                  </div>

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="password"
                              placeholder="Enter your new password"
                              type={showPassword ? 'text' : 'password'}
                              autoComplete="new-password"
                              className="pl-10 pr-10"
                              disabled={isLoading}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
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
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              placeholder="Confirm your new password"
                              type={showConfirmPassword ? 'text' : 'password'}
                              autoComplete="new-password"
                              className="pl-10 pr-10"
                              disabled={isLoading}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                              disabled={isLoading}
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
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
                    {isLoading ? 'Resetting password...' : 'Reset Password'}
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

        {/* Help Link */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Having trouble?{' '}
            <Link href="/contact-support" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
