/**
 * Pagination Component Usage Examples
 *
 * This file demonstrates various ways to use the Pagination component
 * across different pages (Products, Sellers, Orders)
 */

import { useState } from 'react';
import Pagination from './index';

/**
 * Example 1: Basic Usage with Products List
 */
export function ProductsListExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalProducts = 156;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <div className="space-y-4">
      <div>
        {/* Products grid would go here */}
        <p>Showing products {(currentPage - 1) * itemsPerPage + 1} to {currentPage * itemsPerPage}</p>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalProducts}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1); // Reset to first page when changing items per page
        }}
      />
    </div>
  );
}

/**
 * Example 2: Sellers List with Custom Items Per Page Options
 */
export function SellersListExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const totalSellers = 1250;
  const totalPages = Math.ceil(totalSellers / itemsPerPage);

  return (
    <div className="space-y-4">
      <div>
        {/* Sellers list would go here */}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalSellers}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
        itemsPerPageOptions={[20, 50, 100]}
        showItemsPerPageSelector={true}
        showTotalItems={true}
      />
    </div>
  );
}

/**
 * Example 3: Orders List without Items Per Page Selector
 */
export function OrdersListExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const totalOrders = 342;
  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  return (
    <div className="space-y-4">
      <div>
        {/* Orders list would go here */}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalOrders}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        showItemsPerPageSelector={false}
        showTotalItems={true}
      />
    </div>
  );
}

/**
 * Example 4: Mobile-Optimized with Reduced Pages Display
 */
export function MobileOptimizedExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = 500;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-4">
      <div>
        {/* List content */}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(newItemsPerPage) => {
          setItemsPerPage(newItemsPerPage);
          setCurrentPage(1);
        }}
        maxPagesToShow={3} // Show fewer page numbers on mobile
        showItemsPerPageSelector={true}
        showTotalItems={true}
      />
    </div>
  );
}

/**
 * Example 5: Disabled State (loading or error)
 */
export function DisabledPaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-4">
      <div>
        {/* List content */}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={10}
        totalItems={100}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
        disabled={isLoading}
      />
    </div>
  );
}

/**
 * Example 6: Advanced Usage with API Integration
 */
export function AdvancedApiExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    try {
      // Simulate API call
      const response = await fetch(
        `/api/items?page=${page}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setItems(data.items);
      setTotalItems(data.total);
      setCurrentPage(page);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
    handlePageChange(1); // Fetch new data with new limit
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-4">
      <div>
        {isLoading && <p>Loading...</p>}
        {/* Items list would render here */}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        disabled={isLoading}
        showItemsPerPageSelector={true}
        showTotalItems={true}
      />
    </div>
  );
}
