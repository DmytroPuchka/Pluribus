# Pluribus Admin Panel

Admin panel for managing the Pluribus International Shipping Platform.

## Features

- **Dashboard**: Platform statistics and overview
  - Total users (buyers/sellers)
  - Product listings (active/total)
  - Order metrics and revenue
  - Review statistics
  - Real-time completion rates

- **Users Management**:
  - View all platform users
  - Filter by role (Buyer/Seller) and status
  - Search by email or username
  - Activate/deactivate user accounts
  - Delete users
  - View user ratings and reviews

- **Products Management**:
  - View all product listings
  - Filter by category and status
  - Search by title or description
  - Activate/deactivate products
  - Delete products
  - View product details and seller info

## Tech Stack

- **Next.js 15.1.6** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **Lucide React** - Icons
- **Recharts** - Data visualization (future charts)

## Prerequisites

- Node.js 20+ installed
- Backend API running on port 5001
- PostgreSQL database configured

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Configure environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

## Running the Application

### Development Mode
```bash
npm run dev
```
Admin panel will be available at `http://localhost:3001`

### Production Build
```bash
npm run build
npm start
```

## Authentication

The admin panel uses JWT-based authentication with:
- Access tokens (15 minutes)
- Refresh tokens (7 days)
- Automatic token refresh on 401 errors

**Access Requirements**:
- Only users with `ADMIN` role can access the admin panel
- Login credentials are validated against the backend API
- Regular buyers and sellers CANNOT access the admin panel

## Project Structure

```
admin-frontend/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Dashboard page
│   │   ├── users/             # Users management
│   │   ├── products/          # Products management
│   │   ├── login/             # Login page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   └── layout/
│   │       └── DashboardLayout.tsx  # Authenticated layout
│   ├── contexts/
│   │   └── AuthContext.tsx    # Authentication context
│   └── lib/
│       └── api/               # API services
│           ├── client.ts      # Axios client with interceptors
│           ├── auth.ts        # Authentication service
│           ├── admin.ts       # Admin service (stats, users, products)
│           ├── types.ts       # TypeScript types
│           └── index.ts       # Exports
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## API Endpoints Used

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Admin Operations
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - List users (with filters)
- `PATCH /api/admin/users/:id/status` - Toggle user status
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/products` - List products (with filters)
- `PATCH /api/admin/products/:id/status` - Toggle product status
- `DELETE /api/admin/products/:id` - Delete product

## Key Features

### Token Management
- Tokens stored in localStorage with `admin_` prefix
- Automatic token refresh on 401 errors
- Logout redirects to login page

### Protected Routes
- All pages except `/login` require authentication
- Automatic redirect to login if not authenticated
- Role-based access (SELLER only)

### Real-time Updates
- Statistics update on page load
- User/product lists refresh after actions
- Toast notifications for all operations

## Development

### Adding New Pages
1. Create page in `src/app/[route]/page.tsx`
2. Wrap with `DashboardLayout` component
3. Add navigation link in `DashboardLayout.tsx`

### Adding New API Calls
1. Add types to `src/lib/api/types.ts`
2. Add methods to appropriate service (`admin.ts`, `auth.ts`)
3. Export from `src/lib/api/index.ts`

## Troubleshooting

### "Failed to load statistics"
- Check if backend API is running on port 5001
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check network tab for API errors

### "Access denied. Administrator role required"
- Ensure user has `ADMIN` role in database
- Regular buyers and sellers cannot access admin panel
- Use admin@pluribus.com account for testing

### Token Refresh Issues
- Clear localStorage: `localStorage.clear()`
- Re-login to get fresh tokens

## Security Notes

- Never commit `.env.local` to git
- Admin endpoints require authentication
- Only ADMIN role users can access admin panel (not sellers or buyers)
- Tokens are automatically refreshed before expiry
- All destructive actions require confirmation

## Test Account

For testing the admin panel, use:
```
Email:    admin@pluribus.com
Password: password123
Role:     ADMIN
```

This account was created via the seed script (`npm run prisma:seed` in backend)

## Future Enhancements

- [ ] Order management dashboard
- [ ] Custom orders review
- [ ] Revenue charts and analytics
- [ ] Export data to CSV
- [ ] Email notifications
- [ ] Bulk user/product operations
- [ ] Activity logs and audit trail

## License

This is part of the Pluribus International Shipping Platform.
