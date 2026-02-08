# Toast Notification System - Complete Implementation Guide

## Overview

The Pluribus frontend now has a complete, production-ready toast notification system built on **Sonner**, a modern React toast library. This system provides a simple, consistent way to display notifications throughout the application.

## What Has Been Set Up

### 1. Dependencies Installed
- **sonner** (v2.0.7) - Modern toast notification library

Installation command used:
```bash
npm install sonner
```

### 2. Core Files Created/Modified

#### A. `/src/lib/toast.ts` - Utility Functions
**Status**: Created with 8 core functions

Available functions:
```typescript
showSuccess(message, description?)          // Green success notification
showError(message, description?)            // Red error notification
showWarning(message, description?)          // Yellow warning notification
showInfo(message, description?)             // Blue info notification
showLoading(message, description?)          // Spinner loading notification
showWithAction(message, label, fn, desc?)   // Toast with action button
dismissToast(toastId)                       // Dismiss specific toast
dismissAllToasts()                          // Clear all toasts
```

#### B. `/src/app/layout.tsx` - Root Layout Update
**Status**: Updated

Changes made:
- Added import: `import { Toaster } from "sonner";`
- Added component: `<Toaster />` inside the root `<body>`

This enables toast notifications to work on every page of the application.

#### C. `/src/app/demo/toasts/page.tsx` - Demo Page
**Status**: Created and fully functional

Route: `http://localhost:3000/demo/toasts`

Features:
- 6 interactive demo buttons for all toast types
- Real-world usage code examples
- Best practices documentation
- Available functions reference
- Beautiful, responsive design

### 3. Documentation Files

- **TOAST_SETUP.md** - Detailed setup and customization guide
- **TOAST_SYSTEM_SUMMARY.md** - Quick reference summary
- **TOAST_IMPLEMENTATION_GUIDE.md** - This file

## How to Use

### Basic Implementation

#### Step 1: Add 'use client' Directive
```tsx
'use client';
```

#### Step 2: Import Functions
```tsx
import { showSuccess, showError } from '@/lib/toast';
```

#### Step 3: Use in Your Components
```tsx
const handleSave = async () => {
  try {
    await saveData();
    showSuccess('Data saved successfully!');
  } catch (error) {
    showError('Failed to save data', error.message);
  }
};
```

### Common Patterns

#### Form Submission
```tsx
'use client';

import { showSuccess, showError } from '@/lib/toast';
import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: new FormData(e.currentTarget),
      });

      if (!response.ok) throw new Error('Failed to send message');

      showSuccess('Message sent!', 'We will get back to you soon.');
      e.currentTarget.reset();
    } catch (error) {
      showError('Failed to send message', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  );
}
```

#### Async Operation with Loading State
```tsx
'use client';

import { showLoading, showSuccess, showError, dismissAllToasts } from '@/lib/toast';

const handleProcess = async () => {
  showLoading('Processing your request...', 'This may take a few moments.');

  try {
    await heavyOperation();
    dismissAllToasts();
    showSuccess('Operation complete!', 'Your file is ready.');
  } catch (error) {
    dismissAllToasts();
    showError('Operation failed', 'Please try again.');
  }
};
```

#### Undo Action
```tsx
'use client';

import { showWithAction } from '@/lib/toast';

const handleDelete = async (id: string) => {
  const backup = await deleteItem(id); // Optimistic delete

  showWithAction(
    'Item deleted',
    'Undo',
    async () => {
      await restoreItem(id, backup);
      showSuccess('Item restored');
    },
    'You can undo this action for 30 seconds.'
  );
};
```

## File Structure

```
/Users/dmitrijpucka/Documents/ClaudeCode projects/Pluribus/frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx                          (MODIFIED - Toaster added)
│   │   └── demo/
│   │       └── toasts/
│   │           └── page.tsx                    (NEW - Demo page)
│   └── lib/
│       └── toast.ts                            (NEW - Utilities)
├── TOAST_SETUP.md                             (NEW - Setup guide)
├── TOAST_SYSTEM_SUMMARY.md                    (NEW - Summary)
├── TOAST_IMPLEMENTATION_GUIDE.md              (NEW - This file)
└── package.json                                (MODIFIED - sonner added)
```

