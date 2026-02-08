/**
 * Logo Component
 * Displays the Pluribus logo
 *
 * @component
 * @example
 * ```tsx
 * <Logo size="md" />
 * ```
 */

import Link from 'next/link';
import { FC } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
}

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
};

export const Logo: FC<LogoProps> = ({
  size = 'md',
  className,
  href = '/'
}) => {
  const content = (
    <div className={cn(
      'font-bold text-primary flex items-center gap-2',
      sizeClasses[size],
      className
    )}>
      <svg
        className="w-8 h-8"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2L2 9L16 16L30 9L16 2Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M16 16L2 23L16 30L30 23L16 16Z"
          fill="currentColor"
        />
      </svg>
      <span>Pluribus</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline">
        {content}
      </Link>
    );
  }

  return content;
};

Logo.displayName = 'Logo';

export default Logo;
