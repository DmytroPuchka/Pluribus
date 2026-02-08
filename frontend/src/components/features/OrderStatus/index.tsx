/**
 * OrderStatus Component
 * Displays the status of an order with appropriate styling
 *
 * @component
 * @example
 * ```tsx
 * <OrderStatus status="DELIVERED" />
 * ```
 */

import { FC } from 'react';
import { Badge } from '@/components/ui/badge';
import { OrderStatus as OrderStatusType } from '@/types';
import { cn } from '@/lib/utils';

interface OrderStatusProps {
  status: OrderStatusType;
  className?: string;
}

const getStatusVariant = (status: OrderStatusType): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'PENDING':
      return 'secondary';
    case 'ACCEPTED':
      return 'secondary';
    case 'PAID':
      return 'secondary';
    case 'SHIPPED':
      return 'default';
    case 'DELIVERED':
      return 'default';
    case 'COMPLETED':
      return 'default';
    case 'CANCELLED':
      return 'destructive';
    case 'DISPUTED':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStatusLabel = (status: OrderStatusType): string => {
  switch (status) {
    case 'PENDING':
      return 'Pending';
    case 'ACCEPTED':
      return 'Accepted';
    case 'PAID':
      return 'Paid';
    case 'SHIPPED':
      return 'Shipped';
    case 'DELIVERED':
      return 'Delivered';
    case 'COMPLETED':
      return 'Completed';
    case 'CANCELLED':
      return 'Cancelled';
    case 'DISPUTED':
      return 'Disputed';
    default:
      return status;
  }
};

export const OrderStatus: FC<OrderStatusProps> = ({ status, className }) => {
  return (
    <Badge
      variant={getStatusVariant(status)}
      className={cn('whitespace-nowrap', className)}
    >
      {getStatusLabel(status)}
    </Badge>
  );
};

OrderStatus.displayName = 'OrderStatus';

export default OrderStatus;
