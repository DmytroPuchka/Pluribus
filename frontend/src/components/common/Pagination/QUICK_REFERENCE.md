# Pagination Component - Quick Reference Guide

## Import
```tsx
import Pagination from '@/components/common/Pagination';
// or
import { Pagination } from '@/components/common/Pagination';
```

## Minimal Example
```tsx
<Pagination
  currentPage={1}
  totalPages={10}
  totalItems={100}
  itemsPerPage={10}
  onPageChange={(page) => setCurrentPage(page)}
/>
```

## Complete Example
```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
  onPageChange={setCurrentPage}
  onItemsPerPageChange={(items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  }}
  itemsPerPageOptions={[10, 20, 50, 100]}
  showItemsPerPageSelector={true}
  showTotalItems={true}
  maxPagesToShow={5}
  disabled={isLoading}
  className="mt-4"
/>
```

## Props Overview

| Prop | Type | Required | Default | Purpose |
|------|------|----------|---------|---------|
| `currentPage` | number | ✓ | - | Current active page (1-indexed) |
| `totalPages` | number | ✓ | - | Total number of pages |
| `totalItems` | number | ✓ | - | Total items across all pages |
| `itemsPerPage` | number | ✓ | - | Items displayed per page |
| `onPageChange` | function | ✓ | - | Callback: (page: number) => void |
| `onItemsPerPageChange` | function | - | undefined | Callback: (items: number) => void |
| `itemsPerPageOptions` | number[] | - | [10,20,50,100] | Options in dropdown |
| `showItemsPerPageSelector` | boolean | - | true | Show items per page selector |
| `showTotalItems` | boolean | - | true | Show "Showing X-Y of Z" text |
| `maxPagesToShow` | number | - | 5 | Max page buttons to display |
| `className` | string | - | undefined | Additional CSS classes |
| `disabled` | boolean | - | false | Disable all interactions |

## Common Scenarios

### Products Page
```tsx
import Pagination from '@/components/common/Pagination';

export function Products() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProducts(page, limit);
  }, [page, limit]);

  return (
    <>
      <ProductGrid products={products} />
      <Pagination
        currentPage={page}
        totalPages={Math.ceil(total / limit)}
        totalItems={total}
        itemsPerPage={limit}
        onPageChange={setPage}
        onItemsPerPageChange={(limit) => {
          setLimit(limit);
          setPage(1);
        }}
      />
    </>
  );
}
```

### Orders Page (Fixed Items)
```tsx
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalOrders}
  itemsPerPage={15}
  onPageChange={setCurrentPage}
  showItemsPerPageSelector={false}
/>
```

### With Loading State
```tsx
<Pagination
  // ... other props
  disabled={isLoading}
/>
```

### Mobile-Optimized
```tsx
<Pagination
  // ... other props
  maxPagesToShow={3}
/>
```

## Buttons Displayed

1. **First Page** - ChevronsLeft icon (⟨⟨)
2. **Previous** - ChevronLeft icon (⟨)
3. **Page Numbers** - With ellipsis (...) for large counts
4. **Next** - ChevronRight icon (⟩)
5. **Last Page** - ChevronsRight icon (⟩⟩)

## Display Formula

Start item = (currentPage - 1) × itemsPerPage + 1
End item = min(currentPage × itemsPerPage, totalItems)

Example: Page 2, 10 items per page, 25 total items
- Start: (2-1) × 10 + 1 = 11
- End: min(2 × 10, 25) = 20
- Display: "Showing 11-20 of 25"

## Page Number Algorithm

For currentPage=5, totalPages=20, maxPagesToShow=5:

**Case 1:** First few pages
```
[1] [2] [3] [4] [5] [...] [20]
```

**Case 2:** Middle pages
```
[1] [...] [4] [5] [6] [...] [20]
```

**Case 3:** Last few pages
```
[1] [...] [17] [18] [19] [20]
```

## Callbacks

