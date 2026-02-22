'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, Loader2 } from 'lucide-react';
import { useTranslations } from '@/contexts/TranslationsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Product, ProductCategory } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORIES: ProductCategory[] = [
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

const CURRENCIES = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'UAH', label: 'UAH (₴)' },
];

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => void | Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  photos: File[];
  existingPhotos?: string[];
}

export function ProductForm({ product, onSubmit, onCancel, isSubmitting }: ProductFormProps) {
  const { t } = useTranslations();
  const [photoPreviews, setPhotoPreviews] = useState<string[]>(product?.photos || []);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const productFormSchema = z.object({
    title: z
      .string()
      .min(5, { message: t('pages.productForm.validation.titleMinLength') })
      .max(100, { message: t('pages.productForm.validation.titleMaxLength') }),
    description: z
      .string()
      .min(20, { message: t('pages.productForm.validation.descriptionMinLength') })
      .max(2000, { message: t('pages.productForm.validation.descriptionMaxLength') }),
    price: z
      .number({ message: t('pages.productForm.validation.priceRequired') })
      .positive({ message: t('pages.productForm.validation.pricePositive') })
      .max(1000000, { message: t('pages.productForm.validation.priceMaxExceeded') }),
    currency: z.string().min(1, { message: t('pages.productForm.validation.currencyRequired') }),
    category: z.string().min(1, { message: t('pages.productForm.validation.categoryRequired') }).refine(
      (val) => val !== '',
      { message: t('pages.productForm.validation.categoryRequired') }
    ),
    photos: z.array(z.instanceof(File)).optional(),
    existingPhotos: z.array(z.string()).optional(),
  });

  type ProductFormValues = z.infer<typeof productFormSchema>;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: product?.title || '',
      description: product?.description || '',
      price: product?.price ? Number(product.price) : 0,
      currency: product?.currency || 'UAH',
      category: product?.category || '',
      photos: [],
      existingPhotos: product?.photos || [],
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const totalFiles = [...photoFiles, ...files];

    if (photoPreviews.length + totalFiles.length > 5) {
      form.setError('photos', {
        type: 'manual',
        message: t('pages.productForm.validation.photosMaxCount'),
      });
      return;
    }

    // Validate file sizes
    const invalidFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      form.setError('photos', {
        type: 'manual',
        message: t('pages.productForm.validation.photoSizeExceeded'),
      });
      return;
    }

    // Create previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...newPreviews]);
    setPhotoFiles([...photoFiles, ...files]);
    form.setValue('photos', [...photoFiles, ...files]);
  };

  const removePhoto = (index: number) => {
    const isExistingPhoto = index < (product?.photos?.length || 0);

    if (isExistingPhoto) {
      // Remove from existing photos
      const existingPhotos = form.getValues('existingPhotos') || [];
      const newExistingPhotos = existingPhotos.filter((_, i) => i !== index);
      form.setValue('existingPhotos', newExistingPhotos);
      setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
    } else {
      // Remove from new photos
      const newFileIndex = index - (product?.photos?.length || 0);
      const newFiles = photoFiles.filter((_, i) => i !== newFileIndex);
      setPhotoFiles(newFiles);
      form.setValue('photos', newFiles);
      setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (values: ProductFormValues) => {
    const formData: ProductFormData = {
      title: values.title,
      description: values.description,
      price: values.price,
      currency: values.currency,
      category: values.category as ProductCategory,
      photos: photoFiles,
      existingPhotos: values.existingPhotos,
    };

    await onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{product ? t('pages.productForm.editTitle') : t('pages.productForm.createTitle')}</CardTitle>
            <CardDescription>
              {product ? t('pages.productForm.editDescription') : t('pages.productForm.createDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.productForm.form.title')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('pages.productForm.form.titlePlaceholder')} {...field} />
                  </FormControl>
                  <FormDescription>{t('pages.productForm.form.titleDescription')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.productForm.form.description')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('pages.productForm.form.descriptionPlaceholder')}
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t('pages.productForm.form.descriptionDescription')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Photos */}
            <FormField
              control={form.control}
              name="photos"
              render={() => (
                <FormItem>
                  <FormLabel>{t('pages.productForm.form.photos')}</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {/* Photo previews */}
                      {photoPreviews.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                          {photoPreviews.map((preview, index) => (
                            <div
                              key={index}
                              className="relative aspect-square rounded-lg border overflow-hidden group"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                aria-label={t('pages.productForm.form.removePhoto', { number: index + 1 })}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Upload button */}
                      {photoPreviews.length < 5 && (
                        <div className="flex items-center gap-3">
                          <label
                            htmlFor="photo-upload"
                            className={cn(
                              'flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer transition-colors',
                              'hover:border-primary hover:bg-accent',
                              'text-sm text-muted-foreground hover:text-foreground'
                            )}
                          >
                            <Upload className="h-4 w-4" />
                            <span>{t('pages.productForm.form.photosPlaceholder', { count: photoPreviews.length })}</span>
                          </label>
                          <Input
                            id="photo-upload"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            multiple
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>{t('pages.productForm.form.photosDescription')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('pages.productForm.form.price')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="99.99"
                        value={field.value || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value === '' ? 0 : parseFloat(value) || 0);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Currency */}
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('pages.productForm.form.currency')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('pages.productForm.form.currencyPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CURRENCIES.map((currency) => (
                          <SelectItem key={currency.value} value={currency.value}>
                            {currency.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.productForm.form.category')}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('pages.productForm.form.categoryPlaceholder')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {t(`pages.products.categories.${category.toLowerCase()}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              {t('common.buttons.cancel')}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {product ? t('common.buttons.save') : t('pages.productForm.form.submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
