# Dashboard Products Page

## Overview

The Dashboard Products page is a comprehensive product management interface for sellers in the Pluribus application. It allows sellers to manage their inventory, view product status, and perform actions like editing and deleting products.

## Location

`/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/frontend/src/app/dashboard/products/`

## File Structure

```
/dashboard/products/
├── page.tsx           # Main products management page
└── README.md          # This file
```

## Features

### 1. Product Management
- **Add New Product Button**: Prominent button to create new products
- **Product Grid**: Responsive grid displaying all seller's products
- **Product Cards**: Each card shows:
  - Product image with fallback icon
  - Title and category badge
  - Price with currency display
  - Stock status indicators (In Stock, Low Stock, Out of Stock)
  - Product tags (up to 2 visible with "+X more")
  - Edit and Delete action buttons
  - Active/Inactive status badge

### 2. Filtering System
- **Category Filter**: Filter products by category (ELECTRONICS, CLOTHING, FOOD, BEAUTY, BOOKS, TOYS, SPORTS, HOME, OTHER)
- **Status Filter**: Filter by product status (Active, Inactive)
- **Clear Filters Button**: Quick reset of all applied filters
- Real-time filtering with memoized results

### 3. Statistics Dashboard
Four stat cards displaying:
- Total Products count
- Active Products count (in green)
- Out of Stock count (in red)
- Low Stock count (in orange)

### 4. Alerts
- **Low Stock Alert**: Prominent alert card appears when products have stock < 10
- Alert includes icon and actionable message to prompt restocking

### 5. Empty States
- **No Products State**: When seller has no products, displays helpful message with CTA to add first product
- **No Results State**: When filters return no results, displays different message suggesting filter adjustment
- Both states include icons and call-to-action buttons

## Component Structure

### Main Components

#### `DashboardProductCard`
Dashboard-specific product card component with:
- Edit action button
- Delete dropdown menu
- Stock status indicators with color-coded badges
- Active/Inactive status display
- Responsive image handling

#### `FilterControls`
Reusable filter component with:
- Category dropdown menu
- Status dropdown menu
- Selected filter badges
- Clear filters button

#### `EmptyState`
Displays when no products exist, with:
- Icon container
- Descriptive text
- "Add Your First Product" CTA

### Hooks & State Management
- `useState`: Manages filter selections (category, status)
- `useMemo`: Optimizes filtered product calculations

## Mock Data

The page includes 6 mock products demonstrating various states:
1. **Professional Wireless Headphones** (ELECTRONICS) - In Stock (15 units)
2. **Premium Cotton T-Shirt** (CLOTHING) - In Stock (45 units)
3. **Organic Skincare Set** (BEAUTY) - Out of Stock (0 units)
4. **Stainless Steel Water Bottle** (HOME) - Low Stock (8 units)
5. **Adventure Fantasy Novel** (BOOKS) - Inactive, In Stock (32 units)
6. **Yoga Mat Premium** (SPORTS) - In Stock (20 units)

## UI Components Used

### From `@/components/ui`
- **Card**: Container for stat cards and product cards
- **Button**: For actions like "Add New Product", Edit, Delete
- **Badge**: For category, status, and tag display
- **DropdownMenu**: For filtering and action menus
  - DropdownMenuTrigger
  - DropdownMenuContent
  - DropdownMenuItem

### From `@/components/common`
- **PriceDisplay**: Formats and displays product prices with currency

### From External Libraries
- **lucide-react**: Icons (Plus, Edit, Trash2, AlertCircle, Package, ChevronDown)
- **next/image**: Optimized image component
- **next/link**: Navigation component

## Styling

- Responsive grid layout (1 column on mobile, 2 on tablet, 3-4 on desktop)
- Tailwind CSS utility classes for styling
- Color-coded status indicators:
  - Green for Active/In Stock
  - Red for Out of Stock
  - Orange for Low Stock
- Hover effects on product cards
- Smooth transitions and animations

## Responsive Design

- **Mobile** (< 640px): 1 column grid, stacked layout
- **Tablet** (640px - 1024px): 2 column grid
- **Desktop** (1024px - 1280px): 3 column grid
- **Large Desktop** (> 1280px): 4 column grid

## Stock Status Logic

Products are categorized by stock level:
- **Out of Stock**: stockQuantity === 0 (red badge, overlay on image)
- **Low Stock**: 0 < stockQuantity < 10 (orange badge)
- **In Stock**: stockQuantity >= 10 (green badge)
- **Unknown**: stockQuantity is undefined (gray badge)

## Placeholder Functions

The following functions are placeholders and require implementation:

### `handleEdit(product: Product)`
Currently logs to console. Should navigate to:
```
/dashboard/products/{product.id}/edit
```

### `handleDelete(productId: string)`
Currently logs to console. Should:
1. Show confirmation dialog
2. Call API to delete product
3. Update UI state
4. Show success/error notification

## Future Enhancements

1. **Real Data Integration**
   - Replace mock data with API calls
   - Implement pagination for large product lists
   - Add loading states for async operations

2. **Product Management**
   - Implement product creation flow
   - Implement product edit flow
   - Implement product deletion with confirmation

3. **Advanced Features**
   - Search functionality
   - Sorting options (by price, date, popularity)
   - Bulk actions (select multiple, bulk edit status)
   - Duplicate product functionality
   - Export/import products

4. **Analytics**
   - Sales statistics
   - Popular products section
   - Revenue tracking

5. **Notifications**
   - Toast notifications for actions
   - Real-time inventory updates
   - Low stock alerts

## Navigation

- **Add New Product**: Links to `/dashboard/products/new`
- **Edit Product**: Links to `/dashboard/products/{id}/edit` (to be implemented)
- **Product Details**: Cards link to `/products/{id}` (existing)

## API Integration Points

When implementing real API:

1. **Fetch Seller's Products**
   ```typescript
   GET /api/products?sellerId={sellerId}
   ```

2. **Create Product**
   ```typescript
   POST /api/products
   ```

3. **Update Product**
   ```typescript
   PUT /api/products/{id}
   ```

4. **Delete Product**
   ```typescript
   DELETE /api/products/{id}
   ```

5. **Get Product Categories**
   ```typescript
   GET /api/categories
   ```

## Types

All types are imported from `@/types`:
- `Product`: Main product interface
- `ProductCategory`: Union type for product categories
- `User`: Seller information (nested in Product)

## Key Decisions

1. **Client Component**: Used `'use client'` directive for interactivity (filters, actions)
2. **Memoization**: Used `useMemo` to optimize filter calculations
3. **Component Extraction**: Separated concerns into smaller, reusable components
4. **Mock Data**: Comprehensive mock data demonstrates various product states
5. **Responsive Design**: Mobile-first approach with progressive enhancement
6. **Accessibility**: Semantic HTML and proper ARIA labels where needed

## Testing Recommendations

1. Test filter combinations
2. Test empty states
3. Test responsive layouts on various breakpoints
4. Test image loading with missing images
5. Test action button clicks and navigation
6. Test with large number of products (pagination needed)
