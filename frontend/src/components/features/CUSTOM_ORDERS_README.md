# Custom Order Components

This directory contains components for displaying and managing custom orders in the Pluribus marketplace.

## Components

### 1. CustomOrderCard

**Location**: `/components/features/CustomOrderCard.tsx`

A compact card view component for displaying custom orders in lists and grids.

#### Features
- Displays order title, description preview, and primary image
- Shows status badge with appropriate styling
- Displays max price and delivery deadline
- Shows buyer/seller information with avatar
- Action buttons for sellers (Accept, Decline, Clarify)
- Click handler for navigation to detail view
- Responsive design for mobile and desktop
- Role-based rendering (buyer vs seller view)

#### Props
```typescript
interface CustomOrderCardProps {
  order: CustomOrder;                    // The custom order to display
  userRole: UserRole;                    // Current user's role
  className?: string;                    // Additional CSS classes
  onClick?: () => void;                  // Click handler for card
  onAccept?: (orderId: string) => void;  // Accept order handler (seller)
  onDecline?: (orderId: string) => void; // Decline order handler (seller)
  onClarify?: (orderId: string) => void; // Clarify order handler (seller)
}
```

#### Usage Example
```tsx
import { CustomOrderCard } from '@/components/features/CustomOrderCard';

<CustomOrderCard
  order={customOrder}
  userRole="SELLER"
  onClick={() => navigate(`/orders/${order.id}`)}
  onAccept={handleAccept}
  onDecline={handleDecline}
  onClarify={handleClarify}
/>
```

See `CustomOrderCard.usage.example.tsx` for more examples.

---

### 2. CustomOrderDetails

**Location**: `/components/features/CustomOrderDetails.tsx`

A comprehensive detailed view component for displaying all custom order information.

#### Features
- Full photo gallery with navigation and thumbnails
- Complete order description and information
- Real-time messaging/chat interface
- Status history timeline
- Role-based action buttons
- Buyer and seller information panels
- Responsive layout with sidebar
- Message input with send functionality

#### Props
```typescript
interface CustomOrderDetailsProps {
  order: CustomOrder;                           // The custom order to display
  userRole: UserRole;                           // Current user's role
  className?: string;                           // Additional CSS classes
  messages?: Message[];                         // Array of messages
  statusHistory?: StatusChange[];               // Array of status changes
  onAccept?: (orderId: string) => void;         // Accept order handler
  onDecline?: (orderId: string, reason?: string) => void; // Decline handler
  onComplete?: (orderId: string) => void;       // Complete order handler
  onCancel?: (orderId: string, reason?: string) => void;  // Cancel handler
  onSendMessage?: (orderId: string, message: string) => void; // Send message
}
```

#### Usage Example
```tsx
import { CustomOrderDetails } from '@/components/features/CustomOrderDetails';

<CustomOrderDetails
  order={customOrder}
  userRole="SELLER"
  messages={messages}
  statusHistory={statusHistory}
  onAccept={handleAccept}
  onDecline={handleDecline}
  onSendMessage={handleSendMessage}
/>
```

See `CustomOrderDetails.usage.example.tsx` for more examples.

---

## Types

Both components use the following types from `/types/index.ts`:

```typescript
// Custom Order Status
type CustomOrderStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'COMPLETED' | 'CANCELLED';

// Custom Order Interface
interface CustomOrder {
  id: string;
  buyerId: string;
  buyer?: User;
  sellerId?: string;
  seller?: User;
  title: string;
  description: string;
  photos: string[];
  maxPrice?: number;
  currency: string;
  deliveryDeadline?: Date;
  isAsap: boolean;
  status: CustomOrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

// User Role
type UserRole = 'BUYER' | 'SELLER' | 'BOTH';
```

## Design Patterns

Both components follow the established patterns in the Pluribus codebase:

1. **TypeScript**: Fully typed with interfaces and type safety
2. **Client Components**: Use `'use client'` directive for Next.js
3. **UI Components**: Leverage existing UI components from `/components/ui/`
4. **Styling**: Use Tailwind CSS with `cn()` utility for class merging
5. **Icons**: Use `lucide-react` icon library
6. **Responsive**: Mobile-first responsive design
7. **Accessibility**: Semantic HTML and ARIA attributes where needed

## Dependencies

These components depend on:

- Next.js (Image component)
- React
- lucide-react (icons)
- Existing UI components:
  - Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter
  - Button
  - Badge
  - Avatar, AvatarImage, AvatarFallback
  - Textarea
- Utility functions:
  - `cn()` - Class name merging
  - `formatDate()` - Date formatting
  - `formatRelativeTime()` - Relative time formatting
  - `formatPrice()` - Currency formatting
  - `getInitials()` - Generate user initials

## Status Badge Styling

Both components include consistent status badge styling:

- **PENDING**: Secondary variant (amber/yellow)
- **ACCEPTED**: Default variant (primary/blue)
- **COMPLETED**: Default variant (primary/blue)
- **DECLINED**: Destructive variant (red)
- **CANCELLED**: Destructive variant (red)

## Role-Based Features

### Seller View (SELLER or BOTH roles)
- Accept/Decline/Clarify buttons (for PENDING orders)
- Mark as Completed button (for ACCEPTED orders)
- View buyer information
- Send messages

### Buyer View (BUYER or BOTH roles)
- Cancel button (for PENDING orders)
- View seller information
- Send messages
- Track order status

## Future Enhancements

Potential improvements for these components:

1. **File Upload**: Add ability to upload additional photos in chat
2. **Notifications**: Real-time notification badges for new messages
3. **Rich Text**: Support for formatted messages (markdown)
4. **Image Zoom**: Click to zoom/lightbox for gallery images
5. **Price Negotiation**: UI for counter-offers
6. **Delivery Tracking**: Integration with shipping providers
7. **Review System**: Add review prompt on completion
8. **Print/Export**: Export order details as PDF

## Testing

To test these components:

1. Create test data matching the `CustomOrder` interface
2. Test with different user roles (BUYER, SELLER, BOTH)
3. Test all order statuses (PENDING, ACCEPTED, etc.)
4. Test responsive behavior on mobile, tablet, desktop
5. Test action handlers (accept, decline, message sending)
6. Test edge cases (no photos, no deadline, no messages)

## Support

For questions or issues with these components, please contact the development team or create an issue in the project repository.
