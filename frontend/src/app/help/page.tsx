'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Play,
  ArrowRight,
  Shield,
  Truck,
  CreditCard,
  Package,
  Lock,
  AlertCircle,
  Phone,
  Mail,
  Globe2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from '@/contexts/TranslationsContext';

interface FAQItem {
  id: string;
  category: 'Getting Started' | 'Buying' | 'Selling' | 'Payments' | 'Shipping' | 'Safety' | 'Account';
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

const faqItems: FAQItem[] = [
  // Getting Started
  {
    id: 'gs-1',
    category: 'Getting Started',
    question: 'What is Pluribus?',
    answer:
      'Pluribus is an international marketplace that connects buyers and sellers across the globe. We simplify cross-border shopping and selling by handling logistics, payments, and customer protection.',
    icon: <Globe2 className="w-5 h-5" />,
  },
  {
    id: 'gs-2',
    category: 'Getting Started',
    question: 'How do I get started as a buyer?',
    answer:
      'Sign up for a free account, verify your email, and you\'re ready to browse products. Add items to your cart, proceed to checkout, and select your preferred payment method. No additional steps needed!',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 'gs-3',
    category: 'Getting Started',
    question: 'How do I become a seller?',
    answer:
      'Visit our sellers page and click "Become a Seller". Complete your profile with basic information, business details, and banking information. We\'ll verify your account within 24-48 hours.',
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: 'gs-4',
    category: 'Getting Started',
    question: 'Is Pluribus available in my country?',
    answer:
      'Pluribus currently operates in 150+ countries. Check our coverage map on the homepage to see if your country is supported. We\'re constantly expanding our network.',
    icon: <AlertCircle className="w-5 h-5" />,
  },

  // Buying
  {
    id: 'buy-1',
    category: 'Buying',
    question: 'How do I search for products?',
    answer:
      'Use the search bar on our homepage to find products by name, category, or keywords. You can filter results by price, shipping time, seller rating, and more. Browse our categories or check trending products.',
    icon: <Search className="w-5 h-5" />,
  },
  {
    id: 'buy-2',
    category: 'Buying',
    question: 'Can I return items I purchased?',
    answer:
      'Yes! We offer a 30-day return policy on most items. If the product doesn\'t match the description or arrives damaged, contact us within 30 days for a full refund or replacement.',
    icon: <ArrowRight className="w-5 h-5" />,
  },
  {
    id: 'buy-3',
    category: 'Buying',
    question: 'How do I know if a seller is trustworthy?',
    answer:
      'Each seller has a rating based on customer reviews, delivery time, and dispute resolution. Look for the verified seller badge and read recent customer reviews before making a purchase.',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 'buy-4',
    category: 'Buying',
    question: 'Can I contact sellers directly?',
    answer:
      'Yes! Use the messaging feature on the product page to ask questions about items, negotiate prices, or request bulk orders. Sellers typically respond within 24 hours.',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    id: 'buy-5',
    category: 'Buying',
    question: 'Do you offer bulk discounts?',
    answer:
      'Many sellers offer bulk pricing. Contact the seller directly through our messaging system to inquire about volume discounts. Some sellers may offer special rates for large orders.',
    icon: <Package className="w-5 h-5" />,
  },

  // Selling
  {
    id: 'sell-1',
    category: 'Selling',
    question: 'What are the seller fees?',
    answer:
      'Pluribus charges a 5-8% commission on successful sales (depending on your category) plus payment processing fees. We handle all marketing, customer support, and dispute resolution.',
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: 'sell-2',
    category: 'Selling',
    question: 'How do I list a product?',
    answer:
      'Log in to your seller dashboard, click "Create Listing", fill in product details, upload photos, set pricing, and publish. Your listing goes live immediately. You can edit listings anytime.',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    id: 'sell-3',
    category: 'Selling',
    question: 'Can I sell from any country?',
    answer:
      'We support sellers in 100+ countries. Some product categories have geographic restrictions due to shipping or regulatory requirements. Check category requirements during the listing process.',
    icon: <AlertCircle className="w-5 h-5" />,
  },
  {
    id: 'sell-4',
    category: 'Selling',
    question: 'How long until I receive payment?',
    answer:
      'Payments are processed weekly. You\'ll receive funds 5-10 business days after the payment processing date. Your seller dashboard shows all payment history and pending amounts.',
    icon: <CreditCard className="w-5 h-5" />,
  },

  // Payments
  {
    id: 'pay-1',
    category: 'Payments',
    question: 'What payment methods do you accept?',
    answer:
      'We accept credit cards, debit cards, digital wallets (PayPal, Apple Pay, Google Pay), bank transfers, and cryptocurrency. All transactions are encrypted and secure.',
    icon: <Lock className="w-5 h-5" />,
  },
  {
    id: 'pay-2',
    category: 'Payments',
    question: 'Is my payment information safe?',
    answer:
      'Yes, we use bank-level encryption and comply with PCI DSS standards. Your payment information is never stored on our servers after transaction completion.',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 'pay-3',
    category: 'Payments',
    question: 'Do you charge any hidden fees?',
    answer:
      'No hidden fees. All charges are shown before you complete payment: product price, shipping cost, taxes (if applicable), and Pluribus service fee. You\'ll see the exact total before checkout.',
    icon: <AlertCircle className="w-5 h-5" />,
  },

  // Shipping
  {
    id: 'ship-1',
    category: 'Shipping',
    question: 'How long does international shipping take?',
    answer:
      'Standard international shipping takes 10-30 business days depending on origin, destination, and carrier. Express options (5-10 days) are available for most routes at a higher cost.',
    icon: <Truck className="w-5 h-5" />,
  },
  {
    id: 'ship-2',
    category: 'Shipping',
    question: 'Can I track my order?',
    answer:
      'Yes! You\'ll receive a tracking number via email as soon as your order ships. Track your package in real-time through our website or directly with the carrier.',
    icon: <Package className="w-5 h-5" />,
  },

  // Safety
  {
    id: 'safe-1',
    category: 'Safety',
    question: 'How are my purchases protected?',
    answer:
      'Pluribus Buyer Protection covers all purchases. If items don\'t arrive, aren\'t as described, or are damaged, you can open a dispute and receive a refund or replacement.',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 'safe-2',
    category: 'Safety',
    question: 'What should I do if I receive a damaged item?',
    answer:
      'Document the damage with photos, open a dispute within 7 days of delivery, and provide evidence. Our team will review and either authorize a replacement or process a refund.',
    icon: <AlertCircle className="w-5 h-5" />,
  },

  // Account
  {
    id: 'acc-1',
    category: 'Account',
    question: 'How do I reset my password?',
    answer:
      'Click "Forgot Password" on the login page, enter your email, and we\'ll send a reset link. Click the link and create a new password. You can then log in immediately.',
    icon: <Lock className="w-5 h-5" />,
  },
  {
    id: 'acc-2',
    category: 'Account',
    question: 'Can I delete my account?',
    answer:
      'Yes, you can delete your account from your account settings. Note: you must settle any pending orders or disputes first. Deletion is permanent and cannot be undone.',
    icon: <AlertCircle className="w-5 h-5" />,
  },
];

const popularTopics = [
  { title: 'How to place an order', link: '#buying' },
  { title: 'Shipping & Delivery', link: '#shipping' },
  { title: 'Payment Methods', link: '#payments' },
  { title: 'Seller Requirements', link: '#selling' },
  { title: 'Buyer Protection', link: '#safety' },
  { title: 'Return Policy', link: '#buying' },
];

const categories = ['Getting Started', 'Buying', 'Selling', 'Payments', 'Shipping', 'Safety', 'Account'];

export default function HelpPage() {
  const { t } = useTranslations();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFaqs = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const groupedFaqs = useMemo(() => {
    const grouped: { [key: string]: FAQItem[] } = {};
    filteredFaqs.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  }, [filteredFaqs]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              {t('pages.help.hero.title')} <span className="text-blue-600">{t('pages.help.hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {t('pages.help.hero.subtitle')}
            </p>

            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('pages.help.hero.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="font-semibold mb-4 text-lg">{t('pages.help.categories.title')}</h3>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    {t('pages.help.categories.allTopics')}
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="lg:col-span-3">
              {Object.entries(groupedFaqs).length > 0 ? (
                Object.entries(groupedFaqs).map(([category, items]) => (
                  <div key={category} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">{category}</h2>
                    <Accordion type="single" collapsible className="space-y-3">
                      {items.map((item) => (
                        <AccordionItem
                          key={item.id}
                          value={item.id}
                          className="border rounded-lg px-6 py-0 data-[state=open]:bg-blue-50"
                        >
                          <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-start gap-3 text-left">
                              {item.icon && <div className="mt-1 text-blue-600">{item.icon}</div>}
                              <span className="font-medium">{item.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-4">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No results found. Try adjusting your search or selecting different categories.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Popular Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularTopics.map((topic) => (
                <Link key={topic.title} href={topic.link}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex items-center justify-between">
                      <span className="font-medium">{topic.title}</span>
                      <ArrowRight className="w-5 h-5 text-blue-600" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Guide */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Getting Started Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Buyer's Guide
                  </CardTitle>
                  <CardDescription>
                    Learn how to find products, place orders, and track deliveries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/how-it-works">
                    <Button variant="outline" className="w-full">
                      Read Guide <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    Seller's Guide
                  </CardTitle>
                  <CardDescription>
                    Start selling on Pluribus and reach global customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/sellers">
                    <Button variant="outline" className="w-full">
                      Read Guide <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Video Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'How to Place Your First Order', duration: '3:45' },
                { title: 'Understanding Shipping Options', duration: '5:20' },
                { title: 'Payment Methods Explained', duration: '4:15' },
                { title: 'Seller Account Setup', duration: '6:30' },
              ].map((video, index) => (
                <div key={index} className="bg-black rounded-lg overflow-hidden group cursor-pointer">
                  <div className="relative aspect-video bg-gray-800 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1 rounded text-white text-sm">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-medium">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">{t('pages.help.support.title')}</h2>
            <p className="text-center text-muted-foreground mb-12">
              {t('pages.help.support.subtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                    {t('pages.help.support.email.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t('pages.help.support.email.description')}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="mailto:support@pluribus.io">{t('pages.help.support.email.button')}</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    {t('pages.help.support.chat.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t('pages.help.support.chat.description')}
                  </p>
                  <Button asChild className="w-full">
                    <a href="#chat">{t('pages.help.support.chat.button')}</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                    {t('pages.help.support.phone.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t('pages.help.support.phone.description')}
                  </p>
                  <Button asChild variant="outline" className="w-full">
                    <a href="tel:+1234567890">{t('pages.help.support.phone.button')}</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
