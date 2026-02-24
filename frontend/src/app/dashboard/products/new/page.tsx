'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductForm, ProductFormData } from '@/components/features/ProductForm';
import { useTranslations } from '@/contexts/TranslationsContext';
import { useAuth } from '@/contexts/AuthContext';
import { productsService } from '@/lib/api';
import { toast } from 'sonner';
import Link from 'next/link';

export default function NewProductPage() {
  const { t } = useTranslations();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated or not a seller
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'SELLER')) {
      toast.error(t('pages.dashboard.products.errors.onlySellersCreate'));
      router.push('/dashboard');
    }
  }, [user, authLoading, router, t]);

  const handleSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // Photos are already uploaded to Cloudinary by ProductForm component
      // Create product via API
      await productsService.createProduct({
        title: data.title,
        description: data.description,
        photos: data.photos,
        price: data.price,
        category: data.category,
        stockQuantity: 999999, // Default unlimited stock
      });

      toast.success(t('pages.productForm.messages.createSuccess'));
      router.push('/dashboard/products');
    } catch (error: any) {
      console.error('Error creating product:', error);
      const errorMessage = error?.response?.data?.error || t('pages.productForm.messages.createError');
      toast.error('Failed to create product', {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/products');
  };

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

      <ProductForm onSubmit={handleSubmit} onCancel={handleCancel} isSubmitting={isSubmitting} />
    </div>
  );
}
