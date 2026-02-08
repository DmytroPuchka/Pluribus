# Pagination Component

A reusable, accessible pagination component for displaying data across multiple pages. Designed for use across Products, Sellers, Orders, and other list pages.

## Features

- **Page Numbers** with intelligent ellipsis display for large page counts
- **Navigation Buttons** (First, Previous, Next, Last)
- **Current Page Highlight** with visual feedback
- **Items Per Page Selector** (10, 20, 50, 100 - customizable)
- **Total Items Display** showing "Showing X-Y of Z items"
- **Responsive Design** that adapts to mobile screens
- **Accessibility** with proper ARIA labels
- **Disabled State** for loading/error scenarios
- **TypeScript Support** with full type safety
- **Flexible Configuration** for different use cases

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | `number` | Required | The current active page (1-indexed) |
| `totalPages` | `number` | Required | Total number of pages |
| `totalItems` | `number` | Required | Total number of items across all pages |
| `itemsPerPage` | `number` | Required | Number of items displayed per page |
| `onPageChange` | `(page: number) => void` | Required | Callback when page changes |
| `onItemsPerPageChange` | `(itemsPerPage: number) => void` | Optional | Callback when items per page changes |
| `itemsPerPageOptions` | `number[]` | `[10, 20, 50, 100]` | Available items per page options |
| `showItemsPerPageSelector` | `boolean` | `true` | Whether to show items per page selector |
| `showTotalItems` | `boolean` | `true` | Whether to show total items display |
| `maxPagesToShow` | `number` | `5` | Maximum number of page buttons to display |
| `className` | `string` | Optional | Additional CSS classes for container |
| `disabled` | `boolean` | `false` | Whether to disable all interactions (loading state) |

## Basic Usage

```tsx
import { useState } from 'react';
import Pagination from '@/components/common/Pagination';

export function MyList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = 156;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Your list content */}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1); // Reset to first page
        }}
      />
    </div>
  );
}
```

## Advanced Usage

### Products List Example
```tsx
export function ProductsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const totalProducts = 156;

  useEffect(() => {
    // Fetch products for current page
    fetchProducts(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalProducts}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
```

### Sellers List with Custom Options
```tsx
export function SellersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={63}
      totalItems={1250}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={(newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
      }}
      itemsPerPageOptions={[20, 50, 100]} // Custom options
      maxPagesToShow={7} // Show more pages for sellers
    />
  );
}
```

### Orders List (No Per-Page Selector)
```tsx
export function OrdersList() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={23}
      totalItems={342}
      itemsPerPage={15}
      onPageChange={setCurrentPage}
      showItemsPerPageSelector={false} // Hide selector
      showTotalItems={true}
    />
  );
}
```

### Loading State
```tsx
export function ListWithLoading() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    try {
      await fetchData(page);
      setCurrentPage(page);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={10}
      totalItems={100}
      itemsPerPage={10}
      onPageChange={handlePageChange}
      disabled={isLoading} // Disable during loading
    />
  );
}
```

## Responsive Behavior

The component is responsive and adapts to different screen sizes:

- **Desktop (md+)**: Full layout with all elements in a row
  - Total items display on the left
  - Items per page selector in the middle
  - Pagination controls on the right

- **Mobile (< md)**: Stacked layout
  - Each section appears on separate lines for clarity
  - Fully functional with touch-friendly buttons

To adjust page display on mobile, reduce `maxPagesToShow`:

```tsx
<Pagination
  // ... other props
  maxPagesToShow={3} // Show fewer pages on smaller screens
/>
```

## Accessibility

The component includes:

- **ARIA Labels**: All buttons have descriptive `aria-label` attributes
- **Current Page Indicator**: Uses `aria-current="page"` on current page button
- **Keyboard Navigation**: Fully keyboard accessible
- **Screen Reader Support**: Clear, descriptive text for screen readers
- **Semantic HTML**: Proper button elements and form controls

## Styling

The component uses:

- **Tailwind CSS** for styling
- **Button Component** from `@/components/ui/button` for consistent styling
- **Lucide React Icons** for navigation arrows
- **Dark Mode Support** through Tailwind dark mode

### Custom Styling

Add custom classes using the `className` prop:

```tsx
<Pagination
  // ... props
  className="bg-gray-50 p-4 rounded-lg dark:bg-slate-900"
/>
```

## Page Number Algorithm

The component intelligently displays page numbers with ellipsis:

### Small Number of Pages
If `totalPages ≤ maxPagesToShow`:
```
[1] [2] [3] [4] [5]
```

### Large Number of Pages
If `totalPages > maxPagesToShow`:
```
[1] [...] [4] [5] [6] [...] [100]
```

The algorithm ensures:
- First page is always visible
- Last page is always visible
- Current page is always visible in the center
- Ellipsis appears when there are gaps

## Integration with APIs

```tsx
export function ApiIntegratedList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `/api/items?page=${currentPage}&limit=${itemsPerPage}`
      );
      const result = await response.json();
      setData(result);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage, itemsPerPage]);

  if (!data) return null;

  return (
    <div className="space-y-4">
      {/* Display data */}

      <Pagination
        currentPage={currentPage}
        totalPages={data.totalPages}
        totalItems={data.total}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
        disabled={isLoading}
      />
    </div>
  );
}
```

## Best Practices

1. **Reset to First Page**: When changing items per page, reset to page 1
   ```tsx
   setItemsPerPage(newValue);
   setCurrentPage(1);
   ```

2. **Handle API Errors**: Show error state appropriately
   ```tsx
   disabled={isLoading || isError}
   ```

3. **Preserve Scroll Position**: Scroll to top when page changes
   ```tsx
   onPageChange={(page) => {
     window.scrollTo({ top: 0, behavior: 'smooth' });
     setCurrentPage(page);
   }}
   ```

4. **URL Query Parameters**: Use URL params for shareable pagination state
   ```tsx
   const router = useRouter();
   const [currentPage] = useState(
     parseInt(router.query.page as string) || 1
   );

   const handlePageChange = (page: number) => {
     router.push({ query: { page } });
   };
   ```

## Performance Considerations

- Uses `useMemo` to prevent unnecessary page number recalculations
- Efficient re-renders only when relevant props change
- No external API calls within the component

## Testing

Example test cases:

```tsx
describe('Pagination', () => {
  it('renders correct page numbers', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        totalItems={100}
        itemsPerPage={10}
        onPageChange={jest.fn()}
      />
    );
    expect(screen.getByRole('button', { name: /page 1/i })).toBeInTheDocument();
  });

  it('calls onPageChange when clicking a page button', () => {
    const handlePageChange = jest.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        totalItems={100}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /page 2/i }));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it('disables buttons when disabled prop is true', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        totalItems={100}
        itemsPerPage={10}
        onPageChange={jest.fn()}
        disabled={true}
      />
    );
    expect(screen.getByLabelText(/go to next page/i)).toBeDisabled();
  });
});
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Part of the Pluribus project.
