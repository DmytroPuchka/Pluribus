'use client';

import { FC, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  Package,
  ChevronDown,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { PriceDisplay } from '@/components/common/PriceDisplay';
import { Pagination } from '@/components/common/Pagination';
import { Product, ProductCategory } from '@/types';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { productsService } from '@/lib/api';
import { toast } from 'sonner';


// Product card component for dashboard with edit/delete actions
interface DashboardProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const DashboardProductCard: FC<DashboardProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  t,
}) => {
  const stockStatus =
    product.stockQuantity === undefined
      ? 'unknown'
      : product.stockQuantity === 0
        ? 'out-of-stock'
        : product.stockQuantity < 10
          ? 'low-stock'
          : 'in-stock';

  const getStockBadgeVariant = () => {
    switch (stockStatus) {
      case 'out-of-stock':
        return 'destructive';
      case 'low-stock':
        return 'secondary';
      case 'in-stock':
        return 'default';
      default:
        return 'outline';
    }
  };

  const getStockLabel = () => {
    switch (stockStatus) {
      case 'out-of-stock':
        return t('pages.dashboard.products.card.outOfStock');
      case 'low-stock':
        return `${t('pages.dashboard.products.card.lowStock')} (${product.stockQuantity})`;
      case 'in-stock':
        return `${t('pages.dashboard.products.card.stock')}: ${product.stockQuantity}`;
      default:
        return 'Unknown';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full h-40 bg-muted">
        {product.photos && product.photos.length > 0 ? (
          <Image
            src={product.photos[0]}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <Package className="w-8 h-8" />
          </div>
        )}

        {/* Status badges */}
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge
            variant={product.isActive ? 'default' : 'secondary'}
            className={product.isActive ? 'bg-green-600' : 'bg-gray-600'}
          >
            {product.isActive ? t('pages.dashboard.products.card.active') : t('pages.dashboard.products.card.inactive')}
          </Badge>
        </div>

        {/* Out of stock overlay */}
        {product.stockQuantity === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">{t('pages.dashboard.products.card.outOfStock')}</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Product Title */}
        <h3 className="font-semibold text-base mb-1 line-clamp-2">
          {product.title}
        </h3>

        {/* Category and Price */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <PriceDisplay amount={product.price} currency={product.currency} />
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          <Badge variant={getStockBadgeVariant()} className="text-xs">
            {getStockLabel()}
          </Badge>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="ghost" className="text-xs bg-muted">
                {tag}
              </Badge>
            ))}
            {product.tags.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{product.tags.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(product)}
          >
            <Edit className="w-4 h-4 mr-1" />
            {t('pages.dashboard.products.card.edit')}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="px-2">
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-destructive cursor-pointer"
                onClick={() => onDelete(product.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t('pages.dashboard.products.card.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

// Filter component
interface FilterControlsProps {
  selectedCategory: string | null;
  selectedStatus: string | null;
  onCategoryChange: (category: string | null) => void;
  onStatusChange: (status: string | null) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const FilterControls: FC<FilterControlsProps> = ({
  selectedCategory,
  selectedStatus,
  onCategoryChange,
  onStatusChange,
  t,
}) => {
  const categories: ProductCategory[] = [
    'ELECTRONICS',
    'CLOTHING',
    'FOOD',
    'BEAUTY',
    'BOOKS',
    'TOYS',
    'SPORTS',
    'HOME',
    'OTHER',
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {/* Category Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {t('pages.dashboard.products.filters.category')}
            {selectedCategory && (
              <Badge className="ml-2" variant="secondary">
                {selectedCategory}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onCategoryChange(null)}>
            {t('pages.dashboard.products.filters.allCategories')}
          </DropdownMenuItem>
          {categories.map((cat) => (
            <DropdownMenuItem
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={selectedCategory === cat ? 'bg-accent' : ''}
            >
              {cat}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            {t('pages.dashboard.products.filters.status')}
            {selectedStatus && (
              <Badge className="ml-2" variant="secondary">
                {selectedStatus === 'active' ? t('pages.dashboard.products.filters.active') : t('pages.dashboard.products.filters.inactive')}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onStatusChange(null)}>
            {t('pages.dashboard.products.filters.allStatus')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusChange('active')}
            className={selectedStatus === 'active' ? 'bg-accent' : ''}
          >
            {t('pages.dashboard.products.filters.active')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onStatusChange('inactive')}
            className={selectedStatus === 'inactive' ? 'bg-accent' : ''}
          >
            {t('pages.dashboard.products.filters.inactive')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear filters button */}
      {(selectedCategory || selectedStatus) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onCategoryChange(null);
            onStatusChange(null);
          }}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
};

// Empty state component
const EmptyState: FC = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
      <Package className="w-8 h-8 text-muted-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-2">No Products Yet</h3>
    <p className="text-muted-foreground max-w-md mb-6">
      You haven't added any products yet. Start by creating your first product to begin selling.
    </p>
    <Button asChild>
      <Link href="/dashboard/products/new">
        <Plus className="w-4 h-4 mr-2" />
        Add Your First Product
      </Link>
    </Button>
  </div>
);

// Main Dashboard Products Page
const DashboardProductsPage: FC = () => {
  const { t } = useTranslations();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Redirect if not authenticated or not a seller
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    // Only SELLER and BOTH roles can access products page
    if (user && user.role === 'BUYER') {
      toast.error(t('pages.dashboard.products.errors.onlySellersCreate'));
      router.push('/dashboard');
    }
  }, [user, authLoading, router, t]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return;

      setIsLoading(true);
      try {
        const data = await productsService.getProducts({
          sellerId: user.id,
          limit: 50, // Fetch products for filtering
        });

        const convertedProducts = data.data.map(p => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt),
        }));

        setProducts(convertedProducts);
      } catch (error: any) {
        console.error('Failed to fetch products:', error);
        toast.error('Error', {
          description: error?.response?.data?.error || 'Failed to load products',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        !selectedCategory || product.category === selectedCategory;
      const statusMatch =
        !selectedStatus ||
        (selectedStatus === 'active' && product.isActive) ||
        (selectedStatus === 'inactive' && !product.isActive);
      return categoryMatch && statusMatch;
    });
  }, [products, selectedCategory, selectedStatus]);

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedStatus]);

  // Calculate stats
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive).length;
  const outOfStockCount = products.filter((p) => p.stockQuantity === 0).length;
  const lowStockCount = products.filter(
    (p) => (p.stockQuantity ?? 0) > 0 && (p.stockQuantity ?? 0) < 10
  ).length;

  const handleEdit = (product: Product) => {
    router.push(`/dashboard/products/${product.id}/edit`);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm(t('pages.dashboard.products.confirmDelete'))) {
      return;
    }

    try {
      await productsService.deleteProduct(productId);

      // Remove product from local state
      setProducts(prev => prev.filter(p => p.id !== productId));

      toast.success('Product deleted', {
        description: 'Product has been deleted successfully',
      });
    } catch (error: any) {
      console.error('Failed to delete product:', error);
      toast.error('Delete failed', {
        description: error?.response?.data?.error || 'Failed to delete product',
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Loading state
  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-muted/50">
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="h-10 bg-muted animate-pulse rounded w-1/3 mb-2" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-3">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Page Header */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('pages.dashboard.products.title')}</h1>
              <p className="text-muted-foreground">
                {t('pages.dashboard.products.subtitle')}
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/dashboard/products/new">
                <Plus className="w-4 h-4 mr-2" />
                {t('pages.dashboard.products.addNew')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('pages.dashboard.products.stats.total')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('pages.dashboard.products.stats.active')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeProducts}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('pages.dashboard.products.stats.outOfStock')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {outOfStockCount}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('pages.dashboard.products.stats.lowStock')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {lowStockCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {lowStockCount > 0 && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="pt-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-orange-900 mb-1">
                  {t('pages.dashboard.products.alert.title')}
                </h4>
                <p className="text-sm text-orange-800">
                  {t('pages.dashboard.products.alert.description', { count: lowStockCount })}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filter Controls */}
        <FilterControls
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          onCategoryChange={setSelectedCategory}
          onStatusChange={setSelectedStatus}
          t={t}
        />

        {/* Results Info */}
        {filteredProducts.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {t('pages.dashboard.products.showing')} {startIndex + 1}-{Math.min(endIndex, totalItems)} {t('pages.dashboard.products.of')} {totalItems} {t('pages.dashboard.products.productsCount')}
            </p>
          </div>
        )}

        {/* Products Grid or Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-40 bg-muted animate-pulse" />
                <CardContent className="p-4">
                  <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4 mb-4" />
                  <div className="h-8 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProducts.length === 0 && selectedCategory === null && selectedStatus === null ? (
          <EmptyState />
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t('pages.dashboard.products.empty.title')}</h3>
            <p className="text-muted-foreground max-w-md">
              {t('pages.dashboard.products.empty.description')}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <DashboardProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  t={t}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  showItemsPerPageSelector={true}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardProductsPage;
