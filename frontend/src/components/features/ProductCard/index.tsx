/**
 * ProductCard Component
 * Displays product information in a card format
 *
 * @component
 * @example
 * ```tsx
 * <ProductCard product={product} />
 * ```
 */

'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/common/Rating';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { Product } from '@/types';
import { cn, truncate } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: FC<ProductCardProps> = ({ product, className }) => {
  const sellerRating = product.seller?.rating || 0;
  const sellerLocation = product.seller
    ? `${product.seller.city}, ${product.seller.country}`
    : 'Unknown';

  return (
    <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow', className)}>
      {/* Product Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full h-48 bg-muted">
          {product.photos && product.photos.length > 0 ? (
            <Image
              src={product.photos[0]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No Image
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
              {product.category}
            </Badge>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        {/* Product Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Product Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {truncate(product.description, 100)}
        </p>

        {/* Seller Info */}
        {product.seller && (
          <div className="flex items-center gap-2 mb-3 text-sm">
            <Link
              href={`/sellers/${product.sellerId}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                {product.seller.avatar ? (
                  <Image
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <span>{product.seller.name.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <span className="font-medium">{product.seller.name}</span>
            </Link>

            {sellerRating > 0 && (
              <div className="flex items-center gap-1">
                <Rating value={sellerRating} size="sm" readonly />
                <span className="text-xs text-muted-foreground">
                  ({product.seller.reviewCount || 0})
                </span>
              </div>
            )}
          </div>
        )}

        {/* Location */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
          <MapPin className="w-3 h-3" />
          <span>{sellerLocation}</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <PriceDisplay amount={product.price} currency={product.currency} size="lg" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

ProductCard.displayName = 'ProductCard';

export default ProductCard;
