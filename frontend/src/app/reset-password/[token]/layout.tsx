import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset Password - Pluribus',
  description: 'Create a new password for your Pluribus account.',
  keywords: ['reset password', 'password recovery', 'new password', 'authentication'],
  openGraph: {
    title: 'Reset Password - Pluribus',
    description: 'Create a new password for your Pluribus account.',
    type: 'website',
  },
}

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
