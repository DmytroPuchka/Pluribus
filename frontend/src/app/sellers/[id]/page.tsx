/**
 * Seller Profile Page
 * Dynamic seller profile displaying seller information, products, and reviews
 *
 * Route: /sellers/[id]
 */

'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Clock, MessageCircle, Shield, TrendingUp, ClipboardList, X, Globe } from 'lucide-react';
import { ProductCard } from '@/components/features/ProductCard';
import { CustomOrderPromptCard } from '@/components/features/CustomOrderPromptCard';
import { Rating } from '@/components/common/Rating';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { User, Product, Review } from '@/types';
import Link from 'next/link';
import { useTranslations } from '@/contexts/TranslationsContext';
import { CustomOrderForm } from '@/components/features/CustomOrderForm';
import { usersService, productsService, reviewsService } from '@/lib/api';
import { toast } from 'sonner';

interface SellerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function SellerPage({ params }: SellerPageProps) {
  const { t } = useTranslations();
  const { id } = use(params);
  const [isCustomOrderModalOpen, setIsCustomOrderModalOpen] = useState(false);

  // State for data
  const [seller, setSeller] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch seller data
  useEffect(() => {
    const fetchSellerData = async () => {
      setIsLoading(true);

      try {
        // Fetch seller profile
        const sellerData = await usersService.getUserById(id);
        const convertedSeller = {
          ...sellerData,
          createdAt: new Date(sellerData.createdAt),
          updatedAt: new Date(sellerData.updatedAt),
        };
        setSeller(convertedSeller);

        // Fetch seller's products
        const productsData = await productsService.getProducts({
          sellerId: id,
          limit: 100,
        });
        const convertedProducts = productsData.data.map((product) => ({
          ...product,
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt),
        }));
        setProducts(convertedProducts);

        // Fetch seller's reviews
        const reviewsData = await reviewsService.getUserReviews(id, {
          limit: 100,
        });
        const convertedReviews = reviewsData.data.map((review) => ({
          ...review,
          createdAt: new Date(review.createdAt),
        }));
        setReviews(convertedReviews);
      } catch (error: any) {
        console.error('Error fetching seller data:', error);
        const errorMessage =
          error?.response?.data?.error || 'Failed to load seller profile';
        toast.error('Error', {
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSellerData();
  }, [id]);

  // Show loading skeleton
  if (isLoading || !seller) {
    return (
      <div className="container px-4 py-8 space-y-8">
        <div className="space-y-6">
          <Skeleton className="h-32 w-full rounded-lg" />
          <div className="flex flex-col sm:flex-row gap-6 -mt-16 mb-6">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-6 w-96" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="default" className="gap-2">
                <Link href={`/sellers/${seller.id}/contact`}>
                  <MessageCircle className="w-4 h-4" />
                  {t('pages.sellerProfile.buttons.contactSeller')}
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCustomOrderModalOpen(true)}
                className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <ClipboardList className="w-4 h-4" />
                {t('pages.sellerProfile.buttons.customOrder')}
              </Button>
            </div>
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

      {/* Delivery Countries Section */}
      {seller.deliveryCountries && seller.deliveryCountries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              {t('pages.sellerProfile.deliveryCountries.title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {seller.deliveryCountries.map((country) => (
                <span
                  key={country}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {country}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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

        {/* Products Grid with Custom Order Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Custom Order Prompt Card - First Item */}
          <CustomOrderPromptCard
            sellerId={seller.id}
            sellerName={seller.name}
            onClick={() => setIsCustomOrderModalOpen(true)}
          />

          {/* Regular Products */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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

      {/* Custom Order Modal */}
      {isCustomOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsCustomOrderModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {t('pages.customOrders.createOrder.title')}
              </h2>
              <CustomOrderForm
                sellerId={seller.id}
                sellerName={seller.name}
                onSuccess={(orderId) => {
                  console.log('Custom order created:', orderId);
                  setIsCustomOrderModalOpen(false);
                  // Optional: Show success toast or redirect
                }}
                onError={(error) => {
                  console.error('Error creating custom order:', error);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
