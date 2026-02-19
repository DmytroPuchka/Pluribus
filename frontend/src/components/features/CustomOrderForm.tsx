"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, Upload, Calendar, CheckCircle, AlertCircle, Plus } from "lucide-react"
import { useTranslations } from "@/contexts/TranslationsContext"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Supported currencies
const CURRENCIES = [
  { value: "UAH", label: "UAH (₴)", symbol: "₴" },
  { value: "USD", label: "USD ($)", symbol: "$" },
  { value: "EUR", label: "EUR (€)", symbol: "€" },
  { value: "GBP", label: "GBP (£)", symbol: "£" },
  { value: "JPY", label: "JPY (¥)", symbol: "¥" },
  { value: "CAD", label: "CAD ($)", symbol: "$" },
  { value: "AUD", label: "AUD ($)", symbol: "$" },
  { value: "CHF", label: "CHF (Fr)", symbol: "Fr" },
  { value: "CNY", label: "CNY (¥)", symbol: "¥" },
]

export interface CustomOrderFormProps {
  sellerId: string
  sellerName?: string
  onSuccess?: (orderId: string) => void
  onError?: (error: Error) => void
}

export function CustomOrderForm({
  sellerId,
  sellerName,
  onSuccess,
  onError,
}: CustomOrderFormProps) {
  const { t } = useTranslations()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [newItemText, setNewItemText] = useState("")

  // Create validation schema with translations
  const customOrderFormSchema = z.object({
    title: z
      .string()
      .min(5, { message: t('pages.customOrders.createOrder.validation.titleMinLength') })
      .max(100, { message: t('pages.customOrders.createOrder.validation.titleMaxLength') }),
    description: z
      .string()
      .min(20, { message: t('pages.customOrders.createOrder.validation.descriptionMinLength') })
      .max(2000, { message: t('pages.customOrders.createOrder.validation.descriptionMaxLength') }),
    items: z
      .array(
        z.object({
          id: z.string(),
          text: z.string().min(1),
          isCompleted: z.boolean(),
        })
      )
      .optional(),
    photos: z
      .array(z.instanceof(File))
      .min(1, { message: t('pages.customOrders.createOrder.validation.photosMinCount') })
      .max(5, { message: t('pages.customOrders.createOrder.validation.photosMaxCount') })
      .refine(
        (files) => files.every((file) => file.size <= 5 * 1024 * 1024),
        { message: t('pages.customOrders.createOrder.validation.photoSizeExceeded') }
      )
      .refine(
        (files) =>
          files.every((file) =>
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)
          ),
        { message: t('pages.customOrders.createOrder.validation.photoTypeInvalid') }
      ),
    maxPrice: z
      .number({ message: t('pages.customOrders.createOrder.validation.priceRequired') })
      .positive({ message: t('pages.customOrders.createOrder.validation.pricePositive') })
      .max(1000000, { message: t('pages.customOrders.createOrder.validation.priceMaxExceeded') }),
    currency: z.string().min(1, { message: t('pages.customOrders.createOrder.validation.currencyRequired') }),
    deliveryType: z.enum(["asap", "date"]),
    deliveryDeadline: z.string().optional(),
    deliveryAddress: z
      .string()
      .min(10, { message: t('pages.customOrders.createOrder.validation.addressMinLength') })
      .max(500, { message: t('pages.customOrders.createOrder.validation.addressMaxLength') }),
  }).refine(
    (data) => {
      if (data.deliveryType === "date" && !data.deliveryDeadline) {
        return false
      }
      return true
    },
    {
      message: t('pages.customOrders.createOrder.validation.deadlineOrAsapRequired'),
      path: ["deliveryDeadline"],
    }
  ).refine(
    (data) => {
      if (data.deliveryDeadline && data.deliveryType === "date") {
        const selectedDate = new Date(data.deliveryDeadline)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return selectedDate >= today
      }
      return true
    },
    {
      message: t('pages.customOrders.createOrder.validation.deadlinePastDate'),
      path: ["deliveryDeadline"],
    }
  )

  type CustomOrderFormValues = z.infer<typeof customOrderFormSchema>

  const form = useForm<CustomOrderFormValues>({
    resolver: zodResolver(customOrderFormSchema),
    defaultValues: {
      title: "",
      description: "",
      items: [],
      photos: [],
      maxPrice: undefined,
      currency: "UAH",
      deliveryType: "asap" as "asap" | "date",
      deliveryDeadline: "",
      deliveryAddress: "",
    },
  })

  const deliveryType = form.watch("deliveryType")

  // Handle photo file selection
  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const currentPhotos = form.getValues("photos") || []
    const totalFiles = [...currentPhotos, ...files]

    if (totalFiles.length > 5) {
      form.setError("photos", {
        type: "manual",
        message: t('pages.customOrders.createOrder.validation.photosMaxCount'),
      })
      return
    }

    form.setValue("photos", totalFiles, { shouldValidate: true })

    // Generate previews
    const newPreviews: string[] = []
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result as string)
        if (newPreviews.length === files.length) {
          setPhotoPreviews([...photoPreviews, ...newPreviews])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  // Remove photo
  const removePhoto = (index: number) => {
    const currentPhotos = form.getValues("photos")
    const newPhotos = currentPhotos.filter((_, i) => i !== index)
    form.setValue("photos", newPhotos, { shouldValidate: true })

    const newPreviews = photoPreviews.filter((_, i) => i !== index)
    setPhotoPreviews(newPreviews)
  }

  // Handle delivery type change
  const handleDeliveryTypeChange = (value: "asap" | "date") => {
    form.setValue("deliveryType", value)
    if (value === "asap") {
      form.setValue("deliveryDeadline", "")
      form.clearErrors("deliveryDeadline")
    }
  }

  // Handle adding a new item
  const handleAddItem = () => {
    if (!newItemText.trim()) return

    const currentItems = form.getValues("items") || []
    const newItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: newItemText.trim(),
      isCompleted: false,
    }

    form.setValue("items", [...currentItems, newItem])
    setNewItemText("")
  }

  // Handle removing an item
  const handleRemoveItem = (itemId: string) => {
    const currentItems = form.getValues("items") || []
    const updatedItems = currentItems.filter((item) => item.id !== itemId)
    form.setValue("items", updatedItems)
  }

  // Handle toggling item completion
  const handleToggleItem = (itemId: string) => {
    const currentItems = form.getValues("items") || []
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    )
    form.setValue("items", updatedItems)
  }

  // Handle Enter key in item input
  const handleItemKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddItem()
    }
  }

  // Form submission
  const onSubmit = async (data: CustomOrderFormValues) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, you would:
      // 1. Upload photos to cloud storage (e.g., S3, Cloudinary)
      // 2. Send the form data with photo URLs to your backend API
      // const formData = new FormData()
      // formData.append('sellerId', sellerId)
      // formData.append('title', data.title)
      // formData.append('description', data.description)
      // formData.append('maxPrice', data.maxPrice.toString())
      // formData.append('currency', data.currency)
      // formData.append('deliveryType', data.deliveryType)
      // formData.append('deliveryDeadline', data.deliveryDeadline || '')
      // formData.append('deliveryAddress', data.deliveryAddress)
      // data.photos.forEach((photo, index) => {
      //   formData.append(`photos`, photo)
      // })
      //
      // const response = await fetch('/api/custom-orders', {
      //   method: 'POST',
      //   body: formData,
      // })
      //
      // if (!response.ok) throw new Error('Failed to create custom order')
      // const result = await response.json()

      console.log("Form submitted:", {
        ...data,
        sellerId,
        photos: data.photos.map((p) => p.name),
      })

      setSubmitStatus("success")
      const mockOrderId = `custom-order-${Date.now()}`
      onSuccess?.(mockOrderId)

      // Reset form after successful submission
      setTimeout(() => {
        form.reset()
        setPhotoPreviews([])
        setNewItemText("")
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Error submitting custom order:", error)
      setSubmitStatus("error")
      const errorMsg = error instanceof Error ? error.message : "Failed to submit custom order"
      setErrorMessage(errorMsg)
      onError?.(error instanceof Error ? error : new Error(errorMsg))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get minimum date for date input (today)
  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  // Success state
  if (submitStatus === "success") {
    return (
      <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
        <CardContent className="pt-6">
          <div className="flex gap-4 items-start">
            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-lg text-green-900 dark:text-green-100 mb-2">
                {t('pages.customOrders.createOrder.success.title')}
              </h3>
              <p className="text-green-800 dark:text-green-200">
                {sellerName
                  ? t('pages.customOrders.createOrder.success.messageWithSeller', { sellerName })
                  : t('pages.customOrders.createOrder.success.message')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('pages.customOrders.createOrder.form.cardTitle')}</CardTitle>
        <CardDescription>
          {sellerName
            ? t('pages.customOrders.createOrder.form.cardDescriptionWithSeller', { sellerName })
            : t('pages.customOrders.createOrder.form.cardDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Error Message */}
            {submitStatus === "error" && (
              <div className="flex gap-3 p-4 rounded-lg border border-destructive/50 bg-destructive/10">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-destructive">
                    {t('pages.customOrders.messages.error.failedToSubmit')}
                  </p>
                  {errorMessage && (
                    <p className="text-sm text-destructive/80 mt-1">{errorMessage}</p>
                  )}
                </div>
              </div>
            )}

            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.customOrders.createOrder.form.title')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('pages.customOrders.createOrder.form.titlePlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('pages.customOrders.createOrder.form.titleDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.customOrders.createOrder.form.description')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('pages.customOrders.createOrder.form.descriptionPlaceholder')}
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('pages.customOrders.createOrder.form.descriptionDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Order Items List (Google Keep style) */}
            <FormField
              control={form.control}
              name="items"
              render={() => {
                const items = form.watch("items") || []
                return (
                  <FormItem>
                    <FormLabel>{t('pages.customOrders.createOrder.form.items')}</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        {/* Items container */}
                        {items.length > 0 && (
                          <div className="border rounded-lg p-3 space-y-2 bg-card">
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors group"
                              >
                                <Checkbox
                                  checked={item.isCompleted}
                                  onCheckedChange={() => handleToggleItem(item.id)}
                                  aria-label={t('pages.customOrders.createOrder.form.itemToggle', { text: item.text })}
                                />
                                <span
                                  className={cn(
                                    "flex-1 text-sm",
                                    item.isCompleted && "line-through text-muted-foreground"
                                  )}
                                >
                                  {item.text}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveItem(item.id)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
                                  aria-label={t('pages.customOrders.createOrder.form.removeItem')}
                                >
                                  <X className="h-4 w-4 text-destructive" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add item input */}
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder={t('pages.customOrders.createOrder.form.itemPlaceholder')}
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            onKeyPress={handleItemKeyPress}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            onClick={handleAddItem}
                            disabled={!newItemText.trim()}
                            variant="outline"
                            size="icon"
                            aria-label={t('pages.customOrders.createOrder.form.addItem')}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      {t('pages.customOrders.createOrder.form.itemsDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            {/* Photo Upload Field */}
            <FormField
              control={form.control}
              name="photos"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>{t('pages.customOrders.createOrder.form.photos')}</FormLabel>
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
                                aria-label={t('pages.customOrders.createOrder.form.removePhoto', { number: index + 1 })}
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
                              "flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                              "hover:border-primary hover:bg-accent",
                              "text-sm text-muted-foreground hover:text-foreground"
                            )}
                          >
                            <Upload className="h-4 w-4" />
                            <span>{t('pages.customOrders.createOrder.form.photosPlaceholder', { count: photoPreviews.length })}</span>
                          </label>
                          <Input
                            id="photo-upload"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            multiple
                            onChange={handlePhotoChange}
                            className="hidden"
                            {...fieldProps}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    {t('pages.customOrders.createOrder.form.photosDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price and Currency Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="maxPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('pages.customOrders.createOrder.form.maxPrice')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t('pages.customOrders.createOrder.form.maxPricePlaceholder')}
                        step="0.01"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value
                          field.onChange(value === "" ? undefined : parseFloat(value))
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>{t('pages.customOrders.createOrder.form.maxPriceDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('pages.customOrders.createOrder.form.currency')}</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('pages.customOrders.createOrder.form.currencyPlaceholder')} />
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

            {/* Delivery Deadline Field */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="deliveryType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t('pages.customOrders.createOrder.form.deliveryTypeLabel')}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={handleDeliveryTypeChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="asap" id="asap" />
                          <Label htmlFor="asap" className="font-normal cursor-pointer">
                            {t('pages.customOrders.createOrder.form.asapOption')}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="date" id="date" />
                          <Label htmlFor="date" className="font-normal cursor-pointer">
                            {t('pages.customOrders.createOrder.form.dateOption')}
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      {t('pages.customOrders.createOrder.form.deliveryTypeDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {deliveryType === "date" && (
                <FormField
                  control={form.control}
                  name="deliveryDeadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('pages.customOrders.createOrder.form.specificDate')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            min={getMinDate()}
                            {...field}
                            className="pl-10"
                          />
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        {t('pages.customOrders.createOrder.form.specificDateDescription')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Delivery Address Field */}
            <FormField
              control={form.control}
              name="deliveryAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('pages.customOrders.createOrder.form.address')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('pages.customOrders.createOrder.form.addressPlaceholder')}
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t('pages.customOrders.createOrder.form.addressDescription')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={isSubmitting} size="lg" className="flex-1 sm:flex-none">
                {isSubmitting
                  ? t('pages.customOrders.createOrder.buttons.submitting')
                  : t('pages.customOrders.createOrder.buttons.submit')}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