## Testing the Setup

### Method 1: Visit Demo Page
1. Run dev server: `npm run dev`
2. Navigate to: `http://localhost:3000/demo/toasts`
3. Click buttons to see all toast types

### Method 2: Manual Testing
1. Create a test component with `'use client'` directive
2. Import toast function
3. Trigger action to show toast
4. Verify notification appears

## Advanced Usage

### Custom Toast with Multiple Options
```tsx
import { toast } from 'sonner';

toast.custom((t) => (
  <div className="bg-white p-4 rounded shadow">
    <p>Custom toast content</p>
    <button onClick={() => toast.dismiss(t)}>Close</button>
  </div>
));
```

### Toast Position Customization
Edit `<Toaster />` component in `/src/app/layout.tsx`:
```tsx
<Toaster 
  position="top-right"        // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  richColors                  // Enhanced colors
  closeButton                 // Show close button
  theme="light"               // light, dark, system
  expand={true}              // Expand on hover
/>
```

### Styling and Theming
Sonner comes with built-in styling. To customize:
1. Override styles in `globals.css`
2. Use Tailwind CSS classes
3. Reference Sonner documentation for advanced styling

## Best Practices

1. **Keep Messages Short**
   - Good: "Changes saved!"
   - Bad: "Your changes have been automatically saved to the database"

2. **Use Appropriate Toast Types**
   - Success: Positive confirmations, operations completed
   - Error: Failed operations, validation errors
   - Warning: Important cautions, confirmations needed
   - Info: General information, tips
   - Loading: During async operations

3. **Always Provide Context**
   - Use description for complex messages
   - Add action buttons for undo/retry

4. **Avoid Toast Spam**
   - Don't show multiple identical toasts
   - Queue long operations
   - Dismiss old toasts before showing new ones

5. **Accessibility**
   - Keep messages descriptive
   - Use clear, simple language
   - Test with screen readers

## Troubleshooting

### Toasts Not Appearing
1. Check `<Toaster />` is in `/src/app/layout.tsx`
2. Verify component has `'use client'` directive
3. Check browser console for errors
4. Ensure Sonner is installed: `npm list sonner`

### Styling Issues
1. Check Tailwind CSS is configured
2. Verify `globals.css` is imported
3. Try clearing Next.js cache: `rm -rf .next && npm run dev`

### TypeScript Errors
1. Verify all imports are correct
2. Check tsconfig.json has proper paths
3. Rebuild: `npm run build`

## Performance Considerations

- Toast functions are lightweight
- No performance impact on page load
- Automatic garbage collection of dismissed toasts
- Safe to use frequently in event handlers

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Fully supported

## Next Steps

1. **Start Using**: Import and use in your components
2. **Customize**: Adjust Toaster props if needed
3. **Test**: Visit demo page or create test component
4. **Integrate**: Add to all forms and async operations
5. **Monitor**: Check user feedback and adjust messaging

## Quick Reference

```tsx
// Import
import { showSuccess, showError, showWarning, showInfo, showWithAction } from '@/lib/toast';

// Usage
showSuccess('Success message');
showError('Error message', 'Optional description');
showWarning('Warning message');
showInfo('Info message');
showWithAction('Message', 'Button Label', () => handleAction());

// Dismiss
import { dismissToast, dismissAllToasts } from '@/lib/toast';
dismissAllToasts();
```

## Support & Documentation

- **Sonner Official Docs**: https://sonner.emilkowal.ski/
- **Demo Page**: http://localhost:3000/demo/toasts
- **Implementation Guide**: This file
- **Setup Guide**: TOAST_SETUP.md

---

**Status**: Ready for production use
**Last Updated**: February 8, 2026
**Version**: 1.0
