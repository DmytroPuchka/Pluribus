# Testing User Roles - Quick Guide

## Overview
This document explains how to test the UI with 3 different user roles using the mock authentication system.

## Test Accounts

### 1. 👤 Buyer Only (Anna Buyer)
**Email**: `buyer@test.com`
**Password**: `test123`
**Role**: BUYER
**Location**: Kyiv, Ukraine

**Expected Features:**
- Can browse products
- Can filter by delivery country
- Can view seller profiles
- Can create custom orders
- **Cannot** access seller-specific features
- **Cannot** see delivery countries field in registration

---

### 2. 🏪 Seller Only (John Seller)
**Email**: `seller@test.com`
**Password**: `test123`
**Role**: SELLER
**Location**: New York, United States
**Delivery Countries**: United States, Canada, Mexico, United Kingdom, Germany, France, Ukraine

**Expected Features:**
- Has seller profile with delivery countries displayed
- Products filtered by their delivery capabilities
- **Must** select delivery countries during registration
- Access to seller dashboard
- Can manage products
- Can view/manage orders

---

### 3. 🔄 Both Buyer & Seller (Maria Martinez)
**Email**: `both@test.com`
**Password**: `test123`
**Role**: BOTH
**Location**: Barcelona, Spain
**Delivery Countries**: Spain, Portugal, France, Italy, Germany, Netherlands, Belgium, United Kingdom, Ukraine

**Expected Features:**
- **All buyer features** available
- **All seller features** available
- Can switch between buyer and seller modes
- Has seller profile with delivery countries
- **Must** select delivery countries during registration
- Full dashboard access

---

## How to Test

### Method 1: Quick Login (Recommended)
1. Navigate to `/login`
2. Scroll down to "Test Accounts" section
3. Click on any of the 3 test account buttons
4. You'll be automatically logged in and redirected to dashboard

### Method 2: Manual Login
1. Navigate to `/login`
2. Enter email and password from above
3. Click "Sign In"
4. You'll be redirected to dashboard

### Method 3: Check Current User
- Look at the header (top right)
- You'll see the user's avatar, name, email, and role badge
- Click on avatar to see dropdown menu with:
  - User name and email
  - Role badge (BUYER, SELLER, or BOTH)
  - Dashboard link
  - Profile link
  - Orders link
  - Logout button

---

## Testing Checklist

### ✅ General UI Testing

- [ ] **Header Updates**:
  - [ ] Avatar displays correctly
  - [ ] User name shows in dropdown
  - [ ] Role badge displays correct role
  - [ ] Logout works and redirects to home

- [ ] **Login Page**:
  - [ ] Quick login buttons work
  - [ ] Manual login works
  - [ ] Invalid credentials show error
  - [ ] Successful login shows toast message
  - [ ] Redirects to dashboard after login

- [ ] **Navigation**:
  - [ ] Dashboard link visible when logged in
  - [ ] Products page accessible
  - [ ] Sellers page accessible
  - [ ] Can navigate between pages while logged in

---

### ✅ Buyer Role Testing (Anna Buyer)

Login as: `buyer@test.com` / `test123`

**Check these features:**
- [ ] Can view products catalog
- [ ] Can filter products by "Delivery Country"
- [ ] Can view seller profiles
- [ ] Can see seller's delivery countries on:
  - [ ] Seller profile page
  - [ ] Product detail page (in seller info)
- [ ] Can create custom orders (no delivery countries field required)
- [ ] Dashboard shows buyer-related features only
- [ ] Registration form **does not** show delivery countries field for buyer role

---

### ✅ Seller Role Testing (John Seller)

Login as: `seller@test.com` / `test123`

**Check these features:**
- [ ] Seller profile displays delivery countries:
  - [ ] "Цей продавець може здійснювати доставку до наступних країн"
  - [ ] 7 countries shown: US, Canada, Mexico, UK, Germany, France, Ukraine
- [ ] Products show delivery information
- [ ] Dashboard has seller-specific options
- [ ] Can manage products
- [ ] Registration form **shows** delivery countries field for seller role
- [ ] Delivery countries field is **required** for sellers

**Test Seller Profile:**
1. Navigate to `/sellers/seller-1`
2. Verify "Delivery Countries" section is visible
3. Check that countries are displayed as badges
4. Verify globe icon appears

---

### ✅ Both Role Testing (Maria Martinez)

Login as: `both@test.com` / `test123`

**Check these features:**
- [ ] Has all buyer capabilities
- [ ] Has all seller capabilities
- [ ] Seller profile shows delivery countries:
  - [ ] 9 countries: Spain, Portugal, France, Italy, Germany, Netherlands, Belgium, UK, Ukraine
