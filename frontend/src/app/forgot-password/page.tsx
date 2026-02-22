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
import { useTranslations } from '@/contexts/TranslationsContext'
import { apiClient } from '@/lib/api'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const { t } = useTranslations()

  // Validation schema
  const forgotPasswordSchema = z.object({
    email: z
      .string()
      .email(t('auth.forgotPassword.validation.emailInvalid'))
      .min(1, t('auth.forgotPassword.validation.emailRequired')),
  })

  type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
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

      // Request password reset
      await apiClient.post('/auth/forgot-password', {
        email: values.email,
      })

      toast.success(t('auth.forgotPassword.success.title'), {
        description: t('auth.forgotPassword.success.message'),
      })

      setSubmittedEmail(values.email)
      setIsSubmitted(true)
    } catch (err: any) {
      console.error('Forgot password error:', err)
      const errorMessage = err?.response?.data?.error || t('auth.forgotPassword.errors.generic')
      setError(errorMessage)
      toast.error(t('auth.forgotPassword.errors.failedToProcess'), {
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    try {
      setIsLoading(true)

      // Resend password reset email
      await apiClient.post('/auth/forgot-password', {
        email: submittedEmail,
      })

      toast.success(t('auth.forgotPassword.resend.success'), {
        description: t('auth.forgotPassword.success.message'),
      })
    } catch (err: any) {
      console.error('Resend error:', err)
      const errorMessage = err?.response?.data?.error || t('auth.forgotPassword.errors.failedToResend')
      setError(errorMessage)
      toast.error(t('auth.forgotPassword.errors.failedToResend'), {
        description: errorMessage,
      })
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
          {t('auth.forgotPassword.backToLogin')}
        </Link>

        {/* Header with Logo */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <Logo size="lg" href="/" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{t('auth.forgotPassword.title')}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSubmitted
              ? t('auth.forgotPassword.subtitleSuccess')
              : t('auth.forgotPassword.subtitle')}
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
                  <h2 className="text-lg font-semibold text-foreground">{t('auth.forgotPassword.success.title')}</h2>
                  <p className="text-sm text-muted-foreground">
                    {t('auth.forgotPassword.success.message')} <span className="font-medium text-foreground">{submittedEmail}</span>
                  </p>
                </div>

                {/* Instructions */}
                <div className="rounded-lg bg-blue-50/50 p-4 text-sm text-muted-foreground space-y-2">
                  <p>{t('auth.forgotPassword.success.instructions1')}</p>
                  <p>{t('auth.forgotPassword.success.instructions2')}</p>
                </div>

                {/* Resend Email Button */}
                <Button
                  onClick={handleResendEmail}
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? t('auth.forgotPassword.resend.sending') : t('auth.forgotPassword.resend.button')}
                </Button>

                {/* Back to Login Button */}
                <Button
                  onClick={handleBackToLogin}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {t('auth.forgotPassword.backToLoginButton')}
                </Button>

                {/* Help Text */}
                <p className="text-center text-xs text-muted-foreground">
                  {t('auth.forgotPassword.help.trouble')}{' '}
                  <Link href="/contact-support" className="text-primary hover:underline">
                    {t('auth.forgotPassword.help.contactSupport')}
                  </Link>
                </p>
              </div>
            ) : (
              // Form State
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Instructions */}
                  <div className="rounded-lg bg-blue-50/50 p-3 text-sm text-muted-foreground">
                    <p>{t('auth.forgotPassword.instructions')}</p>
                  </div>

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">{t('auth.forgotPassword.email')}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="email"
                              placeholder={t('auth.forgotPassword.placeholders.email')}
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
                    {isLoading ? t('auth.forgotPassword.submitting') : t('auth.forgotPassword.submit')}
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
            {t('auth.forgotPassword.rememberPassword')}{' '}
            <Link href="/login" className="text-primary font-medium hover:underline">
              {t('auth.forgotPassword.signInInstead')}
            </Link>
          </p>
          <p>
            {t('auth.forgotPassword.noAccount')}{' '}
            <Link href="/register" className="text-primary font-medium hover:underline">
              {t('auth.forgotPassword.signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
