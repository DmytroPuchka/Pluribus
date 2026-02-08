/**
 * Pagination Component Tests
 *
 * Tests for the Pagination component covering:
 * - Rendering and display
 * - Navigation functionality
 * - Items per page selection
 * - Disabled state
 * - Responsive behavior
 * - Accessibility
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Pagination from './index';

describe('Pagination Component', () => {
  const mockOnPageChange = jest.fn();
  const mockOnItemsPerPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
    mockOnItemsPerPageChange.mockClear();
  });

  describe('Rendering', () => {
    it('should render pagination component', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByRole('region')).toBeInTheDocument();
    });

    it('should display correct page numbers', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          maxPagesToShow={7}
        />
      );

      expect(screen.getByRole('button', { name: /go to page 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go to page 10/i })).toBeInTheDocument();
    });

    it('should highlight current page', () => {
      const { container } = render(
        <Pagination
          currentPage={5}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      const currentPageButton = screen.getByRole('button', { name: /go to page 5/i });
      expect(currentPageButton).toHaveAttribute('aria-current', 'page');
    });

    it('should show total items when showTotalItems is true', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={156}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          showTotalItems={true}
        />
      );

      expect(screen.getByText(/156/i)).toBeInTheDocument();
      expect(screen.getByText(/showing/i)).toBeInTheDocument();
    });

    it('should hide total items when showTotalItems is false', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          showTotalItems={false}
        />
      );

      expect(screen.queryByText(/showing/i)).not.toBeInTheDocument();
    });

    it('should display items per page selector when enabled', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          showItemsPerPageSelector={true}
        />
      );

      expect(screen.getByRole('combobox', { name: /items per page/i })).toBeInTheDocument();
    });

    it('should hide items per page selector when disabled', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          showItemsPerPageSelector={false}
        />
      );

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should call onPageChange when clicking a page number', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /go to page 3/i }));
      expect(mockOnPageChange).toHaveBeenCalledWith(3);
    });

    it('should navigate to next page', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /go to next page/i }));
      expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it('should navigate to previous page', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /go to previous page/i }));
      expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('should navigate to first page', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /go to first page/i }));
      expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });

    it('should navigate to last page', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /go to last page/i }));
      expect(mockOnPageChange).toHaveBeenCalledWith(10);
    });
  });

  describe('Disabled State', () => {
    it('should disable previous button on first page', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByRole('button', { name: /go to previous page/i })).toBeDisabled();
    });

    it('should disable next button on last page', () => {
      render(
        <Pagination
          currentPage={10}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByRole('button', { name: /go to next page/i })).toBeDisabled();
    });

    it('should disable all buttons when disabled prop is true', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          disabled={true}
        />
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });

    it('should not call callbacks when disabled', async () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          disabled={true}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /go to next page/i }));
      expect(mockOnPageChange).not.toHaveBeenCalled();
    });
  });

  describe('Items Per Page', () => {
    it('should display items per page options', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          itemsPerPageOptions={[10, 20, 50, 100]}
          showItemsPerPageSelector={true}
        />
      );

      const select = screen.getByRole('combobox', { name: /items per page/i }) as HTMLSelectElement;
      expect(select.children).toHaveLength(4);
    });

    it('should call onItemsPerPageChange when selection changes', async () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          showItemsPerPageSelector={true}
        />
      );

      const select = screen.getByRole('combobox', { name: /items per page/i });
      fireEvent.change(select, { target: { value: '20' } });
      expect(mockOnItemsPerPageChange).toHaveBeenCalledWith(20);
    });

    it('should support custom items per page options', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={1000}
          itemsPerPage={50}
          onPageChange={mockOnPageChange}
          onItemsPerPageChange={mockOnItemsPerPageChange}
          itemsPerPageOptions={[25, 50, 75, 100]}
          showItemsPerPageSelector={true}
        />
      );

      const select = screen.getByRole('combobox', { name: /items per page/i }) as HTMLSelectElement;
      expect(select.value).toBe('50');
    });
  });

  describe('Page Number Display', () => {
    it('should display all pages when totalPages is less than maxPagesToShow', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={5}
          totalItems={50}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          maxPagesToShow={5}
        />
      );

      for (let i = 1; i <= 5; i++) {
        expect(screen.getByRole('button', { name: new RegExp(`page ${i}`, 'i') })).toBeInTheDocument();
      }
    });

    it('should display ellipsis when there are many pages', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={20}
          totalItems={200}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          maxPagesToShow={5}
        />
      );

      const ellipsis = screen.getAllByText('...');
      expect(ellipsis.length).toBeGreaterThan(0);
    });

    it('should always show first and last page', () => {
      render(
        <Pagination
          currentPage={10}
          totalPages={20}
          totalItems={200}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByRole('button', { name: /go to page 1/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go to page 20/i })).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria labels', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      expect(screen.getByLabelText(/go to first page/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/go to previous page/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/go to next page/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/go to last page/i)).toBeInTheDocument();
    });

    it('should set aria-current on current page', () => {
      render(
        <Pagination
          currentPage={3}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      const currentButton = screen.getByRole('button', { name: /go to page 3/i });
      expect(currentButton).toHaveAttribute('aria-current', 'page');
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={100}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
        />
      );

      const firstPageButton = screen.getByRole('button', { name: /go to page 1/i });
      await user.tab();
      expect(firstPageButton).toBeFocus();
    });
  });

  describe('Total Items Display', () => {
    it('should display correct range on first page', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={10}
          totalItems={156}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          showTotalItems={true}
        />
      );

      expect(screen.getByText(/showing 1 to 10 of 156/i)).toBeInTheDocument();
    });

    it('should display correct range on middle page', () => {
      render(
        <Pagination
          currentPage={5}
          totalPages={16}
          totalItems={156}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          showTotalItems={true}
        />
      );

      expect(screen.getByText(/showing 41 to 50 of 156/i)).toBeInTheDocument();
    });

    it('should display correct range on last page with partial items', () => {
      render(
        <Pagination
          currentPage={16}
          totalPages={16}
          totalItems={156}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          showTotalItems={true}
        />
      );

      expect(screen.getByText(/showing 151 to 156 of 156/i)).toBeInTheDocument();
    });

    it('should format large numbers with locale-specific formatting', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={100}
          totalItems={1000000}
          itemsPerPage={10}
          onPageChange={mockOnPageChange}
          showTotalItems={true}
        />
      );

      expect(screen.getByText(/1,000,000/)).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('should have correct display name', () => {
      expect(Pagination.displayName).toBe('Pagination');
    });
  });
});
