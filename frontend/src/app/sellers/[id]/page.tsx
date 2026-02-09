/**
 * Seller Profile Page
 * Dynamic seller profile displaying seller information, products, and reviews
 *
 * Route: /sellers/[id]
 */

'use client';

import Image from 'next/image';
import { MapPin, Clock, MessageCircle, Shield, TrendingUp } from 'lucide-react';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Rating } from '@/components/common/Rating';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Product, Review } from '@/types';
import Link from 'next/link';
import { useTranslations } from '@/contexts/TranslationsContext';

interface SellerPageProps {
  params: {
    id: string;
  };
}

// Mock seller data generator
const getMockSeller = (id: string): User => {
  const sellers: Record<string, User> = {
    'seller-1': {
      id: 'seller-1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'SELLER',
      country: 'United States',
      city: 'New York',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      rating: 4.8,
      reviewCount: 125,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2022-01-15'),
      updatedAt: new Date(),
    },
    'seller-2': {
      id: 'seller-2',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      role: 'SELLER',
      country: 'Spain',
      city: 'Barcelona',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      rating: 4.9,
      reviewCount: 89,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2022-06-10'),
      updatedAt: new Date(),
    },
    'seller-3': {
      id: 'seller-3',
      name: 'Yuki Tanaka',
      email: 'yuki@example.com',
      role: 'SELLER',
      country: 'Japan',
      city: 'Tokyo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      rating: 5.0,
      reviewCount: 234,
      emailVerified: true,
      phoneVerified: true,
      idVerified: true,
      isActive: true,
      createdAt: new Date('2021-03-20'),
      updatedAt: new Date(),
    },
  };

  return sellers[id] || sellers['seller-1'];
};

