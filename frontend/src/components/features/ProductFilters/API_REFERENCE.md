# ProductFilters - API Reference

## Component Export

```typescript
export const ProductFilters: FC<ProductFiltersProps>
```

## Props Interface

```typescript
interface ProductFiltersProps {
  /**
   * Array of all available products for filtering
   * These products are used to extract filter options (categories, countries, price range)
   * and determine the initial filtered results
   */
  products: Product[];

  /**
   * Callback function triggered whenever filters change
   * Called with:
   * 1. filteredProducts: Array of products after applying all filters and sorting
   * 2. filters: Current filter state object
   *
   * Use this to update parent component's filtered products display
   */
  onFiltersChange: (
    filteredProducts: Product[],
    filters: ProductFiltersState
  ) => void;

  /**
   * Optional CSS class name for custom styling
   * Applied to the root Card component
   */
  className?: string;
}
```

## Filter State Interface

```typescript
export interface ProductFiltersState {
  /**
   * Selected product category
   * One of: ELECTRONICS, CLOTHING, FOOD, BEAUTY, BOOKS, TOYS, SPORTS, HOME, OTHER
   * Undefined means all categories
   */
  category?: ProductCategory;

  /**
   * Minimum price filter
   * Products with price >= minPrice are included
   * Undefined means no minimum constraint
   */
  minPrice?: number;

  /**
   * Maximum price filter
   * Products with price <= maxPrice are included
   * Undefined means no maximum constraint
   */
  maxPrice?: number;

  /**
   * Minimum seller rating filter
   * Products with seller rating >= minRating are included
   * Range: 0-5
   * Undefined or 0 means all ratings accepted
   */
  minRating?: number;

  /**
   * Seller country filter
   * Only products from sellers in this country are included
   * Undefined means all countries
   */
  country?: string;

  /**
   * Sort order for results
   * - 'newest': Sort by product creation date (newest first)
   * - 'price-low-high': Sort by price ascending
   * - 'price-high-low': Sort by price descending
   * - 'rating': Sort by seller rating descending
   * Undefined means no specific sort order
   */
  sortBy?: 'newest' | 'price-low-high' | 'price-high-low' | 'rating';
}
```

## Exported Types

```typescript
// Available product categories
type ProductCategory =
  | 'ELECTRONICS'
  | 'CLOTHING'
  | 'FOOD'
  | 'BEAUTY'
  | 'BOOKS'
  | 'TOYS'
  | 'SPORTS'
  | 'HOME'
  | 'OTHER';
```

## Filter Behavior

### Category Filter

**Input**: Select component with all product categories

**Behavior**:
- Default: "All Categories"
- Only one category can be selected at a time
- Filters products: `product.category === selectedCategory`

**Options**:
- All Categories (undefined)
- ELECTRONICS
- CLOTHING
- FOOD
- BEAUTY
- BOOKS
- TOYS
- SPORTS
- HOME
- OTHER

### Price Range Filter

**Input**: Two numeric inputs (Min and Max)

**Behavior**:
- Default: Empty (no constraint)
- Both min and max are optional
- Can be used independently
- Filters products: `product.price >= minPrice && product.price <= maxPrice`

**Placeholders**: Shows actual min/max prices from product data

