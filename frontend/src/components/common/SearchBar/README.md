# SearchBar Component

A feature-rich, reusable search bar component for global search across the Pluribus application. It includes debounced search, suggestions dropdown, loading state, and clear functionality.

## Features

- **Debounced Search**: Prevents excessive search calls while typing (configurable delay)
- **Search Suggestions Dropdown**: Display filtered suggestions as users type
- **Clear Button**: Quick clear functionality with X button
- **Loading Indicator**: Animated spinner during search operations
- **Search Button**: Optional search button to trigger search on click
- **Keyboard Navigation**: Support for Enter key to search and Escape to close dropdown
- **Accessibility**: Full ARIA support for screen readers
- **Click Outside Detection**: Automatically closes suggestions dropdown
- **Customizable**: Placeholder, debounce delay, max suggestions, and more

## Installation

The component is already available in the project. It uses existing UI components (Input, Button) and lucide-react icons.

## Usage

### Basic Example

```tsx
import { SearchBar } from '@/components/common/SearchBar';

export function MyComponent() {
  const handleSearch = (query: string) => {
    console.log('Search:', query);
    // Your search logic here
  };

  return (
    <SearchBar
      placeholder="Search products..."
      onSearch={handleSearch}
    />
  );
}
```

### With Loading State

```tsx
import { useState } from 'react';
import { SearchBar } from '@/components/common/SearchBar';

export function SearchWithLoading() {
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Your search API call
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      console.log('Results:', data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchBar
      placeholder="Search..."
      onSearch={handleSearch}
      loading={loading}
    />
  );
}
```

### With Suggestions

```tsx
import { SearchBar } from '@/components/common/SearchBar';

export function SearchWithSuggestions() {
  const suggestions = [
    'iPhone 15 Pro',
    'Samsung Galaxy S24',
    'Google Pixel 8',
    'MacBook Pro',
    'iPad Air',
  ];

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    console.log('Selected:', suggestion);
  };

  return (
    <SearchBar
      placeholder="Search products..."
      onSearch={handleSearch}
      suggestions={suggestions}
      onSuggestionSelect={handleSuggestionSelect}
      maxSuggestions={5}
    />
  );
}
```

### In Header Component

```tsx
import { SearchBar } from '@/components/common/SearchBar';

export function Header() {
  const handleSearch = (query: string) => {
    // Navigate to search results page
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <header className="flex items-center justify-between p-4">
      <h1>Pluribus</h1>
      <SearchBar
        placeholder="Search sellers, products..."
        onSearch={handleSearch}
        className="max-w-xs"
      />
      <nav>{/* navigation items */}</nav>
    </header>
  );
}
```

### Advanced Example with Dynamic Suggestions

```tsx
import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/common/SearchBar';

export function AdvancedSearch() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Fetch suggestions from API
      const response = await fetch(`/api/suggestions?q=${query}`);
      const data = await response.json();
      setSuggestions(data.suggestions);

      // Perform actual search
      await fetch(`/api/search?q=${query}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchBar
      placeholder="What are you looking for?"
      onSearch={handleSearch}
      loading={loading}
      suggestions={suggestions}
      debounceDelay={400}
      maxSuggestions={8}
      className="max-w-lg"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Search...'` | Placeholder text for the search input |
| `onSearch` | `(query: string) => void` | **Required** | Callback function triggered when search is performed |
| `loading` | `boolean` | `false` | Whether the search is in loading state |
| `suggestions` | `string[]` | `[]` | Array of suggestions to display in dropdown |
| `className` | `string` | `undefined` | Custom class name for the wrapper |
| `debounceDelay` | `number` | `300` | Debounce delay in milliseconds |
| `onSuggestionSelect` | `(suggestion: string) => void` | `undefined` | Callback when a suggestion is selected |
| `showSearchButton` | `boolean` | `true` | Whether to show the search button |
| `maxSuggestions` | `number` | `5` | Maximum number of suggestions to display |

## Keyboard Shortcuts

- **Enter**: Trigger search
- **Escape**: Close suggestions dropdown

## Styling & Customization

The component uses Tailwind CSS and inherits styles from the existing UI system. You can customize it by:

1. **Size**: Use the `className` prop to adjust width:
   ```tsx
   <SearchBar className="max-w-sm" ... />
   <SearchBar className="max-w-md" ... />
   <SearchBar className="max-w-lg" ... />
   ```

2. **Placeholder**: Customize the placeholder text:
   ```tsx
   <SearchBar placeholder="Find products, sellers..." ... />
   ```

3. **Debounce Delay**: Adjust responsiveness:
   ```tsx
   <SearchBar debounceDelay={200} ... /> {/* More responsive */}
   <SearchBar debounceDelay={500} ... /> {/* Less responsive */}
   ```

## Use Cases

### 1. Header Global Search
Place in the main header for site-wide search functionality:
```tsx
<Header>
  <SearchBar
    placeholder="Search sellers, products..."
    onSearch={(query) => navigate(`/search?q=${query}`)}
  />
</Header>
```

### 2. Products Page Search
Filter products on a dedicated page:
```tsx
<ProductsPage>
  <SearchBar
    placeholder="Search products..."
    onSearch={(query) => setProductFilter(query)}
    suggestions={popularProducts}
  />
</ProductsPage>
```

### 3. Sellers Page Search
Search for sellers:
```tsx
<SellersPage>
  <SearchBar
    placeholder="Find sellers..."
    onSearch={(query) => setSellersFilter(query)}
    suggestions={topSellers}
  />
</SellersPage>
```

### 4. Marketplace Search
Advanced search with suggestions and autocomplete:
```tsx
<Marketplace>
  <SearchBar
    placeholder="What are you looking for?"
    onSearch={handleMarketplaceSearch}
    loading={isSearching}
    suggestions={dynamicSuggestions}
    debounceDelay={400}
    maxSuggestions={10}
  />
</Marketplace>
```

## Accessibility

The component includes full accessibility features:

- Semantic HTML with proper ARIA roles
- `role="combobox"` for search input
- `aria-expanded` to indicate dropdown state
- `aria-controls` to link input to suggestions
- `aria-label` for icon buttons
- `role="listbox"` for suggestions dropdown
- `role="option"` for individual suggestions
- Keyboard navigation support

## Performance Considerations

1. **Debouncing**: Default 300ms debounce prevents excessive API calls
2. **Suggestion Filtering**: Done client-side (filter suggestions array)
3. **Memoization**: Component uses `useCallback` for optimized handlers
4. **Outside Click Detection**: Cleanup on unmount to prevent memory leaks

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- React 16.8+ (uses Hooks)
- Next.js 13+ (Client Component)

## Files

- `index.tsx` - Main SearchBar component
- `SearchBar.example.tsx` - Usage examples
- `README.md` - This documentation

## Related Components

- `Input` - Base input component
- `Button` - Button component with variants
- Icons from `lucide-react` - Search and X icons
