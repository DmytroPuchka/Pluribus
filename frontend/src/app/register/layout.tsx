import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | Pluribus - International Delivery Marketplace',
  description: 'Create your Pluribus account and start buying or selling internationally. Join our global community of buyers and sellers today.',
  keywords: ['register', 'sign up', 'create account', 'pluribus', 'international marketplace'],
  openGraph: {
    title: 'Register | Pluribus - International Delivery Marketplace',
    description: 'Create your Pluribus account and start buying or selling internationally.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
