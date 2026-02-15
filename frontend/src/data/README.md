# Mock Data

This directory contains mock data for testing and development.

## Custom Orders

The `mockCustomOrders.ts` file provides mock data for the Custom Orders system.

### Usage Examples

```typescript
import {
  mockCustomOrders,
  getCustomOrdersByStatus,
  getCustomOrdersByBuyer,
  getCustomOrdersBySeller,
  getCustomOrderById
} from '@/data';

// Get all mock custom orders
const allOrders = mockCustomOrders;

// Get orders by status
const pendingOrders = getCustomOrdersByStatus('PENDING_SELLER_RESPONSE');
const acceptedOrders = getCustomOrdersByStatus('ACCEPTED');

// Get orders by buyer
const buyerOrders = getCustomOrdersByBuyer('buyer-001');

// Get orders by seller
const sellerOrders = getCustomOrdersBySeller('seller-001');

// Get a specific order
const order = getCustomOrderById('co-001');
```

### Available Custom Order Statuses

- `PENDING_SELLER_RESPONSE` - Waiting for seller to respond
- `ACCEPTED` - Seller has accepted the custom order
- `DECLINED` - Seller has declined the custom order
- `CLARIFICATION_NEEDED` - Additional information needed from buyer or seller
- `CONVERTED_TO_ORDER` - Custom order has been converted to a regular order
- `CANCELLED` - Order has been cancelled

### Mock Data Overview

The mock data includes 6 custom orders with varied statuses:

1. **Italian Coffee Beans** (CLARIFICATION_NEEDED) - Coffee import request with ongoing conversation
2. **Custom Gaming PC** (ACCEPTED) - High-end PC build accepted by seller
3. **Wedding Dress** (DECLINED) - Custom dress declined due to seller availability
4. **Birthday Cake** (CLARIFICATION_NEEDED) - Custom cake with design discussion
5. **Vintage Vinyl Records** (PENDING_SELLER_RESPONSE) - New request awaiting response
6. **Corporate Event Photography** (CONVERTED_TO_ORDER) - Successfully converted to order

Each order includes:
- Complete buyer and seller information with profiles
- Detailed product descriptions
- Photo references
- Message history between buyer and seller
- Delivery information and deadlines
- Timestamps and expiration dates
