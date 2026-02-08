/**
 * PriceDisplay Component
 * Formats and displays price with currency
 *
 * @component
 * @example
 * ```tsx
 * <PriceDisplay amount={99.99} currency="USD" />
 * ```
 */

import { FC } from 'react';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  amount: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showCurrency?: boolean;
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl',
};

export const PriceDisplay: FC<PriceDisplayProps> = ({
  amount,
  currency = 'USD',
  size = 'md',
  className,
  showCurrency = true,
}) => {
  const formattedPrice = showCurrency
    ? formatPrice(amount, currency)
    : amount.toFixed(2);

  return (
    <span className={cn('font-semibold text-primary', sizeClasses[size], className)}>
      {formattedPrice}
    </span>
  );
};

PriceDisplay.displayName = 'PriceDisplay';

export default PriceDisplay;
