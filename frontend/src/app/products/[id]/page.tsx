'use client';

/**
 * Product Details Page
 * Display comprehensive product information with image gallery, pricing, seller info, and reviews
 *
 * Route: /products/[id]
 */

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ShoppingCart, Heart, Share2, Check, AlertCircle, Globe, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/common/Rating';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Product, User, Review } from '@/types';
import { cn, truncate } from '@/lib/utils';
import { ImageGallery } from './components/ImageGallery';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { productsService, reviewsService, ordersService } from '@/lib/api';
import { toast } from 'sonner';

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { t } = useTranslations();
  const router = useRouter();
  const { user } = useAuth();
  const { id } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Order creation state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const productData = await productsService.getProductById(id);

        // Convert date strings to Date objects
        const convertedProduct = {
          ...productData,
          createdAt: new Date(productData.createdAt),
          updatedAt: new Date(productData.updatedAt),
          seller: productData.seller ? {
            ...productData.seller,
            createdAt: new Date(productData.seller.createdAt),
            updatedAt: new Date(productData.seller.updatedAt),
          } : undefined,
        };

        setProduct(convertedProduct);

        // Fetch related products (same category)
        try {
          const relatedData = await productsService.getProducts({
            category: productData.category,
            page: 1,
            limit: 5,
          });

          // Filter out the current product and convert dates
          const filteredRelated = relatedData.data
            .filter(p => p.id !== id)
            .slice(0, 4)
            .map(p => ({
              ...p,
              createdAt: new Date(p.createdAt),
              updatedAt: new Date(p.updatedAt),
            }));

          setRelatedProducts(filteredRelated);
        } catch (relatedError) {
          console.error('Failed to fetch related products:', relatedError);
          // Don't show error for related products, just leave empty
        }

        // Fetch product reviews
        try {
          const reviewsData = await reviewsService.getProductReviews(id, {
            limit: 100,
          });

          const convertedReviews = reviewsData.data.map((review) => ({
            ...review,
            createdAt: new Date(review.createdAt),
          }));

          setReviews(convertedReviews);
        } catch (reviewsError) {
          console.error('Failed to fetch reviews:', reviewsError);
          // Don't show error for reviews, just leave empty
        }
      } catch (err: any) {
        console.error('Failed to fetch product:', err);
        const errorMessage = err?.response?.data?.error || 'Failed to load product';
        setError(errorMessage);
        toast.error('Error', {
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle Buy Now button click
  const handleBuyNow = () => {
    if (!user) {
      toast.error(t('pages.productDetail.orderModal.errors.loginRequired'), {
        description: t('pages.productDetail.orderModal.errors.loginRequiredDescription'),
      });
      router.push('/login');
      return;
    }

    if (user.id === product?.sellerId) {
      toast.error(t('pages.productDetail.orderModal.errors.cannotBuyOwnProduct'), {
        description: t('pages.productDetail.orderModal.errors.cannotBuyOwnProductDescription'),
      });
      return;
    }

    // Pre-fill delivery address if available
    if (user.address) {
      setDeliveryAddress(user.address);
    }

    setIsOrderModalOpen(true);
  };

  // Handle order creation
  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!deliveryAddress.trim()) {
      toast.error(t('pages.productDetail.orderModal.errors.addressRequired'), {
        description: t('pages.productDetail.orderModal.errors.addressRequiredDescription'),
      });
      return;
    }

    if (!product) return;

    setIsCreatingOrder(true);

    try {
      const order = await ordersService.createOrder({
        productId: product.id,
        price: product.price,
        currency: product.currency,
        deliveryAddress: deliveryAddress.trim(),
      });

      toast.success(t('pages.productDetail.orderModal.success.title'), {
        description: t('pages.productDetail.orderModal.success.description', {
          orderNumber: order.orderNumber || order.id
        }),
      });

      // Reset form
      setIsOrderModalOpen(false);
      setDeliveryAddress('');
      setOrderNotes('');

      // Redirect to orders page
      router.push('/dashboard/orders');
    } catch (error: any) {
      console.error('Error creating order:', error);
      const errorMessage =
        error?.response?.data?.error || t('pages.productDetail.orderModal.errors.createFailed');
      toast.error(t('pages.productDetail.orderModal.errors.createFailedTitle'), {
        description: errorMessage,
      });
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="aspect-square bg-muted animate-pulse rounded-lg" />
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-32 bg-muted animate-pulse rounded" />
            <div className="h-12 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !product) {
    return (
      <div className="container px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-semibold mb-2">{t('pages.productDetail.notFound.title')}</h2>

            <p className="text-muted-foreground mb-6">
              {error || t('pages.productDetail.notFound.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button asChild>
                <Link href="/products">{t('pages.productDetail.notFound.browseProducts')}</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">{t('pages.productDetail.notFound.goHome')}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sellerLocation = product.seller
    ? `${product.seller.city}, ${product.seller.country}`
    : 'Unknown';

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.overallRating, 0) / reviews.length
    : 0;

  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          {t('pages.productDetail.breadcrumb.home')}
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary transition-colors">
          {t('pages.productDetail.breadcrumb.products')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Image Gallery Section */}
        <div className="lg:col-span-2">
          <ImageGallery photos={product.photos} title={product.title} />
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          {/* Category Badge */}
          <div>
            <Badge variant="outline">{product.category}</Badge>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Rating value={averageRating} size="md" readonly showValue />
                <span className="text-muted-foreground">
                  ({reviews.length} {reviews.length === 1 ? t('pages.productDetail.details.review') : t('pages.productDetail.details.reviews')})
                </span>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-muted-foreground text-sm mb-2">{t('pages.productDetail.details.price')}</p>
            <div className="flex items-baseline gap-2 mb-2">
              <PriceDisplay amount={product.price} currency={product.currency} size="lg" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {user?.id === product.sellerId ? (
              // Seller view - Edit button
              <Button
                size="lg"
                className="w-full"
                asChild
              >
                <Link href={`/dashboard/products/${product.id}/edit`}>
                  {t('pages.productDetail.details.editProduct')}
                </Link>
              </Button>
            ) : (
              // Buyer view - Buy button
              <>
                <Button
                  size="lg"
                  className="w-full"
                  disabled={!product.isAvailable}
                  onClick={handleBuyNow}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {t('pages.productDetail.details.addToCart')}
                </Button>

                <Button variant="outline" size="lg" className="w-full">
                  <Heart className="w-4 h-4" />
                  {t('pages.productDetail.details.saveForLater')}
                </Button>
              </>
            )}

            <Button variant="outline" size="lg" className="w-full">
              <Share2 className="w-4 h-4" />
              {t('pages.productDetail.details.share')}
            </Button>
          </div>

          {/* Description */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">{t('pages.productDetail.details.description')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Seller Information Card */}
      {product.seller && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t('pages.productDetail.seller.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seller Details */}
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  {product.seller.avatar ? (
                    <Image
                      src={product.seller.avatar}
                      alt={product.seller.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-2xl font-semibold">
                      {product.seller.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <div>
                  <Link
                    href={`/sellers/${product.seller.id}`}
                    className="text-lg font-semibold hover:text-primary transition-colors"
                  >
                    {product.seller.name}
                  </Link>

                  <div className="flex items-center gap-2 mt-1">
                    <Rating value={product.seller.rating || 0} size="sm" readonly />
                    <span className="text-sm text-muted-foreground">
                      ({product.seller.reviewCount || 0} {t('pages.productDetail.seller.reviews')})
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                    <MapPin className="w-3 h-3" />
                    <span>{sellerLocation}</span>
                  </div>
                </div>
              </div>

              {/* Verification Badges */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm mb-3">{t('pages.productDetail.seller.verifiedBadges')}</h4>
                <div className="space-y-2">
                  {product.seller.emailVerified && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{t('pages.productDetail.seller.emailVerified')}</span>
                    </div>
                  )}
                  {product.seller.phoneVerified && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{t('pages.productDetail.seller.phoneVerified')}</span>
                    </div>
                  )}
                  {product.seller.idVerified && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{t('pages.productDetail.seller.idVerified')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Countries */}
            {product.seller.deliveryCountries && product.seller.deliveryCountries.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-sm">{t('pages.productDetail.seller.deliveryCountries')}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.seller.deliveryCountries.map((country) => (
                    <span
                      key={country}
                      className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button variant="outline" asChild className="mt-4 w-full">
              <Link href={`/sellers/${product.seller.id}`}>{t('pages.productDetail.seller.viewAllProducts')}</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t('pages.productDetail.customerReviews.title')}</CardTitle>
          <CardDescription>
            {t('pages.productDetail.customerReviews.subtitle')} ({reviews.length} {reviews.length === 1 ? t('pages.productDetail.details.review') : t('pages.productDetail.details.reviews')})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Rating Summary */}
            <div className="flex items-center gap-8 pb-6 border-b">
              <div>
                <div className="text-3xl font-bold mb-1">
                  {averageRating.toFixed(1)}
                </div>
                <Rating value={averageRating} size="md" readonly />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('pages.productDetail.customerReviews.basedOn')} {reviews.length} {reviews.length === 1 ? t('pages.productDetail.details.review') : t('pages.productDetail.details.reviews')}
                </p>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id} className="pb-4 border-b last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{review.reviewer?.name || 'Anonymous'}</p>
                        <Rating value={review.overallRating} size="sm" readonly />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Intl.DateTimeFormat('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }).format(review.createdAt)}
                      </p>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    )}
                    <div className="text-xs text-muted-foreground mt-2 space-y-1">
                      <div>Communication: <Rating value={review.communicationRating} size="sm" readonly /></div>
                      <div>Timeliness: <Rating value={review.timelinessRating} size="sm" readonly /></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {t('pages.productDetail.customerReviews.noReviews')}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('pages.productDetail.relatedProducts.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden mb-2">
                    {relatedProduct.photos && relatedProduct.photos.length > 0 ? (
                      <Image
                        src={relatedProduct.photos[0]}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        {t('pages.productDetail.relatedProducts.noImage')}
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {relatedProduct.title}
                  </h4>
                  <p className="text-sm text-primary font-semibold">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: relatedProduct.currency,
                    }).format(relatedProduct.price)}
                  </p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Creation Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-background rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
              disabled={isCreatingOrder}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{t('pages.productDetail.orderModal.title')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('pages.productDetail.orderModal.subtitle', { product: product?.title })}
              </p>

              <form onSubmit={handleCreateOrder} className="space-y-4">
                {/* Product Info */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex gap-4">
                    {product?.photos && product.photos[0] && (
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.photos[0]}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{product?.title}</h3>
                      <PriceDisplay
                        amount={product?.price || 0}
                        currency={product?.currency || 'USD'}
                        size="md"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">
                    {t('pages.productDetail.orderModal.deliveryAddress')} <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="deliveryAddress"
                    placeholder={t('pages.productDetail.orderModal.deliveryAddressPlaceholder')}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                    rows={3}
                    disabled={isCreatingOrder}
                  />
                </div>

                {/* Order Notes (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="orderNotes">{t('pages.productDetail.orderModal.orderNotes')}</Label>
                  <Textarea
                    id="orderNotes"
                    placeholder={t('pages.productDetail.orderModal.orderNotesPlaceholder')}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    rows={2}
                    disabled={isCreatingOrder}
                  />
                </div>

                {/* Seller Info */}
                {product?.seller && (
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-medium">{t('pages.productDetail.orderModal.seller')}:</span> {product.seller.name}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium">{t('pages.productDetail.orderModal.location')}:</span> {product.seller.city}, {product.seller.country}
                    </p>
                    {product.seller.rating && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-medium">{t('pages.productDetail.orderModal.rating')}:</span>
                        <Rating value={product.seller.rating} size="sm" readonly />
                        <span className="text-muted-foreground">
                          ({product.seller.reviewCount} {t('pages.productDetail.orderModal.reviews')})
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsOrderModalOpen(false)}
                    disabled={isCreatingOrder}
                  >
                    {t('common.buttons.cancel')}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isCreatingOrder}
                  >
                    {isCreatingOrder ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        {t('pages.productDetail.orderModal.creating')}
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t('pages.productDetail.orderModal.createOrder')}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
