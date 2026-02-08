/**
 * Rating Component
 * Displays star rating
 *
 * @component
 * @example
 * ```tsx
 * <Rating value={4.5} max={5} readonly />
 * ```
 */

'use client';

import { FC } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
  onChange?: (value: number) => void;
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export const Rating: FC<RatingProps> = ({
  value,
  max = 5,
  readonly = true,
  size = 'md',
  showValue = false,
  className,
  onChange,
}) => {
  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= fullStars;
          const isHalf = starNumber === fullStars + 1 && hasHalfStar;

          return (
            <button
              key={index}
              type="button"
              disabled={readonly}
              onClick={() => handleClick(starNumber)}
              className={cn(
                'relative',
                !readonly && 'cursor-pointer hover:scale-110 transition-transform'
              )}
              aria-label={`Rate ${starNumber} out of ${max}`}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled && 'fill-yellow-400 text-yellow-400',
                  !isFilled && !isHalf && 'fill-gray-200 text-gray-200'
                )}
              />
              {isHalf && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star
                    className={cn(
                      sizeClasses[size],
                      'fill-yellow-400 text-yellow-400'
                    )}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

Rating.displayName = 'Rating';

export default Rating;
