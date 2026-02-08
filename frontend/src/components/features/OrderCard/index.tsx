/**
 * OrderCard Component
 * Displays order information in a card format with actions
 *
 * @component
 * @example
 * ```tsx
 * <OrderCard order={order} />
 * ```
 */

'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Eye, Truck, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OrderStatus } from '@/components/features/OrderStatus';
import { Order } from '@/types';
import { cn } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
  className?: string;
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const OrderCard: FC<OrderCardProps> = ({ order, className }) => {
  const productImage = order.product?.photos[0];
  const isShipped = ['SHIPPED', 'DELIVERED', 'COMPLETED'].includes(order.status);
  const isPending = ['PENDING', 'ACCEPTED'].includes(order.status);

  return (
    <Card className={cn('overflow-hidden hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-4">
          {/* Product Image */}
          <div className="relative w-full h-24 bg-muted rounded-lg overflow-hidden md:w-24 md:h-24">
            {productImage ? (
              <Image
                src={productImage}
                alt={order.product?.title || 'Product'}
                fill
                className="object-cover"
                sizes="100px"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                No Image
              </div>
            )}
          </div>

          {/* Order Details */}
          <div className="space-y-2">
            {/* Order Number and Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <Link
                href={`/dashboard/orders/${order.id}`}
                className="hover:text-primary transition-colors"
              >
                <h3 className="font-semibold text-sm md:text-base">
                  {order.orderNumber}
                </h3>
              </Link>
              <OrderStatus status={order.status} />
            </div>

            {/* Product Title */}
            <Link
              href={`/products/${order.productId}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1"
            >
              {order.product?.title || 'Product'}
            </Link>

            {/* Order Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
              {/* Quantity */}
              <div>
                <p className="text-muted-foreground">Quantity</p>
                <p className="font-medium">{order.quantity}</p>
              </div>

              {/* Price */}
              <div>
                <p className="text-muted-foreground">Amount</p>
                <p className="font-medium">
                  {formatCurrency(order.price, order.currency)}
                </p>
              </div>

              {/* Buyer/Seller Info */}
              <div>
                <p className="text-muted-foreground">
                  {order.buyerId === 'buyer-1' ? 'From' : 'To'}
                </p>
                <Link
                  href={`/sellers/${order.sellerId}`}
                  className="font-medium hover:text-primary transition-colors line-clamp-1"
                >
                  {order.seller?.name || 'Unknown'}
                </Link>
              </div>

              {/* Date */}
              <div>
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium">{formatDate(order.createdAt)}</p>
              </div>
            </div>

            {/* Tracking Number if available */}
            {order.trackingNumber && (
              <div className="text-xs pt-2">
                <p className="text-muted-foreground">Tracking: {order.trackingNumber}</p>
              </div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex flex-col gap-2 md:flex-col md:items-end md:justify-start">
            {/* Status Badge with icon */}
            {isShipped && (
              <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                <Truck className="w-3 h-3" />
                <span>Shipping</span>
              </div>
            )}

            {isPending && (
              <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                <MessageSquare className="w-3 h-3" />
                <span>Pending</span>
              </div>
            )}

            {order.status === 'CANCELLED' && (
              <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                <span>Cancelled</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Actions Footer */}
      <CardFooter className="border-t px-4 py-3 bg-muted/30 flex gap-2">
        <Button asChild variant="ghost" size="sm" className="gap-1.5">
          <Link href={`/dashboard/orders/${order.id}`}>
            <Eye className="w-4 h-4" />
            View Details
            <ChevronRight className="w-3 h-3" />
          </Link>
        </Button>

        {isShipped && order.trackingNumber && (
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Truck className="w-4 h-4" />
            Track
            <ChevronRight className="w-3 h-3" />
          </Button>
        )}

        {isPending && (
          <Button variant="ghost" size="sm" className="gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Message
            <ChevronRight className="w-3 h-3" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

OrderCard.displayName = 'OrderCard';

export default OrderCard;
