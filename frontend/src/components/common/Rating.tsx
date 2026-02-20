/**
 * Rating Component
 * Displays star ratings with optional interactivity
 */

'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  showValue?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function Rating({
  value,
  onChange,
  max = 5,
  size = 'md',
  readonly = true,
  showValue = false,
  className,
}: RatingProps) {
  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, rating: number) => {
    if (!readonly && onChange) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onChange(rating);
      }
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= value;
          const isPartial = !isFilled && starValue - 1 < value && value < starValue;
          const fillPercentage = isPartial ? ((value - (starValue - 1)) * 100) : 0;

          return (
            <div
              key={i}
              onClick={() => handleClick(starValue)}
              onKeyDown={(e) => handleKeyDown(e, starValue)}
              role={readonly ? undefined : 'button'}
              tabIndex={readonly ? undefined : 0}
              aria-label={`Rate ${starValue} out of ${max}`}
              className={cn(
                'relative',
                !readonly && 'cursor-pointer hover:scale-110 transition-transform',
                readonly && 'cursor-default'
              )}
            >
              {/* Background star (empty) */}
              <Star
                className={cn(
                  sizeClasses[size],
                  'text-muted-foreground/30 fill-muted-foreground/30'
                )}
              />

              {/* Foreground star (filled) */}
              {(isFilled || isPartial) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: isPartial ? `${fillPercentage}%` : '100%' }}
                >
                  <Star
                    className={cn(
                      sizeClasses[size],
                      'text-yellow-500 fill-yellow-500'
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showValue && (
        <span className="text-sm font-medium text-muted-foreground ml-1">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
