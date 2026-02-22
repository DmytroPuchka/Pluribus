/**
 * OrderCard Component
 * Displays order information with actions
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package, MapPin, Calendar, Star, MessageCircle, X, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { Rating } from '@/components/common/Rating';
import { Order, OrderStatus } from '@/types';
import { reviewsService, ordersService } from '@/lib/api';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslations } from '@/contexts/TranslationsContext';

interface OrderCardProps {
  order: Order;
}

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  ACCEPTED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  PAID: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  SHIPPED: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  DELIVERED: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

export function OrderCard({ order: initialOrder }: OrderCardProps) {
  const { user } = useAuth();
  const { t } = useTranslations();
  const [order, setOrder] = useState(initialOrder);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // Review form state
  const [overallRating, setOverallRating] = useState(5);
  const [communicationRating, setCommunicationRating] = useState(5);
  const [timelinessRating, setTimelinessRating] = useState(5);
  const [comment, setComment] = useState('');

  // Order status update state
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  const isBuyer = user?.id === order.buyerId;
  const isSeller = user?.id === order.sellerId;
  const canLeaveReview = isBuyer && order.status === 'COMPLETED';
  const canCancelOrder = isBuyer && order.status === 'PENDING';

  // Get available status transitions based on current status
  const getAvailableStatuses = (): OrderStatus[] => {
    const transitions: Record<string, OrderStatus[]> = {
      PENDING: ['ACCEPTED', 'CANCELLED'],
      ACCEPTED: ['PAID', 'PROCESSING'],
      PAID: ['PROCESSING'],
      PROCESSING: ['SHIPPED'],
      SHIPPED: ['DELIVERED'],
      DELIVERED: [],
      CANCELLED: [],
      REFUNDED: [],
    };
    return transitions[order.status] || [];
  };

  // Handle status update
  const handleStatusChange = async (newStatus: OrderStatus) => {
    // If changing to SHIPPED, show modal for tracking number
    if (newStatus === 'SHIPPED') {
      setSelectedStatus(newStatus);
      setIsTrackingModalOpen(true);
      return;
    }

    // Otherwise, update status directly
    await updateOrderStatus(newStatus);
  };

  // Handle tracking number submission
  const handleTrackingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus) return;

    await updateOrderStatus(selectedStatus, trackingNumber.trim() || undefined);
    setIsTrackingModalOpen(false);
    setSelectedStatus(null);
  };

  // Update order status API call
  const updateOrderStatus = async (newStatus: OrderStatus, tracking?: string) => {
    setIsUpdatingStatus(true);

    try {
      const updatedOrder = await ordersService.updateOrderStatus(order.id, {
        status: newStatus,
        trackingNumber: tracking,
      });

      setOrder({
        ...updatedOrder,
        createdAt: new Date(updatedOrder.createdAt),
        updatedAt: new Date(updatedOrder.updatedAt),
      });

      toast.success('Order status updated', {
        description: `Status changed to ${newStatus}`,
      });
    } catch (error: any) {
      console.error('Error updating order status:', error);
      const errorMessage =
        error?.response?.data?.error || 'Failed to update order status';
      toast.error('Update failed', {
        description: errorMessage,
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle order cancellation (buyer only)
  const handleCancelOrder = async () => {
    if (!confirm(t('components.orderCard.cancelConfirm'))) {
      return;
    }

    setIsCancelling(true);

    try {
      const updatedOrder = await ordersService.cancelOrder(order.id);

      setOrder({
        ...updatedOrder,
        createdAt: new Date(updatedOrder.createdAt),
        updatedAt: new Date(updatedOrder.updatedAt),
      });

      toast.success(t('components.orderCard.cancelSuccess'), {
        description: t('components.orderCard.cancelSuccessDescription'),
      });
    } catch (error: any) {
      console.error('Error cancelling order:', error);
      const errorMessage =
        error?.response?.data?.error || t('components.orderCard.cancelError');
      toast.error(t('components.orderCard.cancelErrorTitle'), {
        description: errorMessage,
      });
    } finally {
      setIsCancelling(false);
    }
  };

  // Check if user already left a review for this order
  // In a real app, we would check this from the backend
  // For now, we'll just allow one review per order

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to leave a review');
      return;
    }

    setIsSubmittingReview(true);

    try {
      // Determine who to review (seller for buyer, buyer for seller)
      const revieweeId = isBuyer ? order.sellerId : order.buyerId;

      await reviewsService.createReview({
        orderId: order.id,
        revieweeId,
        overallRating,
        communicationRating,
        timelinessRating,
        comment: comment.trim() || undefined,
      });

      toast.success('Review submitted successfully!', {
        description: 'Thank you for your feedback',
      });

      // Reset form and close modal
      setIsReviewModalOpen(false);
      setOverallRating(5);
      setCommunicationRating(5);
      setTimelinessRating(5);
      setComment('');

      // Refresh page to show updated state
      window.location.reload();
    } catch (error: any) {
      console.error('Error submitting review:', error);
      const errorMessage =
        error?.response?.data?.error || 'Failed to submit review';
      toast.error('Review submission failed', {
        description: errorMessage,
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-sm font-medium">
                  {order.orderNumber || `#${order.id.slice(0, 8)}`}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
            <Badge className={statusColors[order.status] || ''}>
              {order.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Product Info */}
          {order.product && (
            <div className="flex gap-4">
              {order.product.photos && order.product.photos[0] && (
                <Link
                  href={`/products/${order.product.id}`}
                  className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={order.product.photos[0]}
                    alt={order.product.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </Link>
              )}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${order.product.id}`}
                  className="font-semibold hover:text-primary transition-colors line-clamp-2"
                >
                  {order.product.title}
                </Link>
                <PriceDisplay amount={order.price} currency={order.currency} size="sm" />
              </div>
            </div>
          )}

          {/* Buyer/Seller Info */}
          <div className="flex items-center justify-between text-sm">
            <div>
              {isBuyer ? (
                <>
                  <span className="text-muted-foreground">Seller: </span>
                  <Link
                    href={`/sellers/${order.seller?.id}`}
                    className="font-medium hover:text-primary transition-colors"
                  >
                    {order.seller?.name}
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-muted-foreground">Buyer: </span>
                  <span className="font-medium">{order.buyer?.name}</span>
                </>
              )}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{order.deliveryAddress}</span>
          </div>

          {/* Tracking Number */}
          {order.trackingNumber && (
            <div className="text-sm">
              <span className="text-muted-foreground">Tracking: </span>
              <span className="font-mono font-medium">{order.trackingNumber}</span>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div className="text-sm text-muted-foreground italic bg-muted/50 p-2 rounded">
              "{order.notes}"
            </div>
          )}

          {/* Seller Status Management */}
          {isSeller && getAvailableStatuses().length > 0 && (
            <div className="border-t pt-4">
              <Label className="text-sm font-medium mb-2 block">Update Order Status</Label>
              <div className="flex gap-2">
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(value as OrderStatus)}
                  disabled={isUpdatingStatus}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={order.status}>{order.status}</SelectItem>
                    {getAvailableStatuses().map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2 flex-wrap">
            {canLeaveReview && (
              <Button
                size="sm"
                variant="default"
                onClick={() => setIsReviewModalOpen(true)}
                className="gap-2"
              >
                <Star className="w-4 h-4" />
                Leave Review
              </Button>
            )}

            {canCancelOrder && (
              <Button
                size="sm"
                variant="destructive"
                onClick={handleCancelOrder}
                disabled={isCancelling}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                {isCancelling ? t('components.orderCard.cancelling') : t('components.orderCard.cancelOrder')}
              </Button>
            )}

            <Button size="sm" variant="outline" asChild className="gap-2">
              <Link href={`/chat/${isBuyer ? order.sellerId : order.buyerId}`}>
                <MessageCircle className="w-4 h-4" />
                Message {isBuyer ? 'Seller' : 'Buyer'}
              </Link>
            </Button>

            {order.product && (
              <Button size="sm" variant="outline" asChild>
                <Link href={`/products/${order.product.id}`}>View Product</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tracking Number Modal */}
      {isTrackingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-background rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsTrackingModalOpen(false);
                setSelectedStatus(null);
              }}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
              disabled={isUpdatingStatus}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Mark as Shipped</h2>
                  <p className="text-sm text-muted-foreground">
                    Add tracking information
                  </p>
                </div>
              </div>

              <form onSubmit={handleTrackingSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trackingNumber">
                    Tracking Number (Optional)
                  </Label>
                  <Input
                    id="trackingNumber"
                    placeholder="Enter tracking number..."
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    disabled={isUpdatingStatus}
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide a tracking number to help the buyer track their shipment
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsTrackingModalOpen(false);
                      setSelectedStatus(null);
                    }}
                    disabled={isUpdatingStatus}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isUpdatingStatus}
                  >
                    {isUpdatingStatus ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Truck className="w-4 h-4 mr-2" />
                        Mark as Shipped
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-background rounded-lg shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
              disabled={isSubmittingReview}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">Leave a Review</h2>
              <p className="text-muted-foreground mb-6">
                Share your experience with {order.seller?.name}
              </p>

              <form onSubmit={handleSubmitReview} className="space-y-6">
                {/* Overall Rating */}
                <div className="space-y-2">
                  <Label>Overall Rating *</Label>
                  <div className="flex items-center gap-4">
                    <Rating
                      value={overallRating}
                      onChange={setOverallRating}
                      size="lg"
                      readonly={false}
                    />
                    <span className="text-sm text-muted-foreground">
                      {overallRating}/5
                    </span>
                  </div>
                </div>

                {/* Communication Rating */}
                <div className="space-y-2">
                  <Label>Communication *</Label>
                  <div className="flex items-center gap-4">
                    <Rating
                      value={communicationRating}
                      onChange={setCommunicationRating}
                      size="md"
                      readonly={false}
                    />
                    <span className="text-sm text-muted-foreground">
                      {communicationRating}/5
                    </span>
                  </div>
                </div>

                {/* Timeliness Rating */}
                <div className="space-y-2">
                  <Label>Timeliness *</Label>
                  <div className="flex items-center gap-4">
                    <Rating
                      value={timelinessRating}
                      onChange={setTimelinessRating}
                      size="md"
                      readonly={false}
                    />
                    <span className="text-sm text-muted-foreground">
                      {timelinessRating}/5
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <Label htmlFor="comment">Your Review (Optional)</Label>
                  <Textarea
                    id="comment"
                    placeholder="Share details about your experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    disabled={isSubmittingReview}
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground">
                    {comment.length}/500 characters
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsReviewModalOpen(false)}
                    disabled={isSubmittingReview}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmittingReview}
                  >
                    {isSubmittingReview ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Submit Review
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
