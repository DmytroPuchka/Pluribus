/**
 * CustomOrderDetails Component
 * Full detailed view for custom orders
 * Shows photo gallery, all order information, timeline, messages, and action buttons
 *
 * @component
 * @example
 * ```tsx
 * <CustomOrderDetails
 *   order={customOrder}
 *   userRole="SELLER"
 *   onAccept={handleAccept}
 *   onDecline={handleDecline}
 * />
 * ```
 */

'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import {
  Calendar,
  User,
  DollarSign,
  MessageSquare,
  Check,
  X,
  Clock,
  MapPin,
  Package,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { CustomOrder, CustomOrderStatus, UserRole } from '@/types';
import { cn, formatDate, formatRelativeTime, formatPrice, getInitials } from '@/lib/utils';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
}

interface StatusChange {
  id: string;
  status: CustomOrderStatus;
  timestamp: Date;
  note?: string;
}

interface CustomOrderDetailsProps {
  order: CustomOrder;
  userRole: UserRole;
  className?: string;
  messages?: Message[];
  statusHistory?: StatusChange[];
  onAccept?: (orderId: string) => void;
  onDecline?: (orderId: string, reason?: string) => void;
  onComplete?: (orderId: string) => void;
  onCancel?: (orderId: string, reason?: string) => void;
  onSendMessage?: (orderId: string, message: string) => void;
}

const getStatusVariant = (status: CustomOrderStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'PENDING_SELLER_RESPONSE':
      return 'secondary';
    case 'ACCEPTED':
      return 'default';
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
    case 'CONVERTED_TO_ORDER':
      return 'Completed';
    case 'DECLINED':
      return 'Declined';
    case 'CANCELLED':
      return 'Cancelled';
    default:
      return status;
  }
};

