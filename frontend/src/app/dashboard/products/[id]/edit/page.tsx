'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductForm, ProductFormData } from '@/components/features/ProductForm';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { productsService } from '@/lib/api';
import { toast } from 'sonner';
import Link from 'next/link';
import { Product } from '@/types';

export default function EditProductPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const params = useParams();
  const { user, isLoading: authLoading } = useAuth();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated or not a seller
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'SELLER')) {
      toast.error(t('pages.dashboard.products.errors.onlySellersEdit'));
      router.push('/dashboard');
    }
  }, [user, authLoading, router, t]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      setIsLoading(true);
      try {
        const productData = await productsService.getProductById(productId);

        // Convert dates
        const convertedProduct = {
          ...productData,
          createdAt: new Date(productData.createdAt),
          updatedAt: new Date(productData.updatedAt),
        };

        // Check if user owns this product
        if (user && productData.sellerId !== user.id) {
          toast.error(t('pages.dashboard.products.errors.canOnlyEditOwn'));
          router.push('/dashboard/products');
          return;
        }

        setProduct(convertedProduct);
      } catch (error: any) {
        console.error('Error fetching product:', error);
        const errorMessage = error?.response?.data?.error || t('pages.dashboard.products.errors.failedToLoad');
        toast.error(t('common.messages.error'), {
          description: errorMessage,
        });
        router.push('/dashboard/products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, user, router]);

  const handleSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // Handle photos: combine existing + new uploads
      const photoUrls = data.existingPhotos || [];
      if (data.photos && data.photos.length > 0) {
        // TODO: Upload new photos to Cloudinary and get URLs
        // For now, use placeholder URLs for uploaded photos
        data.photos.forEach((file, index) => {
          photoUrls.push(`https://via.placeholder.com/500?text=Product+Photo+${photoUrls.length + index + 1}`);
        });
      }

      // Update product via API
      const updateData = {
        title: data.title,
        description: data.description,
        photos: photoUrls,
        price: data.price,
        currency: data.currency,
        category: data.category,
        isAvailable: data.isAvailable,
      };
      await productsService.updateProduct(productId, updateData);

      toast.success(t('pages.productForm.messages.updateSuccess'));
      router.push('/dashboard/products');
    } catch (error: any) {
      console.error('Error updating product:', error);
      const errorMessage = error?.response?.data?.error || t('pages.productForm.messages.updateError');
      toast.error('Failed to update product', {
        description: errorMessage,
      });
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
