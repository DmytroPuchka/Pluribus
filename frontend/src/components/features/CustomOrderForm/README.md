# CustomOrderForm Component

A comprehensive form component for buyers to create custom order requests to sellers on the Pluribus platform.

## Features

- **React Hook Form + Zod Validation**: Robust form handling with schema-based validation
- **Multiple Photo Upload**: Support for up to 5 photos with real-time previews
- **Currency Support**: Multiple currency options (USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY)
- **Flexible Delivery Options**: ASAP checkbox or specific date picker
- **Responsive Design**: Mobile-first, fully responsive layout
- **Loading States**: Disabled submit button during form submission
- **Success/Error States**: Clear visual feedback for form submission results
- **TypeScript**: Fully typed with proper TypeScript interfaces

## Installation

The component is already set up and ready to use. It requires the following dependencies (already installed):

- `react-hook-form`
- `@hookform/resolvers`
- `zod`
- `lucide-react`

## Usage

### Basic Usage

```tsx
import { CustomOrderForm } from "@/components/features/CustomOrderForm"

function MyPage() {
  return (
    <CustomOrderForm
      sellerId="seller-123"
      sellerName="John's Crafts"
      onSuccess={(orderId) => {
        console.log("Order created:", orderId)
      }}
      onError={(error) => {
        console.error("Error:", error)
      }}
    />
  )
}
```

### In a Modal

```tsx
import { useState } from "react"
import { CustomOrderForm } from "@/components/features/CustomOrderForm"
import { Button } from "@/components/ui/button"

function SellerProfile() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Button onClick={() => setShowForm(true)}>
        Request Custom Order
      </Button>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 p-4">
          <div className="max-w-3xl mx-auto bg-background rounded-lg">
            <CustomOrderForm
              sellerId="seller-123"
              sellerName="Seller Name"
              onSuccess={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}
```

### In a Dedicated Page

```tsx
// app/sellers/[id]/custom-order/page.tsx
import { CustomOrderForm } from "@/components/features/CustomOrderForm"

export default function CustomOrderPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="container py-8 max-w-4xl">
      <CustomOrderForm
        sellerId={params.id}
        onSuccess={(orderId) => {
          // Redirect to order confirmation
          router.push(`/orders/${orderId}`)
        }}
      />
    </div>
  )
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `sellerId` | `string` | Yes | The unique identifier of the seller |
| `sellerName` | `string` | No | The name of the seller (displayed in UI) |
| `onSuccess` | `(orderId: string) => void` | No | Callback fired when order is successfully created |
| `onError` | `(error: Error) => void` | No | Callback fired when order creation fails |

## Form Fields

### Required Fields

1. **Title** (5-100 characters)
   - Brief description of the custom order
   - Example: "Custom wooden chair with specific dimensions"

2. **Description** (20-2000 characters)
   - Detailed specifications and requirements
   - Materials, colors, sizes, etc.

3. **Photos** (1-5 images)
   - Supported formats: JPEG, PNG, WebP
   - Max size: 5MB per image
   - Reference images for the custom order

4. **Maximum Price** (positive number, max 1,000,000)
   - Budget for the custom order
   - Displayed with selected currency

5. **Currency**
   - Dropdown selector with 8 major currencies
   - Default: USD

6. **Delivery Deadline**
   - Either ASAP checkbox or specific date
   - Date must be today or in the future
   - One of these options is required

7. **Delivery Address** (10-500 characters)
   - Complete delivery address
   - Include street, city, state/province, postal code, country

## Validation Rules

- **Title**: 5-100 characters
- **Description**: 20-2000 characters
- **Photos**: 1-5 images, each under 5MB, JPEG/PNG/WebP only
- **Max Price**: Must be positive, max 1,000,000
- **Currency**: Required selection
- **Delivery**: Must select either ASAP or a future date
- **Address**: 10-500 characters

## States

### Idle State
The default state showing the form with all fields.

### Loading State
- Submit button disabled
- Button text changes to "Sending Request..."
- Form inputs remain enabled

### Success State
- Green success card displayed
- Shows confirmation message with seller name
- Form automatically resets after 3 seconds
- `onSuccess` callback fired with order ID

### Error State
- Red error banner at top of form
- Error message displayed
- Form remains editable
- `onError` callback fired with error object

## API Integration

The component is set up with a mock API call. To integrate with your backend:

1. Uncomment the API code in the `onSubmit` function
2. Replace the endpoint `/api/custom-orders` with your actual endpoint
3. Handle photo uploads (e.g., to S3, Cloudinary)
4. Update the response handling as needed

Example integration:

```typescript
const onSubmit = async (data: CustomOrderFormValues) => {
  setIsSubmitting(true)

  try {
    // 1. Upload photos to cloud storage
    const photoUrls = await Promise.all(
      data.photos.map(photo => uploadToCloudStorage(photo))
    )

    // 2. Create custom order
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

    if (!response.ok) throw new Error('Failed to create custom order')

    const result = await response.json()
    onSuccess?.(result.id)
  } catch (error) {
    onError?.(error)
  } finally {
    setIsSubmitting(false)
  }
}
```

## Styling

The component uses Tailwind CSS and follows the existing design system:

- Matches Card, Input, Button, and other UI components
- Responsive grid layouts
- Focus states and accessibility
- Dark mode compatible

## Accessibility

- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Error announcements
- Screen reader friendly

## Browser Support

Works in all modern browsers that support:
- ES6+
- CSS Grid
- FileReader API
- FormData API

## Related Components

- `Button` - Used for submit and action buttons
- `Input` - Text and number inputs
- `Textarea` - Multi-line text areas
- `Select` - Currency dropdown
- `Checkbox` - ASAP option
- `Card` - Container layout
- `Form` - React Hook Form wrapper components

## TypeScript Types

The component exports:

- `CustomOrderForm` - Main component
- `CustomOrderFormProps` - Props interface

Related types from `/src/types/index.ts`:
- `CustomOrder` - The complete custom order entity
- `CustomOrderStatus` - Order status enum

## Examples

See `CustomOrderForm.example.tsx` for more usage examples including:
- Modal implementation
- Dedicated page
- Seller profile integration
- Next.js App Router usage
