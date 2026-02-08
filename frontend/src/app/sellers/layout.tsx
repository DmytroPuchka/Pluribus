import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sellers | Pluribus',
  description: 'Browse verified sellers from around the world. Connect with sellers from over 50 countries and discover quality products with trusted ratings.',
  keywords: ['sellers', 'verified sellers', 'international sellers', 'seller ratings', 'buyer reviews'],
  openGraph: {
    title: 'Sellers | Pluribus',
    description: 'Browse verified sellers from around the world.',
    type: 'website',
  },
};

export default function SellersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
