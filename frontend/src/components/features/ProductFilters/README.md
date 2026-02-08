# ProductFilters Component

A comprehensive filtering component for browsing and filtering products with multiple filter options and sorting capabilities.

## Features

- **Category Filter**: Dropdown selector with all available product categories
- **Price Range Filter**: Min/max numeric inputs for filtering by price
- **Seller Rating Filter**: Minimum rating selector (All, 3+, 4+, 4.5+, 5 stars)
- **Country Filter**: Seller location filter dynamically populated from product data
- **Sort Options**: Multiple sorting strategies:
  - Newest (by creation date)
  - Price: Low to High
  - Price: High to Low
  - Rating: High to Low
- **Active Filters Display**: Visual badges showing all applied filters
- **Clear Filters**: Quick clear all button and individual filter removal
- **Expandable Interface**: Collapsible filter panel to save screen space
- **Client Component**: Uses React hooks for state management

## Usage

### Basic Implementation

```tsx
'use client';

import { ProductFilters } from '@/components/features/ProductFilters';
import { Product } from '@/types';

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleFiltersChange = (filtered: Product[], filters: ProductFiltersState) => {
    setFilteredProducts(filtered);
  };

  return (
    <ProductFilters
      products={products}
      onFiltersChange={handleFiltersChange}
    />
  );
}
```

### Advanced Integration with Layout

```tsx
<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
  {/* Filters Sidebar */}
  <div className="lg:col-span-1">
    <ProductFilters
      products={allProducts}
      onFiltersChange={handleFiltersChange}
    />
  </div>

  {/* Products Grid */}
  <div className="lg:col-span-3">
    <ProductGrid products={filteredProducts} />
  </div>
</div>
```

## Props

### ProductFiltersProps

```typescript
interface ProductFiltersProps {
  // Array of all available products for filtering
  products: Product[];

  // Callback function called whenever filters change
  // Returns filtered products array and current filter state
  onFiltersChange: (
    filteredProducts: Product[],
    filters: ProductFiltersState
  ) => void;

  // Optional CSS class name for custom styling
  className?: string;
}
```

## Filter State

```typescript
export interface ProductFiltersState {
  category?: ProductCategory;        // Selected category
  minPrice?: number;                 // Minimum price filter
  maxPrice?: number;                 // Maximum price filter
  minRating?: number;                // Minimum seller rating (0-5)
  country?: string;                  // Seller country
  sortBy?: 'newest' | 'price-low-high' | 'price-high-low' | 'rating';
}
```

## Categories

The component supports all product categories defined in the types:

- ELECTRONICS
- CLOTHING
- FOOD
- BEAUTY
- BOOKS
- TOYS
- SPORTS
- HOME
- OTHER

## Filtering Logic

### Category Filter
Filters products to only show items in the selected category.

### Price Range Filter
Filters products where:
- Price >= minPrice (if set)
- Price <= maxPrice (if set)

### Seller Rating Filter
Filters products where seller rating is >= minRating

### Country Filter
Filters products by seller's country location

### Sorting

**Newest**: Sorts products by creation date (descending)
```typescript
new Date(b.createdAt) - new Date(a.createdAt)
```

**Price Low to High**: Sorts by price ascending
```typescript
a.price - b.price
```

**Price High to Low**: Sorts by price descending
```typescript
b.price - a.price
```

**Rating**: Sorts by seller rating descending
```typescript
b.seller.rating - a.seller.rating
```

## UI Components Used

- **Card, CardHeader, CardTitle, CardDescription, CardContent**: Layout and structure
- **Button**: Action buttons (clear filters, expand/collapse)
- **Badge**: Display active filters as removable chips
- **Input**: Numeric input for price range
- **Label**: Form labels for accessibility
- **Select, SelectTrigger, SelectContent, SelectItem**: Dropdown selectors
- **Icons**: Sliders icon for filter header, X icon for removing filters

## State Management

The component uses React hooks for state management:

```typescript
const [filters, setFilters] = useState<ProductFiltersState>({});
const [isExpanded, setIsExpanded] = useState(true);
```

All state updates trigger the `onFiltersChange` callback, allowing parent components to react to filter changes.

## Active Filters Display

When any filter is applied, the component displays:

1. A counter showing number of active filters
2. Visual badges for each active filter
3. Individual X buttons to remove each filter
4. "Clear All" button to reset all filters

Example badge displays:
- Category: "Electronics"
- Price: "Min: $50", "Max: $500"
- Rating: "4+ Stars"
- Country: "United States"
- Sort: "Sort: Price: Low to High"

## Performance Optimization

The component uses:
- `useMemo` to memoize expensive computations (price range, countries list)
- `useCallback` for filter change handler to prevent unnecessary re-renders
- Lazy country extraction only when products change

## Responsive Design

- **Mobile**: Single column layout with collapsible filters
- **Tablet/Desktop**: Sidebar layout with full filter visibility
- **Expandable**: Filters can be collapsed to save space on small screens

## Accessibility

- Proper `Label` components for all form inputs
- `htmlFor` attributes linking labels to inputs
- Semantic HTML structure
- Clear button variants and states
- Readable text contrast with badges

## Styling

The component uses:
- Tailwind CSS utility classes
- CVA (class-variance-authority) for component variants
- Consistent spacing and typography
- Smooth transitions for interactive elements

## Example: Products Page Integration

See `/src/app/products/page.tsx` for a complete example of how to integrate the ProductFilters component in a real page with:
- Mock product data
- Filter state management
- Results counter
- Product grid display
- Responsive layout

## Related Components

- `ProductCard`: Individual product display
- `ProductGrid`: Grid layout for multiple products
- `Product`: Type definition for product objects
