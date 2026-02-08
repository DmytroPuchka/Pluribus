/**
 * Toast Notification Utility Functions
 *
 * This module provides convenient utility functions for displaying toast notifications
 * throughout the application using the Sonner library.
 *
 * Usage Examples:
 *
 * ```tsx
 * import { showSuccess, showError, showWarning, showInfo } from '@/lib/toast';
 *
 * // Simple notifications
 * showSuccess('Operation completed successfully!');
 * showError('An error occurred while processing your request.');
 * showWarning('Please review the changes before proceeding.');
 * showInfo('New updates are available.');
 *
 * // With custom descriptions
 * showSuccess('Item added to cart', 'The product has been added to your shopping cart.');
 * showError('Payment failed', 'Your credit card was declined. Please try another payment method.');
 * ```
 *
 * These functions automatically handle styling and positioning of toast notifications.
 * The Toaster component must be added to the root layout for this to work.
 */

import { toast } from 'sonner';

/**
 * Display a success toast notification
 * @param message - The main message to display
 * @param description - Optional detailed description
 */
export const showSuccess = (message: string, description?: string) => {
  toast.success(message, {
    description,
  });
};

/**
 * Display an error toast notification
 * @param message - The main message to display
 * @param description - Optional detailed description
 */
export const showError = (message: string, description?: string) => {
  toast.error(message, {
    description,
  });
};

/**
 * Display a warning toast notification
 * @param message - The main message to display
 * @param description - Optional detailed description
 */
export const showWarning = (message: string, description?: string) => {
  toast.warning(message, {
    description,
  });
};

/**
 * Display an info toast notification
 * @param message - The main message to display
 * @param description - Optional detailed description
 */
export const showInfo = (message: string, description?: string) => {
  toast.info(message, {
    description,
  });
};

/**
 * Display a loading toast notification
 * @param message - The main message to display
 * @param description - Optional detailed description
 * @returns Promise that resolves to the toast ID
 */
export const showLoading = (message: string, description?: string) => {
  return toast.loading(message, {
    description,
  });
};

/**
 * Display a custom toast notification with action button
 * @param message - The main message to display
 * @param actionLabel - Label for the action button
 * @param onAction - Callback function when action button is clicked
 * @param description - Optional detailed description
 */
export const showWithAction = (
  message: string,
  actionLabel: string,
  onAction: () => void,
  description?: string
) => {
  toast(message, {
    description,
    action: {
      label: actionLabel,
      onClick: onAction,
    },
  });
};

/**
 * Dismiss a specific toast by ID
 * @param toastId - The ID returned from any toast function
 */
export const dismissToast = (toastId: string | number) => {
  toast.dismiss(toastId);
};

/**
 * Dismiss all active toasts
 */
export const dismissAllToasts = () => {
  toast.dismiss();
};
