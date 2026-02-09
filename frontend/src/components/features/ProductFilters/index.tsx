/**
 * ProductFilters Component
 * Comprehensive filtering component for products with category, price, rating, country, and sort options
 *
 * @component
 * @example
 * ```tsx
 * <ProductFilters
 *   products={products}
 *   onFiltersChange={(filteredProducts) => setProducts(filteredProducts)}
 * />
 * ```
 */

'use client';

import { FC, useState, useCallback, useMemo } from 'react';
import { X, Sliders } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product, ProductCategory } from '@/types';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/contexts/TranslationsContext';

/**
 * Filter object structure
 */
export interface ProductFiltersState {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  country?: string;
  sortBy?: 'newest' | 'price-low-high' | 'price-high-low' | 'rating';
}

/**
 * Available categories
 */
const CATEGORIES: ProductCategory[] = [
  'ELECTRONICS',
  'CLOTHING',
  'FOOD',
  'BEAUTY',
  'BOOKS',
  'TOYS',
  'SPORTS',
  'HOME',
  'OTHER',
];


interface ProductFiltersProps {
  products: Product[];
  onFiltersChange: (filteredProducts: Product[], filters: ProductFiltersState) => void;
  className?: string;
}

/**
 * Extract unique countries from products
 */
const getCountriesFromProducts = (products: Product[]): string[] => {
  const countries = new Set<string>();
  products.forEach(product => {
    if (product.seller?.country) {
      countries.add(product.seller.country);
    }
  });
  return Array.from(countries).sort();
};

/**
 * Apply filters to products
 */
const applyFilters = (
  products: Product[],
  filters: ProductFiltersState
): Product[] => {
  let filtered = products;

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(p => p.category === filters.category);
  }

  // Filter by price range
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(p => p.price <= filters.maxPrice!);
  }

  // Filter by seller rating
  if (filters.minRating !== undefined && filters.minRating > 0) {
    filtered = filtered.filter(
      p => (p.seller?.rating || 0) >= filters.minRating!
    );
  }

  // Filter by country
  if (filters.country) {
    filtered = filtered.filter(p => p.seller?.country === filters.country);
  }

  // Sort results
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort(
          (a, b) => (b.seller?.rating || 0) - (a.seller?.rating || 0)
        );
        break;
    }
  }

  return filtered;
};

