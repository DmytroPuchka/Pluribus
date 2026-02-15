# CustomOrderForm - Quick Start Guide

## Installation
No installation needed! The component is ready to use.

## Import

```tsx
import { CustomOrderForm } from "@/components/features/CustomOrderForm"
```

## Basic Usage

```tsx
export default function SellerProfilePage() {
  return (
    <CustomOrderForm
      sellerId="seller-123"
      sellerName="John's Crafts"
      onSuccess={(orderId) => {
        console.log("Order created:", orderId)
        // Handle success (redirect, show notification, etc.)
      }}
      onError={(error) => {
        console.error("Error:", error)
        // Handle error (show notification, etc.)
      }}
    />
  )
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sellerId` | `string` | ✅ Yes | The seller's unique ID |
| `sellerName` | `string` | No | Seller's name (shown in UI) |
| `onSuccess` | `(orderId: string) => void` | No | Called when order is created |
| `onError` | `(error: Error) => void` | No | Called when creation fails |

## Form Fields

The form includes these fields:

1. **Order Title** - What you want to order
2. **Description** - Detailed specifications
3. **Photos** - Upload 1-5 reference images
4. **Maximum Price** - Your budget
5. **Currency** - USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY
6. **Delivery Deadline** - Pick a date OR check "ASAP"
7. **Delivery Address** - Where to ship

## States

### Success State
After successful submission, the form shows a green success message and auto-resets after 3 seconds.

### Error State
If submission fails, a red error banner appears at the top of the form.

### Loading State
During submission, the submit button is disabled and shows "Sending Request..."

## Complete Example with Modal

```tsx
"use client"

import { useState } from "react"
import { CustomOrderForm } from "@/components/features/CustomOrderForm"
import { Button } from "@/components/ui/button"

export default function SellerProfile({ sellerId, sellerName }) {
  const [showForm, setShowForm] = useState(false)

  return (
    <div>
      <Button onClick={() => setShowForm(true)}>
        Request Custom Order
      </Button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-lg">
            <div className="sticky top-0 flex justify-end p-4 bg-background border-b">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowForm(false)}
              >
                Close
              </Button>
            </div>
            <div className="p-6">
              <CustomOrderForm
                sellerId={sellerId}
                sellerName={sellerName}
                onSuccess={(orderId) => {
                  console.log("Order created:", orderId)
                  setTimeout(() => setShowForm(false), 3000)
                }}
                onError={(error) => {
                  console.error("Error:", error)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

## Backend Integration

To connect to your backend:

1. Open `/src/components/features/CustomOrderForm.tsx`
2. Find the `onSubmit` function (around line 220)
3. Replace the mock API call with your actual API endpoint
4. Handle photo uploads to your cloud storage

Example:

```typescript
const onSubmit = async (data: CustomOrderFormValues) => {
  setIsSubmitting(true)

  try {
    // 1. Upload photos to cloud storage (S3, Cloudinary, etc.)
    const photoUrls = await uploadPhotos(data.photos)

    // 2. Send data to your API
    const response = await fetch('/api/custom-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sellerId,
        title: data.title,
        description: data.description,
        photos: photoUrls,
        maxPrice: data.maxPrice,
        currency: data.currency,
        isAsap: data.isAsap,
        deliveryDeadline: data.deliveryDeadline,
        deliveryAddress: data.deliveryAddress,
      }),
    })

    if (!response.ok) throw new Error('Failed to create order')

    const result = await response.json()
    onSuccess?.(result.id)
    
  } catch (error) {
    onError?.(error)
  } finally {
    setIsSubmitting(false)
  }
}
```

## Need Help?

- See full documentation: `CustomOrderForm/README.md`
- View usage examples: `CustomOrderForm.example.tsx`
- Check implementation details: `/CUSTOM_ORDER_FORM_IMPLEMENTATION.md`

## That's it!

You're ready to use the CustomOrderForm component. It handles all validation, UI states, and user interactions automatically.