export const CustomOrderDetails: FC<CustomOrderDetailsProps> = ({
  order,
  userRole,
  className,
  messages = [],
  statusHistory = [],
  onAccept,
  onDecline,
  onComplete,
  onCancel,
  onSendMessage,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [messageText, setMessageText] = useState('');

  const isSeller = userRole === 'SELLER' || userRole === 'BOTH';
  const isBuyer = userRole === 'BUYER' || userRole === 'BOTH';
  const showSellerActions = isSeller && order.status === 'PENDING_SELLER_RESPONSE';
  const showCompleteAction = isSeller && order.status === 'ACCEPTED';
  const showCancelAction = isBuyer && order.status === 'PENDING_SELLER_RESPONSE';

  const otherUser = isSeller ? order.buyer : order.seller;
  const otherUserLabel = isSeller ? 'Buyer' : 'Seller';

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? order.photos.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === order.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleSendMessage = () => {
    if (messageText.trim() && onSendMessage) {
      onSendMessage(order.id, messageText);
      setMessageText('');
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{order.title}</CardTitle>
              <CardDescription>
                Posted {formatRelativeTime(order.createdAt)}
              </CardDescription>
            </div>
            <Badge variant={getStatusVariant(order.status)} className="w-fit">
              {getStatusLabel(order.status)}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Photo Gallery */}
          {order.photos && order.photos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={order.photos[currentImageIndex]}
                      alt={`${order.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />

                    {/* Navigation Arrows */}
                    {order.photos.length > 1 && (
                      <>
                        <Button
                          onClick={handlePreviousImage}
                          variant="outline"
                          size="icon"
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </Button>
                        <Button
                          onClick={handleNextImage}
                          variant="outline"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1.5 rounded">
                          {currentImageIndex + 1} / {order.photos.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Thumbnail Gallery */}
                  {order.photos.length > 1 && (
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                      {order.photos.map((photo, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={cn(
                            'relative w-full h-20 bg-muted rounded-lg overflow-hidden transition-all',
                            currentImageIndex === index
                              ? 'ring-2 ring-primary ring-offset-2'
                              : 'opacity-60 hover:opacity-100'
                          )}
                        >
                          <Image
                            src={photo}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="100px"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {order.description}
              </p>
            </CardContent>
          </Card>

          {/* Messages/Chat Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Messages List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {messages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No messages yet. Start the conversation!
                    </p>
                  ) : (
                    messages.map((message) => {
                      const isCurrentUser = message.senderId === (isSeller ? order.sellerId : order.buyerId);
                      return (
                        <div
                          key={message.id}
                          className={cn(
                            'flex gap-3',
                            isCurrentUser && 'flex-row-reverse'
                          )}
                        >
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs">
                              {getInitials(message.senderName)}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={cn(
                              'flex-1 max-w-[70%] space-y-1',
                              isCurrentUser && 'items-end'
                            )}
                          >
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="font-medium">{message.senderName}</span>
                              <span>{formatRelativeTime(message.timestamp)}</span>
                            </div>
                            <div
                              className={cn(
                                'px-4 py-2 rounded-lg',
                                isCurrentUser
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              )}
                            >
                              <p className="text-sm">{message.message}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Message Input */}
                {order.status !== 'DECLINED' && order.status !== 'CANCELLED' && (
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Type your message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[60px]"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      size="icon"
                      className="shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Info & Actions */}
        <div className="space-y-6">
          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Max Price */}
              {order.maxPrice && (
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Maximum Price</p>
                    <p className="text-lg font-semibold text-primary">
                      {formatPrice(order.maxPrice, order.currency)}
                    </p>
                  </div>
                </div>
              )}

              {/* Deadline */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Delivery Deadline</p>
                  <p className="text-base font-medium">
                    {order.deliveryType === 'asap' ? (
                      <Badge variant="secondary">As soon as possible</Badge>
                    ) : (
                      formatDate(order.deliveryDeadline!)
                    )}
                  </p>
                </div>
              </div>

              {/* Posted Date */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Posted</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>

              {/* Buyer/Seller Info */}
              {otherUser && (
                <div className="flex items-start gap-3 pt-2 border-t">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-2">{otherUserLabel}</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        {otherUser.avatar && (
                          <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                        )}
                        <AvatarFallback>
                          {getInitials(otherUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{otherUser.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{otherUser.city}, {otherUser.country}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {(showSellerActions || showCompleteAction || showCancelAction) && (
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Seller Actions for Pending Orders */}
                {showSellerActions && (
                  <>
                    <Button
                      onClick={() => onAccept && onAccept(order.id)}
                      className="w-full gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Accept Order
                    </Button>

                    <Button
                      onClick={() => onDecline && onDecline(order.id)}
                      variant="destructive"
                      className="w-full gap-2"
                    >
                      <X className="w-4 h-4" />
                      Decline Order
                    </Button>
                  </>
                )}

                {/* Seller Complete Action */}
                {showCompleteAction && (
                  <Button
                    onClick={() => onComplete && onComplete(order.id)}
                    className="w-full gap-2"
                  >
                    <Package className="w-4 h-4" />
                    Mark as Completed
                  </Button>
                )}

                {/* Buyer Cancel Action */}
                {showCancelAction && (
                  <Button
                    onClick={() => onCancel && onCancel(order.id)}
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel Order
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Status Timeline */}
          {statusHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Status History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusHistory.map((change, index) => (
                    <div
                      key={change.id}
                      className={cn(
                        'flex gap-3 pb-4',
                        index < statusHistory.length - 1 && 'border-b'
                      )}
                    >
                      <div className="relative">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center',
                            getStatusVariant(change.status) === 'destructive'
                              ? 'bg-destructive/10 text-destructive'
                              : getStatusVariant(change.status) === 'default'
                              ? 'bg-primary/10 text-primary'
                              : 'bg-secondary text-secondary-foreground'
                          )}
                        >
                          {change.status === 'ACCEPTED' && <Check className="w-4 h-4" />}
                          {change.status === 'DECLINED' && <X className="w-4 h-4" />}
                          {change.status === 'CONVERTED_TO_ORDER' && <Package className="w-4 h-4" />}
                          {change.status === 'CANCELLED' && <X className="w-4 h-4" />}
                          {change.status === 'PENDING_SELLER_RESPONSE' && <Clock className="w-4 h-4" />}
                        </div>
                        {index < statusHistory.length - 1 && (
                          <div className="absolute left-1/2 top-8 w-0.5 h-8 -translate-x-1/2 bg-border" />
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="font-medium text-sm">
                          {getStatusLabel(change.status)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(change.timestamp)}
                        </p>
                        {change.note && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {change.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

CustomOrderDetails.displayName = 'CustomOrderDetails';

export default CustomOrderDetails;
