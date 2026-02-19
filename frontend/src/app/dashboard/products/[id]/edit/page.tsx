'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductForm, ProductFormData } from '@/components/features/ProductForm';
import { useTranslations } from '@/contexts/TranslationsContext';
import { toast } from 'sonner';
import Link from 'next/link';
import { Product } from '@/types';

// Mock data - same as in the products page
const MOCK_SELLER_PRODUCTS: Product[] = [
  {
    id: '1',
    sellerId: 'seller-1',
    title: 'Professional Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
    photos: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    ],
    price: 149.99,
    currency: 'USD',
    category: 'ELECTRONICS',
    tags: ['audio', 'wireless', 'headphones'],
    stockQuantity: 15,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-08'),
  },
  {
    id: '2',
    sellerId: 'seller-1',
    title: 'Premium Cotton T-Shirt',
    description: 'Comfortable and durable 100% cotton t-shirt available in multiple colors',
    photos: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
    ],
    price: 29.99,
    currency: 'USD',
    category: 'CLOTHING',
    tags: ['cotton', 'casual', 'mens'],
    stockQuantity: 45,
    isActive: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-08'),
  },
  {
    id: '3',
    sellerId: 'seller-1',
    title: 'Organic Skincare Set',
    description: 'Natural and organic skincare products for all skin types',
    photos: [
      'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop',
    ],
    price: 59.99,
    currency: 'USD',
    category: 'BEAUTY',
    tags: ['organic', 'skincare', 'natural'],
    stockQuantity: 0,
    isActive: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-08'),
  },
  {
    id: '4',
    sellerId: 'seller-1',
    title: 'Stainless Steel Water Bottle',
    description: 'Durable and eco-friendly water bottle that keeps drinks hot or cold',
    photos: [
      'https://images.unsplash.com/photo-1602143407151-7e36dd5f5914?w=500&h=500&fit=crop',
    ],
    price: 34.99,
    currency: 'USD',
    category: 'HOME',
    tags: ['eco-friendly', 'water bottle', 'stainless steel'],
    stockQuantity: 8,
    isActive: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-08'),
  },
  {
    id: '5',
    sellerId: 'seller-1',
    title: 'Adventure Fantasy Novel',
    description: 'Bestselling fantasy novel with epic world-building and unforgettable characters',
    photos: [
      'https://images.unsplash.com/photo-1507842217343-583f7270bfbb?w=500&h=500&fit=crop',
    ],
    price: 16.99,
    currency: 'USD',
    category: 'BOOKS',
    tags: ['fantasy', 'bestseller', 'novel'],
    stockQuantity: 32,
    isActive: false,
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-08'),
  },
  {
    id: '6',
    sellerId: 'seller-1',
    title: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with carrying strap and alignment markers',
    photos: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop',
    ],
    price: 44.99,
    currency: 'USD',
    category: 'SPORTS',
    tags: ['yoga', 'fitness', 'exercise'],
    stockQuantity: 20,
    isActive: true,
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-08'),
  },
];

export default function EditProductPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const foundProduct = MOCK_SELLER_PRODUCTS.find((p) => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          toast.error('Product not found');
          router.push('/dashboard/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, router]);

  const handleSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to update product
      console.log('Updating product:', productId, data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(t('pages.productForm.messages.updateSuccess'));
      router.push('/dashboard/products');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(t('pages.productForm.messages.updateError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/products');
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">{t('common.messages.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/dashboard/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.buttons.back')}
          </Button>
        </Link>
      </div>

      <ProductForm
        product={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