- [ ] Dashboard shows both buyer and seller sections
- [ ] Can create and manage products
- [ ] Can browse and purchase
- [ ] Registration form **shows** delivery countries field for "both" role
- [ ] Delivery countries field is **required**

---

### ✅ Product Filters Testing

**Test filtering by delivery country:**
1. Go to `/products`
2. Open filters panel
3. Find "Delivery Country" filter (below "Seller Country")
4. Select a country (e.g., "Ukraine")
5. Verify only products from sellers who deliver to Ukraine are shown
6. Check active filter badge shows "Доставка до: Ukraine"
7. Click X on badge to clear filter

**Test combined filters:**
1. Set "Seller Country" to "Spain"
2. Set "Delivery Country" to "Ukraine"
3. Should show only products from Spanish sellers who deliver to Ukraine (Maria Martinez)

---

### ✅ Registration Testing

**Test as Buyer:**
1. Go to `/register`
2. Select role: "Buyer"
3. Verify delivery countries field **does not appear**
4. Complete registration

**Test as Seller:**
1. Go to `/register`
2. Select role: "Seller"
3. Verify delivery countries field **appears** below role field
4. Try to submit without selecting countries → should show error
5. Select at least one country
6. Complete registration

**Test as Both:**
1. Go to `/register`
2. Select role: "Both Buyer & Seller"
3. Verify delivery countries field **appears**
4. Required to select at least one country
5. Complete registration

---

## UI Elements to Verify

### Header (Top Navigation)
**Logged Out:**
- Login button
- Sign Up button

**Logged In:**
- User avatar (circular)
- Dropdown menu with:
  - Name: User's full name
  - Email: user@test.com
  - Role badge: BUYER | SELLER | BOTH
  - Dashboard link
  - Profile link
  - Orders link
  - Logout button (red color)

### Seller Profile Page
**Delivery Countries Section:**
- Title: "Цей продавець може здійснювати доставку до наступних країн"
- Globe icon (🌍)
- Countries as rounded badges
- Primary color styling
- Located between "About" and "Products" sections

### Product Detail Page
**Seller Info Card:**
- Seller name and rating
- Verification badges
- **New**: Delivery Countries section
  - Title: "Країни доставки"
  - Globe icon
  - Countries as compact badges
  - Border-top separator

### Product Filters
**Filters Panel:**
- "Seller Country" (З якої країни)
- **New**: "Delivery Country" (Країна доставки)
- Dropdown with all available delivery countries
- Active filter badges
- Clear all filters button

---

## Known Behavior

### ✅ Expected Behavior:
- User data persists in `localStorage` (stays logged in after refresh)
- Logout clears `localStorage` and redirects to home
- Login redirects to `/dashboard`
- Invalid credentials show error toast
- Role badge updates in real-time
- Delivery countries only visible for SELLER and BOTH roles

### ⚠️ Current Limitations:
- No real backend (mock data only)
- No actual registration (uses test accounts)
- No password validation on backend
- Dashboard pages are basic (not fully implemented)

---

## Troubleshooting

### Issue: Not logged in after refresh
**Solution:** Clear browser cache and localStorage, then login again

### Issue: Delivery countries not showing
**Check:**
- User role is SELLER or BOTH
- Mock data has `deliveryCountries` array
- Not logged in as BUYER

### Issue: Can't login
**Check:**
- Using exact email and password from test accounts
- Email format is correct
- Password is exactly "test123"

### Issue: UI not updating
**Solution:** Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

---

## Developer Notes

### Files Modified:
1. `/src/data/mockUsers.ts` - Test account data
2. `/src/contexts/AuthContext.tsx` - Authentication logic
3. `/src/app/layout.tsx` - AuthProvider wrapper
4. `/src/app/login/page.tsx` - Login logic + quick login buttons
5. `/src/components/layout/Header/index.tsx` - User info display
6. `/src/app/register/page.tsx` - Conditional delivery countries field
7. `/src/types/index.ts` - User.deliveryCountries field
8. `/messages/en.json` & `/messages/uk.json` - Translations

### Mock Data Location:
- **Users**: `/src/data/mockUsers.ts`
- **TEST_ACCOUNTS**: Email, password, role info
- **MOCK_USERS**: Full user objects

### Auth State:
- **Context**: `/src/contexts/AuthContext.tsx`
- **Hook**: `useAuth()`
- **Storage**: `localStorage.getItem('pluribus_auth_user')`

---

## Next Steps

After testing all roles:
1. ✅ Verify all UI elements display correctly
2. ✅ Confirm role-based features work
3. ✅ Test filters with different roles
4. ✅ Test registration flow for each role
5. 🚀 Ready to implement real backend API

---

**Testing Complete?**
Report any issues or unexpected behavior for immediate fix!

**Date**: February 15, 2026
**Version**: 1.0.0
