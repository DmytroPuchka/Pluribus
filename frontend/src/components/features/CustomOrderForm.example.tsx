/**
 * CustomOrderForm Usage Examples
 *
 * This file demonstrates how to use the CustomOrderForm component
 * in different scenarios within your application.
 */

"use client"

import { useState } from "react"
import { CustomOrderForm } from "./CustomOrderForm"
import { Button } from "@/components/ui/button"

// Example 1: Basic usage in a modal
export function CustomOrderModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Request Custom Order
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-lg">
            <div className="sticky top-0 flex justify-end p-4 bg-background border-b">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="p-6">
              <CustomOrderForm
                sellerId="seller-123"
                sellerName="John's Crafts"
                onSuccess={(orderId) => {
                  console.log("Order created:", orderId)
                  // Optionally close modal after success
                  setTimeout(() => setIsOpen(false), 3000)
                }}
                onError={(error) => {
                  console.error("Order creation failed:", error)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Example 2: Usage in a dedicated page
export function CustomOrderPage() {
  const sellerId = "seller-123" // Get from URL params or route
  const sellerName = "John's Crafts" // Get from seller data

  return (
    <div className="container py-8 max-w-4xl">
      <CustomOrderForm
        sellerId={sellerId}
        sellerName={sellerName}
        onSuccess={(orderId) => {
          console.log("Order created:", orderId)
          // Redirect to order details or orders list
          // router.push(`/dashboard/orders/${orderId}`)
        }}
        onError={(error) => {
          console.error("Failed to create order:", error)
          // Show toast notification
          // toast.error("Failed to create order. Please try again.")
        }}
      />
    </div>
  )
}

// Example 3: Usage within a seller profile page
export function SellerProfileWithCustomOrder() {
  const [showCustomOrderForm, setShowCustomOrderForm] = useState(false)

  return (
    <div className="container py-8">
      {/* Seller profile content */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">John&apos;s Crafts</h1>
        <p className="text-muted-foreground">Custom furniture and woodworking</p>

        <div className="mt-4 flex gap-3">
          <Button>View Products</Button>
          <Button
            variant="outline"
            onClick={() => setShowCustomOrderForm(!showCustomOrderForm)}
          >
            {showCustomOrderForm ? "Hide Custom Order Form" : "Request Custom Order"}
          </Button>
        </div>
      </div>

      {/* Custom order form */}
      {showCustomOrderForm && (
        <div className="mb-8">
          <CustomOrderForm
            sellerId="seller-123"
            sellerName="John's Crafts"
            onSuccess={(orderId) => {
              console.log("Custom order created:", orderId)
              setShowCustomOrderForm(false)
              // Show success toast
            }}
            onError={(error) => {
              console.error("Error:", error)
            }}
          />
        </div>
      )}

      {/* Rest of seller profile content */}
    </div>
  )
}

// Example 4: Usage with Next.js App Router
export default function CustomOrderRequestPage({
  params,
}: {
  params: { sellerId: string }
}) {
  // In a real app, you would fetch seller data
  const seller = {
    id: params.sellerId,
    name: "John's Crafts",
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Create Custom Order Request
        </h1>
        <p className="text-muted-foreground mt-2">
          Send a custom order request to {seller.name}
        </p>
      </div>

      <CustomOrderForm
        sellerId={seller.id}
        sellerName={seller.name}
        onSuccess={(orderId) => {
          console.log("Order created:", orderId)
          // Handle success - redirect, show notification, etc.
        }}
        onError={(error) => {
          console.error("Order creation failed:", error)
          // Handle error - show notification, etc.
        }}
      />
    </div>
  )
}
