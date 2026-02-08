/**
 * StockStatus Component
 * Displays product stock availability status
 *
 * @component
 */

import { FC } from 'react';
import { Check, AlertCircle } from 'lucide-react';

interface StockStatusProps {
  quantity?: number;
}

export const StockStatus: FC<StockStatusProps> = ({ quantity }) => {
  if (quantity === undefined) return null;

  if (quantity === 0) {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Out of Stock</span>
      </div>
    );
  }

  if (quantity < 5) {
    return (
      <div className="flex items-center gap-2 text-amber-600">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Only {quantity} left in stock</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-green-600">
      <Check className="w-4 h-4" />
      <span className="text-sm font-medium">In Stock</span>
    </div>
  );
};

StockStatus.displayName = 'StockStatus';

export default StockStatus;
