/**
 * SearchBar Component Types
 * Type definitions and interfaces for the SearchBar component
 */

/**
 * Props for the SearchBar component
 */
export interface SearchBarProps {
  /**
   * Placeholder text for the search input
   * @default 'Search...'
   */
  placeholder?: string;

  /**
   * Callback function triggered when search is performed
   * Called with the trimmed search query
   */
  onSearch: (query: string) => void;

  /**
   * Whether the search is in loading state
   * Disables input, shows spinner, hides clear button
   * @default false
   */
  loading?: boolean;

  /**
   * Array of suggestions to display in the dropdown
   * Will be filtered based on the current input
   * @default []
   */
  suggestions?: string[];

  /**
   * Custom CSS class name for the wrapper div
   * @default undefined
   */
  className?: string;

  /**
   * Debounce delay in milliseconds for the search handler
   * Prevents excessive search calls while typing
   * @default 300
   */
  debounceDelay?: number;

  /**
   * Optional callback when a suggestion is selected
   * Called in addition to onSearch
   */
  onSuggestionSelect?: (suggestion: string) => void;

  /**
   * Whether to show the search button
   * If false, search only triggers on Enter key or suggestion click
   * @default true
   */
  showSearchButton?: boolean;

  /**
   * Maximum number of suggestions to display in the dropdown
   * @default 5
   */
  maxSuggestions?: number;
}

/**
 * Internal state for suggestions
 */
export interface SuggestionsState {
  isOpen: boolean;
  filtered: string[];
  selectedIndex: number;
}
