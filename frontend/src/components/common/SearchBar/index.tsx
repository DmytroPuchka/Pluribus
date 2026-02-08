/**
 * SearchBar Component
 * Global search bar with debounced search, suggestions dropdown, and loading state
 *
 * @component
 * @example
 * ```tsx
 * <SearchBar
 *   placeholder="Search products..."
 *   onSearch={(query) => console.log(query)}
 *   loading={false}
 *   suggestions={['Product 1', 'Product 2']}
 * />
 * ```
 */

'use client';

import { FC, useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;

  /**
   * Callback function triggered when search is performed
   */
  onSearch: (query: string) => void;

  /**
   * Whether the search is in loading state
   */
  loading?: boolean;

  /**
   * Optional suggestions to display in dropdown
   */
  suggestions?: string[];

  /**
   * Custom class name for the wrapper
   */
  className?: string;

  /**
   * Debounce delay in milliseconds (default: 300ms)
   */
  debounceDelay?: number;

  /**
   * Optional callback when suggestion is selected
   */
  onSuggestionSelect?: (suggestion: string) => void;

  /**
   * Whether to show search button (default: true)
   */
  showSearchButton?: boolean;

  /**
   * Maximum number of suggestions to display (default: 5)
   */
  maxSuggestions?: number;
}

// Default empty array outside component to maintain reference equality
const DEFAULT_SUGGESTIONS: string[] = [];

export const SearchBar: FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  loading = false,
  suggestions = DEFAULT_SUGGESTIONS,
  className,
  debounceDelay = 300,
  onSuggestionSelect,
  showSearchButton = true,
  maxSuggestions = 5,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on search query using useMemo to prevent infinite loops
  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim() || suggestions.length === 0) {
      return [];
    }

    return suggestions
      .filter((suggestion) =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, maxSuggestions);
  }, [searchQuery, suggestions, maxSuggestions]);

  // Update showSuggestions based on filteredSuggestions
  useEffect(() => {
    if (searchQuery.trim() && filteredSuggestions.length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, filteredSuggestions.length]); // Use .length to avoid array reference issues

  // Debounced search handler
  const handleSearch = useCallback(
    (query: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        if (query.trim()) {
          onSearch(query.trim());
        }
      }, debounceDelay);
    },
    [onSearch, debounceDelay]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    onSuggestionSelect?.(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setShowSuggestions(false);
      if (searchQuery.trim()) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        onSearch(searchQuery.trim());
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full max-w-md', className)}
    >
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-3 flex items-center justify-center pointer-events-none">
          <Search className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Input Field */}
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (searchQuery.trim() && filteredSuggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className="pl-9 pr-20"
          disabled={loading}
          aria-label="Search input"
          aria-autocomplete="list"
          role="combobox"
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
        />

        {/* Right side actions container */}
        <div className="absolute right-1 flex items-center gap-1">
          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center justify-center p-1">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          )}

          {/* Clear Button */}
          {searchQuery && !loading && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={handleClear}
              aria-label="Clear search"
              className="hover:bg-accent"
            >
              <X className="w-4 h-4" />
            </Button>
          )}

          {/* Search Button */}
          {showSearchButton && !loading && (
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              onClick={() => {
                if (searchQuery.trim()) {
                  onSearch(searchQuery.trim());
                  setShowSuggestions(false);
                }
              }}
              aria-label="Perform search"
              className="hover:bg-accent"
            >
              <Search className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          id="search-suggestions"
          className="absolute top-full left-0 right-0 mt-1 bg-background border border-input rounded-md shadow-md z-50"
          role="listbox"
        >
          <ul className="max-h-64 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={`${suggestion}-${index}`} role="option">
                <button
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={cn(
                    'w-full text-left px-3 py-2 text-sm',
                    'hover:bg-accent hover:text-accent-foreground',
                    'transition-colors duration-150',
                    'border-b border-input last:border-b-0'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{suggestion}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SearchBar.displayName = 'SearchBar';

export default SearchBar;