export const ProductFilters: FC<ProductFiltersProps> = ({
  products,
  onFiltersChange,
  className,
}) => {
  const { t } = useTranslations();
  const [filters, setFilters] = useState<ProductFiltersState>({});
  const [isExpanded, setIsExpanded] = useState(true);

  // Sort options
  const SORT_OPTIONS = useMemo(() => [
    { label: t('pages.products.filters.sortOptions.newest'), value: 'newest' as const },
    { label: t('pages.products.filters.sortOptions.priceLowToHigh'), value: 'price-low-high' as const },
    { label: t('pages.products.filters.sortOptions.priceHighToLow'), value: 'price-high-low' as const },
    { label: t('pages.products.filters.sortOptions.topRated'), value: 'rating' as const },
  ], [t]);

  // Rating options (minimum seller rating)
  const RATING_OPTIONS = useMemo(() => [
    { label: t('pages.products.filters.allRatings'), value: 0 },
    { label: t('pages.products.filters.ratingOptions.3plus'), value: 3 },
    { label: t('pages.products.filters.ratingOptions.4plus'), value: 4 },
    { label: t('pages.products.filters.ratingOptions.5stars'), value: 5 },
  ], [t]);

  // Get available countries
  const countries = useMemo(() => getCountriesFromProducts(products), [products]);

  // Get price range from products
  const priceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 1000 };
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  // Apply filters and notify parent
  const handleFilterChange = useCallback(
    (newFilters: ProductFiltersState) => {
      setFilters(newFilters);
      const filtered = applyFilters(products, newFilters);
      onFiltersChange(filtered, newFilters);
    },
    [products, onFiltersChange]
  );

  // Handle category change
  const handleCategoryChange = (category: string) => {
    const newCategory = category === 'ALL' ? undefined : (category as ProductCategory);
    handleFilterChange({
      ...filters,
      category: newCategory,
    });
  };

  // Handle min price change
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : undefined;
    handleFilterChange({
      ...filters,
      minPrice: value,
    });
  };

  // Handle max price change
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : undefined;
    handleFilterChange({
      ...filters,
      maxPrice: value,
    });
  };

  // Handle rating change
  const handleRatingChange = (rating: string) => {
    const value = parseFloat(rating);
    handleFilterChange({
      ...filters,
      minRating: value || undefined,
    });
  };

  // Handle country change
  const handleCountryChange = (country: string) => {
    const newCountry = country === 'ALL' ? undefined : country;
    handleFilterChange({
      ...filters,
      country: newCountry,
    });
  };

  // Handle sort change
  const handleSortChange = (sort: string) => {
    const newSort = sort === 'NONE' ? undefined : (sort as any);
    handleFilterChange({
      ...filters,
      sortBy: newSort,
    });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({});
    onFiltersChange(products, {});
  };

  // Check if any filter is active
  const hasActiveFilters = Object.values(filters).some(
    value => value !== undefined && value !== 0
  );

  // Count active filters
  const activeFilterCount = Object.values(filters).filter(
    value => value !== undefined && value !== 0
  ).length;

  return (
    <div className={cn('w-full', className)}>
      <Card>
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            <div>
              <CardTitle>{t('pages.products.filters.title')}</CardTitle>
              {hasActiveFilters && (
                <CardDescription>
                  {activeFilterCount} {activeFilterCount !== 1 ? t('pages.products.filters.appliedPlural') : t('pages.products.filters.applied')}
                </CardDescription>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground"
          >
            {isExpanded ? '−' : '+'}
          </Button>
        </CardHeader>

        {/* Content */}
        {isExpanded && (
          <CardContent className="space-y-6">
            {/* Category Filter */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                {t('pages.products.filters.category')}
              </Label>
              <Select
                value={filters.category || 'ALL'}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder={t('pages.products.filters.allCategories')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">{t('pages.products.filters.allCategories')}</SelectItem>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0) + category.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">{t('pages.products.filters.priceRange')}</Label>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label
                    htmlFor="min-price"
                    className="text-xs text-muted-foreground mb-1 block"
                  >
                    {t('pages.products.filters.min')}
                  </Label>
                  <Input
                    id="min-price"
                    type="number"
                    placeholder={`${Math.floor(priceRange.min)}`}
                    value={filters.minPrice ?? ''}
                    onChange={handleMinPriceChange}
                    className="h-8"
                  />
                </div>
                <div className="text-muted-foreground">–</div>
                <div className="flex-1">
                  <Label
                    htmlFor="max-price"
                    className="text-xs text-muted-foreground mb-1 block"
                  >
                    {t('pages.products.filters.max')}
                  </Label>
                  <Input
                    id="max-price"
                    type="number"
                    placeholder={`${Math.ceil(priceRange.max)}`}
                    value={filters.maxPrice ?? ''}
                    onChange={handleMaxPriceChange}
                    className="h-8"
                  />
                </div>
              </div>
            </div>

            {/* Seller Rating Filter */}
            <div className="space-y-2">
              <Label htmlFor="rating" className="text-sm font-medium">
                {t('pages.products.filters.sellerRating')}
              </Label>
              <Select
                value={(filters.minRating ?? 0).toString()}
                onValueChange={handleRatingChange}
              >
                <SelectTrigger id="rating">
                  <SelectValue placeholder={t('pages.products.filters.allRatings')} />
                </SelectTrigger>
                <SelectContent>
                  {RATING_OPTIONS.map(option => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Country Filter */}
            {countries.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium">
                  {t('pages.products.filters.country')}
                </Label>
                <Select
                  value={filters.country || 'ALL'}
                  onValueChange={handleCountryChange}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder={t('pages.products.filters.allCountries')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">{t('pages.products.filters.allCountries')}</SelectItem>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Sort By Filter */}
            <div className="space-y-2">
              <Label htmlFor="sort" className="text-sm font-medium">
                {t('pages.products.filters.sortBy')}
              </Label>
              <Select
                value={filters.sortBy || 'NONE'}
                onValueChange={handleSortChange}
              >
                <SelectTrigger id="sort">
                  <SelectValue placeholder={t('pages.products.filters.sortByPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">{t('pages.products.filters.none')}</SelectItem>
                  {SORT_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">{t('pages.products.filters.activeFilters')}</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {t('pages.products.filters.clearAll')}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.category && (
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-secondary/80"
                      onClick={() => handleCategoryChange('ALL')}
                    >
                      {t('pages.products.filters.badges.category')} {filters.category.charAt(0) +
                        filters.category.slice(1).toLowerCase()}
                      <X className="w-3 h-3" />
                    </Badge>
                  )}
                  {filters.minPrice !== undefined && (
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-secondary/80"
                      onClick={() =>
                        handleFilterChange({ ...filters, minPrice: undefined })
                      }
                    >
                      {t('pages.products.filters.badges.priceMin')} ${filters.minPrice}
                      <X className="w-3 h-3" />
                    </Badge>
                  )}
                  {filters.maxPrice !== undefined && (
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-secondary/80"
                      onClick={() =>
                        handleFilterChange({ ...filters, maxPrice: undefined })
                      }
                    >
                      {t('pages.products.filters.badges.priceMax')} ${filters.maxPrice}
                      <X className="w-3 h-3" />
                    </Badge>
                  )}
                  {filters.minRating !== undefined && filters.minRating > 0 && (
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-secondary/80"
                      onClick={() =>
                        handleFilterChange({ ...filters, minRating: undefined })
                      }
                    >
                      {t('pages.products.filters.badges.rating')} {filters.minRating}+
                      <X className="w-3 h-3" />
                    </Badge>
                  )}
                  {filters.country && (
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-secondary/80"
                      onClick={() => handleCountryChange('ALL')}
                    >
                      {t('pages.products.filters.badges.country')} {filters.country}
                      <X className="w-3 h-3" />
                    </Badge>
                  )}
                  {filters.sortBy && (
                    <Badge
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-secondary/80"
                      onClick={() => handleSortChange('NONE')}
                    >
                      {t('pages.products.filters.badges.sort')} {SORT_OPTIONS.find(o => o.value === filters.sortBy)?.label}
                      <X className="w-3 h-3" />
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

ProductFilters.displayName = 'ProductFilters';

export default ProductFilters;
