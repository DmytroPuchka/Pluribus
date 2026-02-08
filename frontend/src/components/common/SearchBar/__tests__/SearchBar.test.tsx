/**
 * SearchBar Component Tests
 * Unit tests for the SearchBar component
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../index';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders search input with default placeholder', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search...');
      expect(input).toBeInTheDocument();
    });

    it('renders search input with custom placeholder', () => {
      const customPlaceholder = 'Search products...';
      render(
        <SearchBar
          onSearch={mockOnSearch}
          placeholder={customPlaceholder}
        />
      );
      const input = screen.getByPlaceholderText(customPlaceholder);
      expect(input).toBeInTheDocument();
    });

    it('renders search icon', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const searchIcons = screen.getAllByRole('img', { hidden: true });
      expect(searchIcons.length).toBeGreaterThan(0);
    });

    it('renders search button when showSearchButton is true', () => {
      render(
        <SearchBar onSearch={mockOnSearch} showSearchButton={true} />
      );
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('does not render search button when showSearchButton is false', () => {
      render(
        <SearchBar
          onSearch={mockOnSearch}
          showSearchButton={false}
        />
      );
      const searchButtons = screen.queryAllByRole('button');
      // Should not have visible search button (only clear button area)
      expect(searchButtons.length).toBe(0);
    });
  });

  describe('Search Functionality', () => {
    it('calls onSearch with debounce when typing', async () => {
      render(<SearchBar onSearch={mockOnSearch} debounceDelay={300} />);
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'test' } });
      expect(mockOnSearch).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('test');
      });
    });

    it('calls onSearch only once with debounce', async () => {
      render(<SearchBar onSearch={mockOnSearch} debounceDelay={300} />);
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 't' } });
      fireEvent.change(input, { target: { value: 'te' } });
      fireEvent.change(input, { target: { value: 'tes' } });
      fireEvent.change(input, { target: { value: 'test' } });

      jest.advanceTimersByTime(300);
      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledTimes(1);
        expect(mockOnSearch).toHaveBeenCalledWith('test');
      });
    });

    it('calls onSearch when Enter key is pressed', async () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'test' } });
      fireEvent.keyDown(input, { key: 'Enter' });

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('test');
      });
    });

    it('does not call onSearch for empty queries', async () => {
      render(<SearchBar onSearch={mockOnSearch} debounceDelay={300} />);
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: '' } });
      jest.advanceTimersByTime(300);

      expect(mockOnSearch).not.toHaveBeenCalled();
    });

    it('trims whitespace from search query', async () => {
      render(<SearchBar onSearch={mockOnSearch} debounceDelay={300} />);
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: '  test  ' } });
      jest.advanceTimersByTime(300);

      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalledWith('test');
      });
    });
  });

  describe('Clear Functionality', () => {
    it('displays clear button when input has text', async () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'test' } });

      await waitFor(() => {
        const clearButton = screen.getByLabelText('Clear search');
        expect(clearButton).toBeInTheDocument();
      });
    });

    it('hides clear button when input is empty', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const clearButton = screen.queryByLabelText('Clear search');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('clears input when clear button is clicked', async () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;

      fireEvent.change(input, { target: { value: 'test' } });

      await waitFor(() => {
        const clearButton = screen.getByLabelText('Clear search');
        fireEvent.click(clearButton);
      });

      expect(input.value).toBe('');
    });
  });

  describe('Loading State', () => {
    it('displays loading spinner when loading is true', () => {
      render(<SearchBar onSearch={mockOnSearch} loading={true} />);
      const spinner = screen.getByRole('img', { hidden: true });
      expect(spinner).toBeInTheDocument();
    });

    it('disables input when loading is true', () => {
      render(
        <SearchBar
          onSearch={mockOnSearch}
          loading={true}
        />
      );
      const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
      expect(input.disabled).toBe(true);
    });

    it('hides clear button when loading', () => {
      render(
        <SearchBar
          onSearch={mockOnSearch}
          loading={true}
        />
      );
      const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'test' } });

      const clearButton = screen.queryByLabelText('Clear search');
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe('Suggestions', () => {
    const suggestions = ['Product 1', 'Product 2', 'Product 3'];

    it('displays suggestions dropdown when input has text', async () => {
      render(
        <SearchBar
          onSearch={mockOnSearch}
          suggestions={suggestions}
        />
      );
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'product' } });

      await waitFor(() => {
        expect(screen.getByText('Product 1')).toBeInTheDocument();
      });
    });

    it('filters suggestions based on input', async () => {
      render(
        <SearchBar
          onSearch={mockOnSearch}
          suggestions={suggestions}
        />
      );
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: '1' } });

      await waitFor(() => {
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
      });
    });

    it('respects maxSuggestions limit', async () => {
      const manyProducts = Array.from({ length: 10 }, (_, i) => `Product ${i + 1}`);
      render(
        <SearchBar
          onSearch={mockOnSearch}
          suggestions={manyProducts}
          maxSuggestions={5}
        />
      );
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'product' } });

      await waitFor(() => {
        const suggestions = screen.getAllByRole('option');
        expect(suggestions.length).toBe(5);
      });
    });

    it('calls onSuggestionSelect when suggestion is clicked', async () => {
      const mockOnSuggestionSelect = jest.fn();
      render(
        <SearchBar
          onSearch={mockOnSearch}
          suggestions={suggestions}
          onSuggestionSelect={mockOnSuggestionSelect}
        />
      );
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'product' } });

      await waitFor(() => {
        const suggestion = screen.getByText('Product 1');
        fireEvent.click(suggestion);
      });

      expect(mockOnSuggestionSelect).toHaveBeenCalledWith('Product 1');
    });

    it('hides suggestions when Escape key is pressed', async () => {
      render(
        <SearchBar
          onSearch={mockOnSearch}
          suggestions={suggestions}
        />
      );
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'product' } });

      await waitFor(() => {
        expect(screen.getByText('Product 1')).toBeInTheDocument();
      });

      fireEvent.keyDown(input, { key: 'Escape' });

      await waitFor(() => {
        expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
      });
    });

    it('hides suggestions when clicking outside', async () => {
      const { container } = render(
        <div>
          <SearchBar
            onSearch={mockOnSearch}
            suggestions={suggestions}
          />
          <div data-testid="outside-element">Outside</div>
        </div>
      );
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'product' } });

      await waitFor(() => {
        expect(screen.getByText('Product 1')).toBeInTheDocument();
      });

      const outsideElement = screen.getByTestId('outside-element');
      fireEvent.mouseDown(outsideElement);

      await waitFor(() => {
        expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search...');

      expect(input).toHaveAttribute('role', 'combobox');
      expect(input).toHaveAttribute('aria-expanded', 'false');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('updates aria-expanded when suggestions are shown', async () => {
      render(
        <SearchBar
          onSearch={mockOnSearch}
          suggestions={['Product 1']}
        />
      );
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'product' } });

      await waitFor(() => {
        expect(input).toHaveAttribute('aria-expanded', 'true');
      });
    });

    it('has aria-label on clear button', async () => {
      render(<SearchBar onSearch={mockOnSearch} />);
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'test' } });

      await waitFor(() => {
        const clearButton = screen.getByLabelText('Clear search');
        expect(clearButton).toBeInTheDocument();
      });
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(
        <SearchBar
          onSearch={mockOnSearch}
          className="custom-class"
        />
      );
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('custom-class');
    });

    it('respects custom debounceDelay', async () => {
      render(
        <SearchBar
          onSearch={mockOnSearch}
          debounceDelay={500}
        />
      );
      const input = screen.getByPlaceholderText('Search...');

      fireEvent.change(input, { target: { value: 'test' } });
      expect(mockOnSearch).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(mockOnSearch).not.toHaveBeenCalled();

      jest.advanceTimersByTime(200);
      await waitFor(() => {
        expect(mockOnSearch).toHaveBeenCalled();
      });
    });
  });
});