**Validation**:
- Accepts decimal numbers
- No validation on min <= max (user's responsibility)

### Seller Rating Filter

**Input**: Select component with preset rating levels

**Behavior**:
- Default: "All Ratings"
- Only one rating level can be selected
- Filters by seller's rating, not product rating
- Filters products: `product.seller.rating >= selectedRating`

**Options**:
- All Ratings (undefined / 0)
- 3+ Stars (3)
- 4+ Stars (4)
- 4.5+ Stars (4.5)
- 5 Stars (5)

### Country Filter

**Input**: Select component with countries extracted from products

**Behavior**:
- Default: "All Countries"
- Only one country can be selected
- Dynamically populated from products' seller locations
- Countries are sorted alphabetically
- Filters products: `product.seller.country === selectedCountry`

**Availability**: Only visible if products have seller data with countries

### Sort Filter

**Input**: Select component with predefined sort options

**Behavior**:
- Default: "None" (no sorting)
- Only one sort option can be applied at a time
- Applied after all filters

**Options**:
- None (undefined)
- Newest (sort by `createdAt` desc)
- Price: Low to High (sort by `price` asc)
- Price: High to Low (sort by `price` desc)
- Rating: High to Low (sort by `seller.rating` desc)

## Active Filters Display

The component automatically displays active filters as removable badges:

### Badge Format

```
[Filter Name]: [Value] [X]
```

### Examples

```
Electronics [X]
Min: $50 [X]
Max: $500 [X]
4+ Stars [X]
United States [X]
Sort: Price: Low to High [X]
```

### Interaction

- Click badge to remove individual filter
- Click "Clear All" button to remove all filters at once
- "Clear All" button appears next to "Active Filters" label

## State Update Flow

```
User Action (select category, enter price, etc.)
    ↓
handleFilterChange() called
    ↓
applyFilters() calculates filtered products
    ↓
setFilters() updates local state
    ↓
onFiltersChange() callback triggered with results
    ↓
Parent component receives filtered products
    ↓
UI updates with new results
```

## API: Filter Application Algorithm

```typescript
function applyFilters(
  products: Product[],
  filters: ProductFiltersState
): Product[]
```

**Steps**:
1. Start with full products array
2. Apply category filter (if set)
3. Apply minimum price filter (if set)
4. Apply maximum price filter (if set)
5. Apply minimum rating filter (if set)
6. Apply country filter (if set)
7. Sort results (if sortBy is set)
8. Return filtered array

**Time Complexity**: O(n log n) in worst case (when sorting)

**Space Complexity**: O(n) for filtered array

## Callback Signatures

### onFiltersChange Callback

```typescript
type OnFiltersChangeCallback = (
  filteredProducts: Product[],
  filters: ProductFiltersState
) => void;
```

**Called When**:
- Any filter value changes
- Clear All button is clicked
- Individual filter badge is removed

**Parameters**:
- `filteredProducts`: Array of products after all filters and sorting
- `filters`: Current filter state object

**Example Usage**:
```typescript
const handleFiltersChange = (filtered, filters) => {
  console.log(`Filtered to ${filtered.length} products`);
  console.log('Active filters:', filters);
  setDisplayedProducts(filtered);
};

<ProductFilters
  products={allProducts}
  onFiltersChange={handleFiltersChange}
/>
```

## Hook Dependencies

The component uses the following React hooks:

### useState
```typescript
const [filters, setFilters] = useState<ProductFiltersState>({});
const [isExpanded, setIsExpanded] = useState(true);
```

### useMemo
```typescript
const countries = useMemo(() => getCountriesFromProducts(products), [products]);
const priceRange = useMemo(() => calculatePriceRange(products), [products]);
```

### useCallback
```typescript
const handleFilterChange = useCallback(
  (newFilters) => { /* ... */ },
  [products, onFiltersChange]
);
```

## Utility Functions

### getCountriesFromProducts

```typescript
function getCountriesFromProducts(products: Product[]): string[]
```

**Purpose**: Extract unique seller countries from products

**Returns**: Sorted array of unique country strings

**Usage**: Internal - used to populate country dropdown

### calculatePriceRange

```typescript
function calculatePriceRange(products: Product[]) {
  return { min: number, max: number };
}
```

**Purpose**: Find min and max prices from product array

**Returns**: Object with min and max price values

**Usage**: Internal - displays price range in inputs

## Error Handling

The component gracefully handles:

- Empty products array (displays all filters as disabled)
- Undefined seller data (handles gracefully, skips country filter)
- Missing product fields (filters work with available data)
- Invalid date formats (falls back to product creation order)

## Performance Characteristics

### Initial Render
- Time: O(n) where n = products count
- Space: O(n)

### Filter Application
- Time: O(n log n) worst case (sorting), O(n) average
- Space: O(n) for filtered array

### Re-render Triggers
- Category selection
- Price input change
- Rating selection
- Country selection
- Sort selection
- Clear filters
- Badge removal

## Browser Support

Requires:
- ES6+ JavaScript support
- React 16.8+ (for hooks)
- CSS Grid support (for responsive layout)

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- Semantic HTML labels
- Proper label-input associations
- Keyboard navigation
- ARIA attributes from Radix UI components
- Focus visible states

## Component Lifecycle

```
Mount
  ↓
Initialize with empty filters
  ↓
Render all filter inputs
  ↓
User interacts
  ↓
Filter state updates
  ↓
onFiltersChange callback fires
  ↓
Re-render if needed
  ↓
Unmount (cleanup)
```

## Common Patterns

### Get Current Filter Values
```typescript
const [currentFilters, setCurrentFilters] = useState<ProductFiltersState>({});

<ProductFilters
  products={products}
  onFiltersChange={(filtered, filters) => {
    setCurrentFilters(filters);
  }}
/>
```

### Reset Filters
```typescript
const handleReset = () => {
  setCurrentFilters({});
  setFilteredProducts(allProducts);
};
```

### Save Filter Preferences
```typescript
const handleFiltersChange = (filtered, filters) => {
  localStorage.setItem('lastFilters', JSON.stringify(filters));
};
```

### Share Filters
```typescript
const shareableUrl = `/products?${new URLSearchParams(
  Object.fromEntries(
    Object.entries(filters).map(([k, v]) => [k, String(v)])
  )
).toString()}`;
```

## Limitations

1. **Single select only** - Cannot combine multiple categories or countries
2. **No filter suggestions** - Doesn't suggest related filters
3. **No price validation** - Doesn't validate min <= max
4. **No debouncing** - Recalculates on every change
5. **No pagination** - All filtered results returned at once
6. **Client-side only** - All filtering happens in browser

## Future API Enhancements

Potential additions for future versions:

```typescript
interface ProductFiltersProps {
  // Pre-selected filters
  defaultFilters?: ProductFiltersState;

  // Disabled filters
  disabledFilters?: (keyof ProductFiltersState)[];

  // Custom sort options
  customSortOptions?: SortOption[];

  // Filter change debounce delay
  debounceMs?: number;

  // Multi-select support
  allowMultiSelect?: boolean;

  // URL state persistence
  persistToUrl?: boolean;

  // Minimum results threshold
  minResultsThreshold?: number;
}
```
