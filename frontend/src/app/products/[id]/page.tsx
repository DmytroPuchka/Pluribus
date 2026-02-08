/**
 * Product Details Page
 * Display comprehensive product information with image gallery, pricing, seller info, and reviews
 *
 * Route: /products/[id]
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ShoppingCart, Heart, Share2, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/common/Rating';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { Product, User } from '@/types';
import { cn, truncate } from '@/lib/utils';
import { ImageGallery } from './components/ImageGallery';
import { StockStatus } from './components/StockStatus';

// Mock data for development - same products as products page
const getMockProducts = (): Product[] => {
  return [
    {
      id: '1',
      sellerId: 'seller-1',
      seller: {
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
      title: 'Apple iPhone 15 Pro Max',
      description: 'Brand new Apple iPhone 15 Pro Max with 256GB storage. Factory unlocked, works worldwide. Includes original packaging and accessories. International warranty available.',
      photos: [
        'https://images.unsplash.com/photo-1696446702183-cbd80e00b9c8?w=800',
        'https://images.unsplash.com/photo-1592286927505-1def25e5e020?w=800',
        'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=800',
      ],
      price: 1299,
      currency: 'USD',
      category: 'ELECTRONICS',
      tags: ['smartphone', 'apple', 'iphone', 'unlocked'],
      stockQuantity: 5,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      sellerId: 'seller-2',
      seller: {
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
      title: 'Premium Leather Handbag',
      description: 'Handcrafted leather handbag from Barcelona. Genuine Italian leather with elegant design. Perfect for both casual and formal occasions. Eco-friendly materials used.',
      photos: [
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
        'https://images.unsplash.com/photo-1564901905551-ecf9fb9d41cd?w=800',
      ],
      price: 299,
      currency: 'EUR',
      category: 'CLOTHING',
      tags: ['handbag', 'leather', 'fashion', 'designer'],
      stockQuantity: 3,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      sellerId: 'seller-3',
      seller: {
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
      title: 'Traditional Japanese Tea Set',
      description: 'Authentic Japanese tea set with teapot and 4 cups. Perfect for traditional tea ceremonies. Handcrafted by local artisans in Tokyo. Includes carrying box.',
      photos: [
        'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
        'https://images.unsplash.com/photo-1597318129655-f05fe8f88960?w=800',
      ],
      price: 89,
      currency: 'USD',
      category: 'HOME',
      tags: ['tea', 'japanese', 'traditional', 'authentic'],
      stockQuantity: 10,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '4',
      sellerId: 'seller-1',
      seller: {
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
      title: 'Sony WH-1000XM5 Headphones',
      description: 'Premium noise-cancelling wireless headphones with industry-leading audio quality. 30-hour battery life. Touch controls and comfortable fit for all-day wear.',
      photos: [
        'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
      ],
      price: 399,
      currency: 'USD',
      category: 'ELECTRONICS',
      tags: ['headphones', 'sony', 'wireless', 'noise-cancelling'],
      stockQuantity: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
};

// Mock reviews data
const getMockReviews = () => [
  {
    id: '1',
    rating: 5,
    author: 'Sarah Johnson',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    comment: 'Excellent product! Great quality and fast delivery. Seller was very responsive.',
  },
  {
    id: '2',
    rating: 4,
    author: 'Michael Chen',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    comment: 'Good value for money. As described. Would recommend.',
  },
  {
    id: '3',
    rating: 5,
    author: 'Emma Williams',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    comment: 'Amazing! Better than expected. Will buy again.',
  },
];


interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: ProductDetailsPageProps
): Promise<Metadata> {
  const products = getMockProducts();
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return {
      title: 'Product Not Found | Pluribus',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: `${product.title} | Pluribus`,
    description: truncate(product.description, 160),
    keywords: product.tags.join(', '),
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.photos.map(photo => ({
        url: photo,
        width: 800,
        height: 600,
        alt: product.title,
      })),
      type: 'website',
    },
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const products = getMockProducts();
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="container px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>

            <p className="text-muted-foreground mb-6">
              We couldn't find the product you're looking for.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">Go Home</Link>
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

  const reviews = getMockReviews();
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
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
                <span className="text-muted-foreground">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-muted-foreground text-sm mb-2">Price</p>
            <div className="flex items-baseline gap-2 mb-2">
              <PriceDisplay amount={product.price} currency={product.currency} size="lg" />
            </div>
          </div>

          {/* Stock Status */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-muted-foreground text-sm mb-2">Availability</p>
            <StockStatus quantity={product.stockQuantity} />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              disabled={product.stockQuantity === 0}
            >
              <ShoppingCart className="w-4 h-4" />
              {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            <Button variant="outline" size="lg" className="w-full">
              <Heart className="w-4 h-4" />
              Save for Later
            </Button>

            <Button variant="outline" size="lg" className="w-full">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>

          {/* Description */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-sm">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Seller Information Card */}
      {product.seller && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Seller Information</CardTitle>
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
                      ({product.seller.reviewCount || 0} reviews)
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
                <h4 className="font-semibold text-sm mb-3">Verified Badges</h4>
                <div className="space-y-2">
                  {product.seller.emailVerified && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Email Verified</span>
                    </div>
                  )}
                  {product.seller.phoneVerified && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Phone Verified</span>
                    </div>
                  )}
                  {product.seller.idVerified && (
                    <div className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>ID Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button variant="outline" asChild className="mt-4 w-full">
              <Link href={`/sellers/${product.seller.id}`}>View All Products</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Reviews Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>
            Ratings and feedback from buyers ({reviews.length} reviews)
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
                  Based on {reviews.length} reviews
                </p>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="pb-4 border-b last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <Rating value={review.rating} size="sm" readonly />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }).format(review.date)}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Products Section */}
      <Card>
        <CardHeader>
          <CardTitle>Related Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map(relatedProduct => (
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
                        No Image
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
    </div>
  );
}
