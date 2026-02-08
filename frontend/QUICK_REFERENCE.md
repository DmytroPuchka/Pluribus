# Forgot Password & Reset Password - Quick Reference

## URLs
- **Forgot Password Page:** `/forgot-password`
- **Reset Password Page:** `/reset-password/[token]` (e.g., `/reset-password/abc123xyz`)

## File Locations
```
src/app/
├── forgot-password/
│   ├── layout.tsx         (SEO metadata)
│   └── page.tsx           (Main form component)
└── reset-password/
    └── [token]/
        ├── layout.tsx     (SEO metadata)
        └── page.tsx       (Reset form component)
```

## Features Implemented

### Forgot Password (/forgot-password)
✓ Email input field with validation
✓ Email format validation (zod)
✓ Loading states on buttons
✓ Success state with email confirmation
✓ Resend email option
✓ Back to login link
✓ Helper links to login/signup
✓ Professional centered layout with gradient
✓ SEO metadata configured
✓ Icons from lucide-react
✓ Error handling and display
✓ React-hook-form integration
✓ Responsive design

### Reset Password (/reset-password/[token])
✓ Token validation on page load
✓ Loading state while validating
✓ Invalid token error state
✓ Password input with visibility toggle
✓ Confirm password field
✓ Password strength requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
✓ Password match validation
✓ Success state with next steps
✓ Back to login link
✓ Contact support link
✓ SEO metadata configured
✓ Icons from lucide-react
✓ Responsive design
✓ React-hook-form integration

## Component Dependencies
- react-hook-form
- @hookform/resolvers
- zod
- lucide-react
- next/link
- next/navigation

## UI Components Used
```typescript
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form'
import { Logo } from '@/components/common/Logo'
```

## Styling
- **Background:** Gradient from blue-50/50 to white
- **Width:** max-w-md (centered)
- **Card:** shadow-lg
- **Success color:** green-600
- **Error color:** destructive
- **Spacing:** gap-6 between form elements
- **Icons:** Lucide icons (Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowLeft)

## API Endpoints to Implement

### Forgot Password
```
POST /api/auth/forgot-password
Body: { email: string }
Response: { success: boolean, message: string }

POST /api/auth/forgot-password/resend
Body: { email: string }
Response: { success: boolean, message: string }
```

### Reset Password
```
GET /api/auth/reset-password/validate-token?token=xyz
Response: { valid: boolean, message?: string }

POST /api/auth/reset-password
Body: { token: string, password: string }
Response: { success: boolean, message: string }
```

## Testing Checklist
- [ ] Navigate to /forgot-password
- [ ] Validation rejects invalid emails
- [ ] Form submits with valid email
- [ ] Success state displays correctly
- [ ] Resend email button works
- [ ] Back to login navigates correctly
- [ ] Navigate to /reset-password/invalid-token
- [ ] Invalid token error displays
- [ ] Navigate to /reset-password/valid-token
- [ ] Password validation enforces all requirements
- [ ] Passwords must match
- [ ] Show/hide password toggles work
- [ ] Form submits successfully
- [ ] Success state displays sign-in link
- [ ] Responsive on mobile (320px+)
- [ ] Links navigate correctly
- [ ] Loading states display during API calls

## Mobile Responsive Features
- Centered layout with max-w-md
- px-4 padding for mobile screens
- All buttons and inputs are full width
- Text sizes are readable on small screens
- Icons scale appropriately
- Gradient background is visible on all sizes

## Accessibility Features
- Proper label associations with inputs
- Form fields have proper ids
- Error messages linked to fields via FormMessage
- Semantic HTML structure
- Icon buttons have proper context
- Loading states clearly indicated
- Success/error states clearly distinguished

## Notes
- Both pages are Client Components ('use client')
- Metadata is set in layout.tsx files
- TODO comments mark API integration points
- Mock API calls simulate 1-2 second delays
- All form validations use zod
- react-hook-form handles form state
- Icons are from lucide-react for consistency
