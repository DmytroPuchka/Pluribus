/**
 * CustomOrderCard Component
 * Compact card view for custom orders in lists
 * Shows title, status badge, price, deadline, buyer/seller info
 *
 * @component
 * @example
 * ```tsx
 * <CustomOrderCard order={customOrder} userRole="SELLER" onClick={handleClick} />
 * ```
 */

'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Calendar, User, DollarSign, MessageSquare, Check, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CustomOrder, CustomOrderStatus, UserRole } from '@/types';
import { cn, formatDate, formatPrice, getInitials } from '@/lib/utils';

interface CustomOrderCardProps {
  order: CustomOrder;
  userRole: UserRole;
  className?: string;
  onClick?: () => void;
  onAccept?: (orderId: string) => void;
  onDecline?: (orderId: string) => void;
  onClarify?: (orderId: string) => void;
}

const getStatusVariant = (status: CustomOrderStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'PENDING_SELLER_RESPONSE':
      return 'secondary';
    case 'ACCEPTED':
      return 'default';
    case 'CLARIFICATION_NEEDED':
      return 'secondary';
    case 'CONVERTED_TO_ORDER':
      return 'default';
    case 'DECLINED':
      return 'destructive';
    case 'CANCELLED':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStatusLabel = (status: CustomOrderStatus): string => {
  switch (status) {
    case 'PENDING_SELLER_RESPONSE':
      return 'Pending';
    case 'ACCEPTED':
      return 'Accepted';
    case 'CLARIFICATION_NEEDED':
      return 'Clarification Needed';
    case 'CONVERTED_TO_ORDER':
      return 'Converted to Order';
    case 'DECLINED':
      return 'Declined';
    case 'CANCELLED':
      return 'Cancelled';
    default:
      return status;
  }
};

export const CustomOrderCard: FC<CustomOrderCardProps> = ({
  order,
  userRole,
  className,
  onClick,
  onAccept,
  onDecline,
  onClarify,
}) => {
  const isSeller = userRole === 'SELLER' || userRole === 'BOTH';
  const isBuyer = userRole === 'BUYER' || userRole === 'BOTH';
  const showSellerActions = isSeller && order.status === 'PENDING_SELLER_RESPONSE';

  const otherUser = isSeller ? order.buyer : order.seller;
  const otherUserLabel = isSeller ? 'Buyer' : 'Seller';

  const primaryImage = order.photos && order.photos.length > 0 ? order.photos[0] : null;
  const hasDeadline = order.deliveryDeadline || order.isAsap;

  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick && !(e.target as HTMLElement).closest('button')) {
      onClick();
    }
  };

  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAccept) onAccept(order.id);
  };

  const handleDecline = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDecline) onDecline(order.id);
  };

  const handleClarify = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClarify) onClarify(order.id);
  };

  return (
    <Card
      className={cn(
        'overflow-hidden hover:shadow-md transition-shadow',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4">
          {/* Primary Image */}
          <div className="relative w-full h-24 bg-muted rounded-lg overflow-hidden md:w-24 md:h-24">
            {primaryImage ? (
              <Image
                src={primaryImage}
                alt={order.title}
                fill
                className="object-cover"
                sizes="100px"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                No Image
              </div>
            )}

            {/* Image Count Badge */}
            {order.photos && order.photos.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                +{order.photos.length - 1}
              </div>
            )}
          </div>

          {/* Order Details */}
          <div className="space-y-2">
            {/* Title and Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="font-semibold text-sm md:text-base line-clamp-1">
                {order.title}
              </h3>
              <Badge variant={getStatusVariant(order.status)} className="w-fit">
                {getStatusLabel(order.status)}
              </Badge>
            </div>

            {/* Description Preview */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {order.description}
            </p>

            {/* Order Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
              {/* Price */}
              {order.maxPrice && (
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Max Price</p>
                    <p className="font-medium">
                      {formatPrice(order.maxPrice, order.currency)}
                    </p>
                  </div>
                </div>
              )}

              {/* Deadline */}
              {hasDeadline && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground">Deadline</p>
                    <p className="font-medium">
                      {order.isAsap ? 'ASAP' : formatDate(order.deliveryDeadline!)}
                    </p>
                  </div>
                </div>
              )}

              {/* Buyer/Seller Info */}
              {otherUser && (
                <div className="flex items-center gap-1.5 col-span-2">
                  <User className="w-3.5 h-3.5 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <p className="text-muted-foreground">{otherUserLabel}:</p>
                    <div className="flex items-center gap-1.5">
                      <Avatar className="w-5 h-5">
                        {otherUser.avatar && (
                          <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                        )}
                        <AvatarFallback className="text-[10px]">
                          {getInitials(otherUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium hover:text-primary transition-colors">
                        {otherUser.name}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Created Date */}
            <div className="text-xs text-muted-foreground pt-1">
              Posted {formatDate(order.createdAt)}
            </div>
          </div>

          {/* Right Side - Quick Status Indicator */}
          <div className="flex flex-col items-end justify-start gap-2">
            {order.status === 'PENDING' && (
              <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                <MessageSquare className="w-3 h-3" />
                <span>Awaiting</span>
              </div>
            )}

            {order.status === 'ACCEPTED' && (
              <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                <Check className="w-3 h-3" />
                <span>Active</span>
              </div>
            )}

            {order.status === 'DECLINED' && (
              <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                <X className="w-3 h-3" />
                <span>Declined</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Actions Footer */}
      {(showSellerActions || onClick) && (
        <CardFooter className="border-t px-4 py-3 bg-muted/30 flex flex-wrap gap-2">
          {/* Seller Actions */}
          {showSellerActions && (
            <>
              <Button
                onClick={handleAccept}
                size="sm"
                className="gap-1.5"
              >
                <Check className="w-4 h-4" />
                Accept
              </Button>

              <Button
                onClick={handleDecline}
                variant="destructive"
                size="sm"
                className="gap-1.5"
              >
                <X className="w-4 h-4" />
                Decline
              </Button>

              <Button
                onClick={handleClarify}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                Clarify
              </Button>
            </>
          )}

          {/* View Details (shown for all users) */}
          {onClick && !showSellerActions && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              variant="ghost"
              size="sm"
              className="gap-1.5"
            >
              View Details
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

CustomOrderCard.displayName = 'CustomOrderCard';

export default CustomOrderCard;
