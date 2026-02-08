# Toast Notification System Setup

This document describes the Toast notification system setup for Pluribus frontend.

## Installation Status

The toast notification system has been successfully set up using the **Sonner** library.

### Installed Dependencies
- `sonner`: ^2.0.7 - A modern toast/notification library for React

## Files Created

### 1. `/src/lib/toast.ts`
Utility functions for displaying toast notifications throughout the application.

**Available Functions:**
- `showSuccess(message, description?)` - Display success notification
- `showError(message, description?)` - Display error notification
- `showWarning(message, description?)` - Display warning notification
- `showInfo(message, description?)` - Display info notification
- `showLoading(message, description?)` - Display loading notification
- `showWithAction(message, actionLabel, onAction, description?)` - Toast with action button
- `dismissToast(toastId)` - Dismiss a specific toast
- `dismissAllToasts()` - Dismiss all active toasts

### 2. `/src/app/layout.tsx`
Updated root layout to include the `<Toaster />` component, which enables toast notifications globally.

### 3. `/src/app/demo/toasts/page.tsx`
Interactive demo page showcasing all toast notification types and usage examples.

## Quick Start Guide

### Basic Usage

```tsx
import { showSuccess, showError, showWarning, showInfo } from '@/lib/toast';

// Show success notification
showSuccess('Operation completed!');

// Show error with description
showError('Something went wrong', 'Please try again later.');

// Show warning
showWarning('Are you sure about this action?');

// Show info
showInfo('New features available', 'Check out our latest updates.');
```

### In Form Submissions

```tsx
'use client';

import { useState } from 'react';
import { showSuccess, showError } from '@/lib/toast';

export default function MyForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: new FormData(e.currentTarget),
      });

      if (!response.ok) throw new Error('Submission failed');

      showSuccess('Form submitted successfully!');
      e.currentTarget.reset();
    } catch (error) {
      showError('Submission failed', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

### With Action Button

```tsx
import { showWithAction } from '@/lib/toast';

const handleDelete = async (itemId: string) => {
  try {
    // Optimistic delete
    await deleteItem(itemId);

    showWithAction(
      'Item deleted',
      'Undo',
      () => {
        // Restore the item
        restoreItem(itemId);
      },
      'This action can be undone for 30 seconds.'
    );
  } catch (error) {
    showError('Failed to delete item');
  }
};
```

### With Loading State

```tsx
import { showLoading, showSuccess, showError, dismissAllToasts } from '@/lib/toast';

const handleLongOperation = async () => {
  const toastId = showLoading('Processing...', 'Please wait while we process your request.');

  try {
    const result = await performLongOperation();
    dismissAllToasts();
    showSuccess('Operation complete!', 'Your request has been processed successfully.');
  } catch (error) {
    dismissAllToasts();
    showError('Operation failed', 'An error occurred during processing.');
  }
};
```

## View Demo

To see all toast notification types in action, navigate to:
```
http://localhost:3000/demo/toasts
```

This page demonstrates:
- Success toasts
- Error toasts
- Warning toasts
- Info toasts
- Loading toasts
- Toasts with action buttons

## Best Practices

1. **Keep Messages Concise**: Toast messages should be brief and clear
2. **Use Appropriate Types**: 
   - Success for positive confirmations
   - Error for failures
   - Warning for potential issues
   - Info for general information
3. **Add Descriptions**: Provide additional context in the description parameter when needed
4. **Action Buttons**: Use action buttons for undo/retry operations, not for primary actions
5. **Loading States**: Show loading toasts during async operations, then replace with success/error
6. **Avoid Spam**: Don't show multiple toasts simultaneously unless necessary

## Customization

The Sonner library can be customized further if needed. Edit `/src/app/layout.tsx` to modify the `<Toaster />` props:

```tsx
<Toaster
  position="top-right"        // Position: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  richColors                  // Use richer colors
  closeButton                 // Show close button on toasts
  theme="light"               // Theme: light, dark, system
  expand={true}              // Expand toast area on hover
/>
```

## Documentation

For more information about Sonner, visit: https://sonner.emilkowal.ski/

## Support

If you encounter any issues with the toast system:
1. Check that the `<Toaster />` component is in the root layout
2. Ensure you're using the utility functions from `@/lib/toast`
3. Make sure you're importing the functions correctly in your component
4. Check browser console for any error messages
