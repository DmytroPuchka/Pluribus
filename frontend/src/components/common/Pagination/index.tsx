/**
 * Pagination Component
 * Reusable pagination component with page numbers, navigation buttons, and items per page selector
 *
 * @component
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   totalItems={100}
 *   itemsPerPage={10}
 *   onPageChange={(page) => console.log(page)}
 *   onItemsPerPageChange={(items) => console.log(items)}
 * />
 * ```
 */

'use client';

import { FC, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  showItemsPerPageSelector?: boolean;
  showTotalItems?: boolean;
  maxPagesToShow?: number;
  className?: string;
  disabled?: boolean;
}

const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxPagesToShow: number = 5
): (number | string)[] => {
  if (totalPages <= maxPagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const halfWindow = Math.floor(maxPagesToShow / 2);

  // Always show first page
  pages.push(1);

  // Calculate the range around current page
  let startPage = Math.max(2, currentPage - halfWindow);
  let endPage = Math.min(totalPages - 1, currentPage + halfWindow);

  // Adjust if current page is near the start
  if (currentPage <= halfWindow + 1) {
    endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
  }

  // Adjust if current page is near the end
  if (currentPage > totalPages - halfWindow - 1) {
    startPage = Math.max(2, totalPages - maxPagesToShow + 2);
  }

  // Add ellipsis if needed
  if (startPage > 2) {
    pages.push('...');
  }

  // Add page numbers in range
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add ellipsis if needed
  if (endPage < totalPages - 1) {
    pages.push('...');
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 50, 100],
  showItemsPerPageSelector = true,
  showTotalItems = true,
  maxPagesToShow = 5,
  className,
  disabled = false,
}) => {
  const pageNumbers = useMemo(
    () => generatePageNumbers(currentPage, totalPages, maxPagesToShow),
    [currentPage, totalPages, maxPagesToShow]
  );

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && !disabled) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    if (onItemsPerPageChange && !disabled) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      {/* Total items display */}
      {showTotalItems && (
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{totalItems.toLocaleString()}</span>{' '}
          items
        </div>
      )}

      {/* Items per page selector */}
      {showItemsPerPageSelector && onItemsPerPageChange && (
        <div className="flex items-center gap-3">
          <label
            htmlFor="items-per-page"
            className="text-sm font-medium text-foreground"
          >
            Items per page:
          </label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
            disabled={disabled}
            className={cn(
              'h-9 rounded-md border border-input bg-background px-3 py-2 text-sm',
              'focus:outline-none focus:ring-2 focus:ring-ring/50',
              'disabled:opacity-50 disabled:pointer-events-none'
            )}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* First page button */}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => handlePageChange(1)}
          disabled={disabled || currentPage === 1}
          aria-label="Go to first page"
          title="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous button */}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label="Go to previous page"
          title="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => (
            <div key={`${page}-${index}`}>
              {page === '...' ? (
                <span className="px-2 py-1 text-muted-foreground">...</span>
              ) : (
                <Button
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="icon-sm"
                  onClick={() => handlePageChange(page as number)}
                  disabled={disabled}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                  className={cn(
                    page === currentPage && 'ring-2 ring-ring/50'
                  )}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          aria-label="Go to next page"
          title="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last page button */}
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={disabled || currentPage === totalPages}
          aria-label="Go to last page"
          title="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;
