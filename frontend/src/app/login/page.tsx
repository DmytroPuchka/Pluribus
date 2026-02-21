'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
import { Mail, Lock, Eye, EyeOff, UserCircle } from 'lucide-react'
import { useTranslations } from '@/contexts/TranslationsContext'
import { useAuth } from '@/contexts/AuthContext'
import { TEST_ACCOUNTS } from '@/data/mockUsers'
import { toast } from 'sonner'
import { useGoogleLogin } from '@react-oauth/google'

type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

const createLoginSchema = (t: any) => z.object({
  email: z
    .string()
    .email(t('auth.login.validation.emailInvalid'))
    .min(1, t('auth.login.validation.emailRequired')),
  password: z
    .string()
    .min(6, t('auth.login.validation.passwordMinLength'))
    .min(1, t('auth.login.validation.passwordRequired')),
  rememberMe: z.boolean(),
});

export default function LoginPage() {
  const { t } = useTranslations()
  const { login } = useAuth()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loginSchema = createLoginSchema(t)

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

      // Authenticate with real API
      await login({
        email: values.email,
        password: values.password,
      })

      // Login successful
      toast.success(t('auth.login.messages.success'), {
        description: `Welcome back!`,
      })

      // Redirect to dashboard or home
      setTimeout(() => {
        router.push('/dashboard')
      }, 300)
    } catch (error: any) {
      console.error('Login error:', error)
      const errorMessage = error?.response?.data?.error || 'Invalid email or password'
      toast.error(t('auth.login.messages.failed'), {
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Quick login with test account
  const handleQuickLogin = async (email: string, password: string) => {
    form.setValue('email', email)
    form.setValue('password', password)
    await form.handleSubmit(onSubmit)()
  }

  // Google OAuth login
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: () => {
      // Redirect to Google OAuth endpoint
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    },
    onError: () => {
      toast.error('Google Sign In failed', {
        description: 'Please try again or use email/password',
      });
    },
  });

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

            {/* Google Sign In Button */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => handleGoogleLogin()}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

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

        {/* Test Accounts - For Development */}
        <Card className="mt-6 border-dashed border-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <UserCircle className="w-4 h-4" />
              Test Accounts (Development)
            </CardTitle>
            <CardDescription className="text-xs">
              Click to quickly login with test accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {TEST_ACCOUNTS.map((account) => (
              <Button
                key={account.id}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3"
                onClick={() => handleQuickLogin(account.email, account.password)}
                disabled={isLoading}
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{account.name}</span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                      {account.role}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {account.email} / {account.password}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {account.description}
                  </div>
                </div>
              </Button>
            ))}
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
