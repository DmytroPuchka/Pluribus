'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useTranslations } from '@/contexts/TranslationsContext'

export default function LoginPage() {
  const { t } = useTranslations()

  // Validation schema
  const loginSchema = z.object({
    email: z
      .string()
      .email(t('auth.login.validation.emailInvalid'))
      .min(1, t('auth.login.validation.emailRequired')),
    password: z
      .string()
      .min(6, t('auth.login.validation.passwordMinLength'))
      .min(1, t('auth.login.validation.passwordRequired')),
    rememberMe: z.boolean(),
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  async function onSubmit(values: LoginFormValues) {
    try {
      setIsLoading(true)
      // TODO: Implement actual login API call
      console.log('Login attempt:', values)
      // Example: const response = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(values) })

      // Mock success for demonstration
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert(t('auth.login.messages.success'))

      // Clear form on successful submission
      form.reset()
    } catch (error) {
      console.error('Login error:', error)
      alert(t('auth.login.messages.failed'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo className="h-10" />
        </div>

        <Card>
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">{t('auth.login.title')}</CardTitle>
            <CardDescription>
              {t('auth.login.subtitle')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.login.email')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                          <Input
                            type="email"
                            placeholder={t('auth.login.placeholders.email')}
                            className="pl-10"
                            {...field}
                          />
                        </div>
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
                      <FormLabel>{t('auth.login.password')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('auth.login.placeholders.password')}
                            className="pl-10 pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remember Me Checkbox */}
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={field.value}
                        onChange={field.onChange}
                        className="w-4 h-4 rounded border border-input cursor-pointer"
                      />
                      <Label htmlFor="rememberMe" className="cursor-pointer font-normal">
                        {t('auth.login.rememberMe')}
                      </Label>
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
                  {isLoading ? t('auth.login.submitting') : t('auth.login.submit')}
                </Button>
              </form>
            </Form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">{t('auth.login.or')}</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground">
              {t('auth.login.noAccount')}{' '}
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                {t('auth.login.signupLink')}
              </Link>
            </p>

            {/* Forgot Password Link */}
            <p className="text-center text-sm mt-4">
              <Link
                href="/forgot-password"
                className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
              >
                {t('auth.login.forgotPassword')}
              </Link>
            </p>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          {t('auth.login.termsFooter')}{' '}
          <Link href="/terms" className="underline hover:text-foreground">
            {t('auth.login.termsLink')}
          </Link>
          {' '}{t('auth.login.and')}{' '}
          <Link href="/privacy" className="underline hover:text-foreground">
            {t('auth.login.privacyLink')}
          </Link>
        </p>
      </div>
    </div>
  )
}
