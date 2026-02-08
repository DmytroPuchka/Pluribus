/**
 * SellerCard Component
 * Displays seller information in a card format with profile link
 *
 * @component
 * @example
 * ```tsx
 * <SellerCard seller={seller} />
 * ```
 */

'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Package } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rating } from '@/components/common/Rating';
import { User } from '@/types';
import { cn, getInitials } from '@/lib/utils';

interface SellerCardProps {
  seller: User & { productCount?: number };
  className?: string;
}

export const SellerCard: FC<SellerCardProps> = ({ seller, className }) => {
  const rating = seller.rating || 0;
  const reviewCount = seller.reviewCount || 0;
  const productCount = seller.productCount || 0;
  const location = `${seller.city}, ${seller.country}`;

  // Determine verification badge
  const verificationCount = [
    seller.emailVerified,
    seller.phoneVerified,
    seller.idVerified,
  ].filter(Boolean).length;

  return (
    <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full', className)}>
      {/* Header Background */}
      <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600" />

      <CardContent className="p-6 -mt-12 relative flex-1">
        {/* Seller Avatar */}
        <div className="flex items-end gap-4 mb-4">
          <div className="w-24 h-24 rounded-full border-4 border-white bg-muted flex items-center justify-center text-2xl font-semibold flex-shrink-0 overflow-hidden">
            {seller.avatar ? (
              <Image
                src={seller.avatar}
                alt={seller.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="bg-blue-100 text-blue-600 w-full h-full flex items-center justify-center">
                {getInitials(seller.name)}
              </span>
            )}
          </div>
        </div>

        {/* Seller Name */}
        <h3 className="font-semibold text-lg mb-1 line-clamp-2">{seller.name}</h3>

        {/* Verification Status */}
        {verificationCount > 0 && (
          <div className="flex gap-1 mb-3 flex-wrap">
            {seller.emailVerified && (
              <Badge variant="outline" className="text-xs">
                Email Verified
              </Badge>
            )}
            {seller.phoneVerified && (
              <Badge variant="outline" className="text-xs">
                Phone Verified
              </Badge>
            )}
            {seller.idVerified && (
              <Badge variant="outline" className="text-xs">
                ID Verified
              </Badge>
            )}
          </div>
        )}

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        {/* Rating Section */}
        <div className="flex items-center gap-2 mb-4">
          {rating > 0 ? (
            <>
              <Rating value={rating} size="md" readonly showValue={false} />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">
                ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
              </span>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">No ratings yet</span>
          )}
        </div>

        {/* Product Count */}
        <div className="flex items-center gap-2 text-sm mb-4 p-3 bg-muted/50 rounded-md">
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{productCount} products</span>
        </div>

        {/* Description/Bio if available */}
        {seller.email && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            Member since {new Date(seller.createdAt).getFullYear()}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/sellers/${seller.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

SellerCard.displayName = 'SellerCard';

export default SellerCard;
