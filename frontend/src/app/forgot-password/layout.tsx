import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot Password - Pluribus',
  description: 'Reset your Pluribus account password. Enter your email to receive a password reset link.',
  keywords: ['forgot password', 'password reset', 'account recovery', 'authentication'],
  openGraph: {
    title: 'Forgot Password - Pluribus',
    description: 'Reset your Pluribus account password. Enter your email to receive a password reset link.',
    type: 'website',
  },
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
