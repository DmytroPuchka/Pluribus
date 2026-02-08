/**
 * Pagination Integration Examples
 *
 * Real-world integration patterns for Products, Sellers, and Orders pages
 * This file demonstrates how to integrate the Pagination component with
 * API calls, loading states, and error handling.
 */

import { useState, useEffect } from 'react';
import Pagination from './index';

/**
 * Integration 1: Products Page
 *
 * Demonstrates:
 * - Fetching products from API
 * - Handling loading and error states
 * - URL query parameter sync
 * - Scroll to top on page change
 */
export function ProductsPageIntegration() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/products?page=${currentPage}&limit=${itemsPerPage}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);

        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="space-y-4">
      {/* Products Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : error ? (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Product cards would render here */}
          {products.map((product: any) => (
            <div key={product.id} className="border rounded-lg p-4">
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Component */}
      {!error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalProducts}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          disabled={isLoading}
          showItemsPerPageSelector={true}
          showTotalItems={true}
          itemsPerPageOptions={[10, 20, 50]}
        />
      )}
    </div>
  );
}

/**
 * Integration 2: Sellers Page
 *
 * Demonstrates:
 * - Filters combined with pagination
 * - Search query state
 * - Resetting pagination on filter change
 * - Custom items per page options
 */
export function SellersPageIntegration() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sellers, setSellers] = useState([]);
  const [totalSellers, setTotalSellers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchSellers = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
          ...(searchQuery && { search: searchQuery }),
          ...(filterRating && { minRating: filterRating.toString() }),
        });

        const response = await fetch(`/api/sellers?${params}`);
        const data = await response.json();
        setSellers(data.sellers);
        setTotalSellers(data.total);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSellers();
  }, [currentPage, itemsPerPage, searchQuery, filterRating]);

  const totalPages = Math.ceil(totalSellers / itemsPerPage);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset pagination on search
  };

  const handleFilterChange = (rating: number | null) => {
    setFilterRating(rating);
    setCurrentPage(1); // Reset pagination on filter
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search sellers..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <select
          value={filterRating ?? ''}
          onChange={(e) => handleFilterChange(e.target.value ? parseInt(e.target.value) : null)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="">All ratings</option>
          <option value="4">4+ stars</option>
          <option value="3">3+ stars</option>
        </select>
      </div>

      {/* Sellers List */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2">
          {sellers.map((seller: any) => (
            <div key={seller.id} className="p-4 border rounded-lg">
              <h3>{seller.name}</h3>
              <p className="text-muted-foreground">Rating: {seller.rating}/5</p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalSellers}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        disabled={isLoading}
        itemsPerPageOptions={[20, 50, 100]}
        showItemsPerPageSelector={true}
        showTotalItems={true}
      />
    </div>
  );
}

/**
 * Integration 3: Orders Page with Date Range Filter
 *
 * Demonstrates:
 * - Date range filtering with pagination
 * - Status-based filtering
 * - No items per page selector (fixed items per page)
 * - Status badge rendering
 */
export function OrdersPageIntegration() {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 15; // Fixed per page for orders

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);

      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: ITEMS_PER_PAGE.toString(),
          ...(dateFrom && { dateFrom }),
          ...(dateTo && { dateTo }),
          ...(statusFilter && { status: statusFilter }),
        });

        const response = await fetch(`/api/orders?${params}`);
        const data = await response.json();
        setOrders(data.orders);
        setTotalOrders(data.total);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage, dateFrom, dateTo, statusFilter]);

  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  const handleDateChange = (from: string, to: string) => {
    setDateFrom(from);
    setDateTo(to);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string | null) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => handleDateChange(e.target.value, dateTo)}
            className="px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => handleDateChange(dateFrom, e.target.value)}
            className="px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={statusFilter ?? ''}
            onChange={(e) => handleStatusChange(e.target.value || null)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left py-2 px-4">Order ID</th>
                <th className="text-left py-2 px-4">Date</th>
                <th className="text-left py-2 px-4">Customer</th>
                <th className="text-left py-2 px-4">Amount</th>
                <th className="text-left py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: any) => (
                <tr key={order.id} className="border-b">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{order.customerName}</td>
                  <td className="py-2 px-4">${order.amount}</td>
                  <td className="py-2 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination - No per-page selector for orders */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalOrders}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
        disabled={isLoading}
        showItemsPerPageSelector={false} // Orders always show 15 per page
        showTotalItems={true}
        maxPagesToShow={7}
      />
    </div>
  );
}

/**
 * Integration 4: Advanced Example with URL Query Params
 *
 * Demonstrates:
 * - Syncing pagination state with URL query parameters
 * - Deep linking support
 * - Bookmarkable pagination state
 */
export function UrlQueryParamIntegration() {
  // This example assumes you're using Next.js with useRouter hook
  // For other frameworks, adapt accordingly

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Example of how to initialize from URL params
  // In a real app, you'd use:
  // const router = useRouter();
  // const { page = '1', limit = '10' } = router.query;
  // useEffect(() => {
  //   setCurrentPage(parseInt(page as string));
  //   setItemsPerPage(parseInt(limit as string));
  // }, [page, limit]);

  useEffect(() => {
    // Fetch data
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    // Update URL when pagination changes
    // window.history.pushState(
    //   null,
    //   '',
    //   `?page=${currentPage}&limit=${itemsPerPage}`
    // );

    // Fetch items...
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // In a real app, also update the URL
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="space-y-4">
      <div>{/* Items content */}</div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        showItemsPerPageSelector={true}
        showTotalItems={true}
      />
    </div>
  );
}
