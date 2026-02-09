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
import { useTranslations } from '@/contexts/TranslationsContext'

type TokenStatus = 'loading' | 'valid' | 'invalid' | 'expired'

export default function ResetPasswordPage() {
  const { t } = useTranslations()

  // Validation schema
  const resetPasswordSchema = z.object({
    password: z
      .string()
      .min(8, t('auth.resetPassword.validation.passwordMinLength'))
      .regex(/[A-Z]/, t('auth.resetPassword.validation.passwordUppercase'))
      .regex(/[a-z]/, t('auth.resetPassword.validation.passwordLowercase'))
      .regex(/[0-9]/, t('auth.resetPassword.validation.passwordNumber'))
      .min(1, t('auth.resetPassword.validation.passwordRequired')),
    confirmPassword: z
      .string()
      .min(1, t('auth.resetPassword.validation.confirmPasswordRequired')),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('auth.resetPassword.validation.passwordMismatch'),
    path: ['confirmPassword'],
  })

  type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
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
        setError(t('auth.resetPassword.errors.invalidToken'))
      }
    }

    if (token) {
      validateToken()
    }
  }, [token, t])

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
      setError(t('auth.resetPassword.errors.failedToReset'))
      form.setError('root', { message: t('auth.resetPassword.errors.failedToReset') })
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
          {t('auth.resetPassword.backToLogin')}
        </Link>

        {/* Header with Logo */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <Logo size="lg" href="/" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t('auth.resetPassword.title')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSubmitted
              ? t('auth.resetPassword.subtitleSuccess')
              : t('auth.resetPassword.subtitle')}
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
                  <h2 className="text-lg font-semibold text-foreground">{t('auth.resetPassword.invalidToken.title')}</h2>
                  <p className="text-sm text-muted-foreground">
                    {t('auth.resetPassword.invalidToken.message')}
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <Link href="/forgot-password">
                    {t('auth.resetPassword.invalidToken.requestNew')}
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  <Link href="/login">
                    {t('auth.resetPassword.backToLoginButton')}
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
                  <h2 className="text-lg font-semibold text-foreground">{t('auth.resetPassword.success.title')}</h2>
                  <p className="text-sm text-muted-foreground">
                    {t('auth.resetPassword.success.message')}
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full"
                  size="lg"
                >
                  <Link href="/login">
                    {t('auth.resetPassword.success.signIn')}
                  </Link>
                </Button>
              </div>
            ) : (
              // Form State
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Password Requirements */}
                  <div className="rounded-lg bg-blue-50/50 p-3 text-sm text-muted-foreground space-y-1">
                    <p className="font-medium text-foreground">{t('auth.resetPassword.requirements.title')}</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>{t('auth.resetPassword.requirements.minLength')}</li>
                      <li>{t('auth.resetPassword.requirements.uppercase')}</li>
                      <li>{t('auth.resetPassword.requirements.lowercase')}</li>
                      <li>{t('auth.resetPassword.requirements.number')}</li>
                    </ul>
                  </div>

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">{t('auth.resetPassword.password')}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="password"
                              placeholder={t('auth.resetPassword.placeholders.password')}
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
                        <FormLabel htmlFor="confirmPassword">{t('auth.resetPassword.confirmPassword')}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              placeholder={t('auth.resetPassword.placeholders.confirmPassword')}
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
                    {isLoading ? t('auth.resetPassword.submitting') : t('auth.resetPassword.submit')}
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
            {t('auth.resetPassword.help.trouble')}{' '}
            <Link href="/contact-support" className="text-primary hover:underline">
              {t('auth.resetPassword.help.contactSupport')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