### onPageChange
```tsx
onPageChange={(page) => {
  console.log(`Navigate to page ${page}`);
  setCurrentPage(page);
  // Optional: scroll to top
  window.scrollTo({ top: 0 });
}}
```

### onItemsPerPageChange
```tsx
onItemsPerPageChange={(itemsPerPage) => {
  console.log(`Show ${itemsPerPage} items per page`);
  setItemsPerPage(itemsPerPage);
  setCurrentPage(1); // Always reset to page 1!
}}
```

## Styling & Customization

### Default Styles
- Button variant: "outline" (except current page: "default")
- Button size: "icon-sm" for page numbers
- Icons: Lucide React (4x4 size)
- Spacing: gap-2 between pagination controls

### Custom Container Styles
```tsx
<Pagination
  // ... props
  className="bg-gray-50 p-4 rounded-lg dark:bg-slate-900"
/>
```

### Responsive
- Desktop: Flex row with 3-section layout
- Mobile: Flex column (stacked)
- Automatically adapts at `md` breakpoint

## Error Handling Patterns

### Handle API Errors
```tsx
<Pagination
  // ... props
  disabled={isLoading || isError}
/>
{error && <ErrorMessage message={error} />}
```

### Data Validation
```tsx
const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

<Pagination
  // ... props
  totalPages={totalPages}
/>
```

## URL Query Parameters (Optional)

Keep pagination in URL:
```tsx
const router = useRouter();
const { page = 1, limit = 10 } = router.query;

const handlePageChange = (page: number) => {
  router.push({ query: { page, limit } });
};
```

## Performance Tips

1. **Reset on filter**: `setCurrentPage(1)` when filters change
2. **Debounce API calls**: Wrap fetchData in useCallback/debounce
3. **Memoize handlers**: Use useCallback for callbacks
4. **Scroll to top**: On page change for better UX
5. **Show loading state**: Set `disabled={true}` while fetching

## Accessibility Features

- All buttons have `aria-label` attributes
- Current page has `aria-current="page"`
- Keyboard navigation fully supported
- Screen reader friendly
- High contrast colors
- Focus visible indicators

## Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

it('should render pagination', () => {
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

it('should call onPageChange', () => {
  const handleChange = jest.fn();
  render(
    <Pagination
      // ... props
      onPageChange={handleChange}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: /page 2/i }));
  expect(handleChange).toHaveBeenCalledWith(2);
});
```

## Common Issues & Solutions

### Issue: "onItemsPerPageChange not called"
**Solution**: Pass `onItemsPerPageChange` prop
```tsx
<Pagination
  // ... props
  onItemsPerPageChange={(items) => setItemsPerPage(items)}
/>
```

### Issue: "Items per page selector not visible"
**Solution**: Check `showItemsPerPageSelector` prop
```tsx
<Pagination
  // ... props
  showItemsPerPageSelector={true}  // default is true
/>
```

### Issue: "Pagination not updating on page change"
**Solution**: Ensure state is updating
```tsx
const [page, setPage] = useState(1);
<Pagination
  currentPage={page}
  onPageChange={setPage}  // Must update state
/>
```

### Issue: "Page resets to 1 on filter change"
**Solution**: This is by design - always reset on filter/sort
```tsx
const handleFilterChange = (filter) => {
  setFilter(filter);
  setCurrentPage(1);  // Reset pagination
};
```

## Files Reference

| File | Purpose |
|------|---------|
| `index.tsx` | Main component |
| `README.md` | Full documentation |
| `QUICK_REFERENCE.md` | This file |
| `IMPLEMENTATION_SUMMARY.md` | Implementation details |
| `usage.example.tsx` | 6 quick examples |
| `integration.examples.tsx` | 4 real-world patterns |
| `Pagination.test.tsx` | 42+ test cases |

## Support

For issues or questions:
1. Check README.md for detailed documentation
2. Review examples in usage.example.tsx
3. Check integration.examples.tsx for patterns
4. Review test cases for expected behavior

---

**Component Ready for Production Use** ✓
