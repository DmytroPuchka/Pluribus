import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Pluribus',
  description: 'Sign in to your Pluribus account to access the global marketplace',
  keywords: ['login', 'sign in', 'authentication', 'account'],
  openGraph: {
    title: 'Login - Pluribus',
    description: 'Sign in to your Pluribus account to access the global marketplace',
    type: 'website',
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