// Mock products by seller
const getMockSellerProducts = (sellerId: string): Product[] => {
  const allProducts: Record<string, Product[]> = {
    'seller-1': [
      {
        id: '1',
        sellerId: 'seller-1',
        title: 'Apple iPhone 15 Pro Max',
        description: 'Brand new Apple iPhone 15 Pro Max with 256GB storage. Factory unlocked, works worldwide.',
        photos: ['https://images.unsplash.com/photo-1696446702183-cbd80e00b9c8?w=400'],
        price: 1299,
        currency: 'USD',
        category: 'ELECTRONICS',
        tags: ['smartphone', 'apple', 'iphone'],
        stockQuantity: 5,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        sellerId: 'seller-1',
        title: 'Sony WH-1000XM5 Headphones',
        description: 'Premium noise-cancelling wireless headphones with industry-leading audio quality.',
        photos: ['https://images.unsplash.com/photo-1545127398-14699f92334b?w=400'],
        price: 399,
        currency: 'USD',
        category: 'ELECTRONICS',
        tags: ['headphones', 'sony', 'wireless'],
        stockQuantity: 8,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5',
        sellerId: 'seller-1',
        title: 'MacBook Pro 16-inch',
        description: 'High-performance laptop with M3 Max chip, perfect for professionals.',
        photos: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
        price: 2499,
        currency: 'USD',
        category: 'ELECTRONICS',
        tags: ['laptop', 'apple', 'macbook'],
        stockQuantity: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    'seller-2': [
      {
        id: '2',
        sellerId: 'seller-2',
        title: 'Premium Leather Handbag',
        description: 'Handcrafted leather handbag from Barcelona. Genuine Italian leather with elegant design.',
        photos: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'],
        price: 299,
        currency: 'EUR',
        category: 'CLOTHING',
        tags: ['handbag', 'leather', 'fashion'],
        stockQuantity: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6',
        sellerId: 'seller-2',
        title: 'Wool Winter Coat',
        description: 'Elegant wool coat perfect for winter season. Premium quality material.',
        photos: ['https://images.unsplash.com/photo-1539533057592-4d2b7f80a865?w=400'],
        price: 189,
        currency: 'EUR',
        category: 'CLOTHING',
        tags: ['coat', 'winter', 'fashion'],
        stockQuantity: 6,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    'seller-3': [
      {
        id: '3',
        sellerId: 'seller-3',
        title: 'Traditional Japanese Tea Set',
        description: 'Authentic Japanese tea set with teapot and 4 cups. Perfect for traditional tea ceremonies.',
        photos: ['https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400'],
        price: 89,
        currency: 'USD',
        category: 'HOME',
        tags: ['tea', 'japanese', 'traditional'],
        stockQuantity: 10,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7',
        sellerId: 'seller-3',
        title: 'Japanese Ceramic Vase',
        description: 'Hand-painted ceramic vase with traditional Japanese design. Unique collectible piece.',
        photos: ['https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=400'],
        price: 125,
        currency: 'USD',
        category: 'HOME',
        tags: ['ceramic', 'vase', 'japanese'],
        stockQuantity: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };

  return allProducts[sellerId] || [];
};

// Mock reviews by seller
const getMockSellerReviews = (sellerId: string): Review[] => {
  const reviewsByCommonSeller: Record<string, Review[]> = {
    'seller-1': [
      {
        id: 'review-1',
        orderId: 'order-1',
        reviewerId: 'buyer-1',
        reviewee: {
          id: 'seller-1',
          name: 'John Smith',
          email: 'john@example.com',
          role: 'SELLER',
          country: 'United States',
          city: 'New York',
          rating: 4.8,
          reviewCount: 125,
          emailVerified: true,
          phoneVerified: true,
          idVerified: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        revieweeId: 'seller-1',
        role: 'BUYER',
        overallRating: 5,
        communicationRating: 5,
        timelinessRating: 5,
        comment: 'Excellent seller! Product arrived quickly and in perfect condition. Highly recommended.',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'review-2',
        orderId: 'order-2',
        reviewerId: 'buyer-2',
        reviewee: {
          id: 'seller-1',
          name: 'John Smith',
          email: 'john@example.com',
          role: 'SELLER',
          country: 'United States',
          city: 'New York',
          rating: 4.8,
          reviewCount: 125,
          emailVerified: true,
          phoneVerified: true,
          idVerified: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        revieweeId: 'seller-1',
        role: 'BUYER',
        overallRating: 5,
        communicationRating: 4,
        timelinessRating: 5,
        comment: 'Great communication and fast shipping. Very satisfied with the purchase.',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      },
      {
        id: 'review-3',
        orderId: 'order-3',
        reviewerId: 'buyer-3',
        reviewee: {
          id: 'seller-1',
          name: 'John Smith',
          email: 'john@example.com',
          role: 'SELLER',
          country: 'United States',
          city: 'New York',
          rating: 4.8,
          reviewCount: 125,
          emailVerified: true,
          phoneVerified: true,
          idVerified: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        revieweeId: 'seller-1',
        role: 'BUYER',
        overallRating: 4,
        communicationRating: 4,
        timelinessRating: 4,
        comment: 'Good product and reliable seller. Would buy again.',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
    ],
    'seller-2': [
      {
        id: 'review-4',
        orderId: 'order-4',
        reviewerId: 'buyer-4',
        reviewee: {
          id: 'seller-2',
          name: 'Maria Garcia',
          email: 'maria@example.com',
          role: 'SELLER',
          country: 'Spain',
          city: 'Barcelona',
          rating: 4.9,
          reviewCount: 89,
          emailVerified: true,
          phoneVerified: true,
          idVerified: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        revieweeId: 'seller-2',
        role: 'BUYER',
        overallRating: 5,
        communicationRating: 5,
        timelinessRating: 5,
        comment: 'Fantastic quality and beautiful design. Maria is a professional seller!',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      },
    ],
    'seller-3': [
      {
        id: 'review-5',
        orderId: 'order-5',
        reviewerId: 'buyer-5',
        reviewee: {
          id: 'seller-3',
          name: 'Yuki Tanaka',
          email: 'yuki@example.com',
          role: 'SELLER',
          country: 'Japan',
          city: 'Tokyo',
          rating: 5.0,
          reviewCount: 234,
          emailVerified: true,
          phoneVerified: true,
          idVerified: true,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        revieweeId: 'seller-3',
        role: 'BUYER',
        overallRating: 5,
        communicationRating: 5,
        timelinessRating: 5,
        comment: 'Perfect! Authentic Japanese products with excellent craftsmanship.',
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      },
    ],
  };

  return reviewsByCommonSeller[sellerId] || [];
};

export default function SellerPage({ params }: SellerPageProps) {
  const { t } = useTranslations();

  const seller = getMockSeller(params.id);
  const products = getMockSellerProducts(params.id);
  const reviews = getMockSellerReviews(params.id);

  // Calculate statistics
  const totalOrders = Math.floor((seller.reviewCount ?? 0) * 1.2);
  const responseTime = '< 2 hours';
  const yearsSelling = Math.floor((new Date().getTime() - seller.createdAt.getTime()) / (365 * 24 * 60 * 60 * 1000));

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Seller Header */}
      <div className="space-y-6">
        {/* Hero Background */}
        <div className="h-32 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg" />

        {/* Seller Info Card */}
        <div className="flex flex-col sm:flex-row gap-6 -mt-16 mb-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {seller.avatar ? (
              <Image
                src={seller.avatar}
                alt={seller.name}
                width={120}
                height={120}
                className="w-32 h-32 rounded-full border-4 border-background shadow-lg object-cover"
                priority
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-background shadow-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">{seller.name.charAt(0)}</span>
              </div>
            )}
            {seller.idVerified && (
              <div
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-lg"
                title={t('pages.sellerProfile.header.idVerified')}
              >
                <Shield className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Seller Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{seller.name}</h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <MapPin className="w-4 h-4" />
              <span>{seller.city}, {seller.country}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <Rating value={seller.rating || 0} size="lg" showValue />
              <span className="text-sm text-muted-foreground">
                ({seller.reviewCount} {seller.reviewCount === 1 ? t('pages.sellerProfile.header.review') : t('pages.sellerProfile.header.reviews')})
              </span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {seller.emailVerified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  ✓ {t('pages.sellerProfile.badges.emailVerified')}
                </span>
              )}
              {seller.phoneVerified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  ✓ {t('pages.sellerProfile.badges.phoneVerified')}
                </span>
              )}
              {seller.idVerified && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                  ✓ {t('pages.sellerProfile.badges.idVerified')}
                </span>
              )}
            </div>

            {/* Contact Button */}
            <Button asChild>
              <Link href={`/sellers/${seller.id}/contact`}>
                <MessageCircle className="w-4 h-4" />
                {t('pages.sellerProfile.buttons.contactSeller')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalOrders}</div>
              <p className="text-sm text-muted-foreground">{t('pages.sellerProfile.stats.totalOrders')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{seller.reviewCount}</div>
              <p className="text-sm text-muted-foreground">{t('pages.sellerProfile.stats.positiveReviews')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center flex flex-col items-center">
              <Clock className="w-6 h-6 text-orange-600 mb-2" />
              <p className="text-sm font-semibold">{responseTime}</p>
              <p className="text-xs text-muted-foreground">{t('pages.sellerProfile.stats.responseTime')}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center flex flex-col items-center">
              <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-semibold">{yearsSelling}+ {yearsSelling === 1 ? t('pages.sellerProfile.stats.year') : t('pages.sellerProfile.stats.years')}</p>
              <p className="text-xs text-muted-foreground">{t('pages.sellerProfile.stats.selling')}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {seller.name} is a trusted seller on Pluribus with a strong reputation for quality products and excellent customer service.
            With {yearsSelling}+ years of experience in international selling, they have successfully served {seller.reviewCount} satisfied customers.
            All their products are carefully selected and verified before listing. They maintain a commitment to fast shipping and responsive communication.
          </p>
        </CardContent>
      </Card>

      {/* Products Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {t('pages.sellerProfile.products.title')} ({products.length})
          </h2>
          <p className="text-muted-foreground">
            {t('pages.sellerProfile.products.browseAll')} {seller.name}
          </p>
        </div>
        <ProductGrid products={products} />
      </div>

      {/* Reviews Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {t('pages.sellerProfile.reviews.title')} ({reviews.length})
          </h2>
          <p className="text-muted-foreground">
            {t('pages.sellerProfile.reviews.subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-base">
                        {review.reviewer?.name || t('pages.sellerProfile.reviews.anonymousBuyer')}
                      </CardTitle>
                      <CardDescription>
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Rating value={review.overallRating} size="sm" showValue />
                    </div>
                  </div>
                </CardHeader>
                {review.comment && (
                  <CardContent>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                )}
                <CardFooter className="text-xs text-muted-foreground border-t pt-4">
                  <div className="space-y-1">
                    <div>{t('pages.sellerProfile.reviews.communication')} <Rating value={review.communicationRating} size="sm" /></div>
                    <div>{t('pages.sellerProfile.reviews.timeliness')} <Rating value={review.timelinessRating} size="sm" /></div>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">{t('pages.sellerProfile.reviews.noReviews')}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
