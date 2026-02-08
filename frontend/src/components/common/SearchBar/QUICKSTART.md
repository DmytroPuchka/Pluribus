# SearchBar Component - Quick Start Guide

## Installation

The component is already created and ready to use. No additional installation needed.

## Import

```tsx
import { SearchBar } from '@/components/common/SearchBar';
// or
import SearchBar from '@/components/common/SearchBar';
```

## Minimal Example

```tsx
'use client';

import { SearchBar } from '@/components/common/SearchBar';

export function MyComponent() {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Your search logic here
  };

  return (
    <SearchBar
      placeholder="Search..."
      onSearch={handleSearch}
    />
  );
}
```

## Complete Example (Recommended)

```tsx
'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/common/SearchBar';

export function ProductSearch() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([
    'iPhone 15 Pro',
    'Samsung Galaxy S24',
    'MacBook Pro',
  ]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Call your API
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      console.log('Results:', data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchBar
      placeholder="Search products..."
      onSearch={handleSearch}
      loading={loading}
      suggestions={suggestions}
      debounceDelay={300}
      maxSuggestions={5}
    />
  );
}
```

## Common Props to Use

| Prop | Purpose | Example |
|------|---------|---------|
| `placeholder` | Input hint text | `"Search products..."` |
| `onSearch` | Search callback | `(q) => handleSearch(q)` |
| `loading` | Show spinner | `loading && <Spinner>` |
| `suggestions` | Dropdown items | `['Apple', 'Samsung']` |
| `className` | Wrapper styling | `"max-w-md"` |
| `debounceDelay` | Search delay (ms) | `400` |

## In Header

```tsx
export function Header() {
  return (
    <header className="p-4 border-b">
      <SearchBar
        placeholder="Search sellers, products..."
        onSearch={(q) => window.location.href = `/search?q=${q}`}
        className="max-w-xs"
      />
    </header>
  );
}
```

## In Products Page

```tsx
export function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    // Filter products
    const filtered = allProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <SearchBar
        placeholder="Filter products..."
        onSearch={handleSearch}
      />
      <div className="grid gap-4">
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
```

## With Dynamic Suggestions

```tsx
export function DynamicSearch() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Fetch suggestions
      const res = await fetch(`/api/suggestions?q=${query}`);
      const data = await res.json();
      setSuggestions(data.suggestions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchBar
      placeholder="Search..."
      onSearch={handleSearch}
      loading={loading}
      suggestions={suggestions}
    />
  );
}
```

## Customization

### Width
```tsx
<SearchBar className="max-w-sm" ... />     {/* Small */}
<SearchBar className="max-w-md" ... />     {/* Medium */}
<SearchBar className="max-w-lg" ... />     {/* Large */}
<SearchBar className="w-full" ... />       {/* Full width */}
```

### Response Speed
```tsx
<SearchBar debounceDelay={200} ... />      {/* Fast - 200ms */}
<SearchBar debounceDelay={300} ... />      {/* Normal - 300ms */}
<SearchBar debounceDelay={500} ... />      {/* Slow - 500ms */}
```

### Features
```tsx
{/* With button */}
<SearchBar showSearchButton={true} ... />

{/* Without button */}
<SearchBar showSearchButton={false} ... />

{/* With 10 suggestions */}
<SearchBar maxSuggestions={10} ... />

{/* With 3 suggestions */}
<SearchBar maxSuggestions={3} ... />
```

## Keyboard Shortcuts

- **Enter** - Perform search
- **Escape** - Close suggestions

## API Integration Example

```tsx
'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/common/SearchBar';

export function APISearch() {
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      const results = await response.json();
      console.log('Results:', results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchBar
      placeholder="Search marketplace..."
      onSearch={handleSearch}
      loading={loading}
    />
  );
}
```

## Component Features Checklist

- ✅ Search input with icon
- ✅ Clear button (X) when text entered
- ✅ Search button or Enter to search
- ✅ Search suggestions dropdown
- ✅ Debounced search (300ms default)
- ✅ Loading indicator when searching
- ✅ Customizable placeholder text
- ✅ Keyboard navigation (Enter, Escape)
- ✅ Click outside detection
- ✅ Full accessibility (ARIA)
- ✅ Mobile responsive
- ✅ Dark mode support
- ✅ TypeScript support

## Files Reference

| File | Purpose | Lines |
|------|---------|-------|
| `index.tsx` | Main component | 285 |
| `types.ts` | TypeScript types | 76 |
| `SearchBar.example.tsx` | Usage examples | 163 |
| `SearchBar.integration.tsx` | Real integrations | 461 |
| `__tests__/SearchBar.test.tsx` | Unit tests | 398 |
| `README.md` | Full documentation | 301 |
| `QUICKSTART.md` | This guide | - |

## Troubleshooting

### Search not triggering
- Check that `onSearch` prop is provided
- Verify callback is called with correct query
- Check browser console for errors

### Suggestions not showing
- Ensure `suggestions` array is not empty
- Check that text input matches suggestion text (case-sensitive)
- Verify `maxSuggestions` is greater than 0

### Loading spinner not showing
- Pass `loading={true}` prop
- Verify spinner icon is visible in component

### TypeScript errors
- Import types: `import type { SearchBarProps } from '@/components/common/SearchBar'`
- Check prop types match interface

## Next Steps

1. Review the main component: `index.tsx`
2. Check examples: `SearchBar.example.tsx`
3. See integrations: `SearchBar.integration.tsx`
4. Read full docs: `README.md`
5. Run tests: `npm test SearchBar.test.tsx`

## Support

For more details, see:
- Full documentation: `README.md`
- Implementation details: `IMPLEMENTATION_SUMMARY.md`
- Integration examples: `SearchBar.integration.tsx`
- Usage examples: `SearchBar.example.tsx`
- Test suite: `__tests__/SearchBar.test.tsx`

---

**Component Location:**
```
/frontend/src/components/common/SearchBar/
```

**Ready to use!** Import and integrate it into your components.
