'use client';

import { Button } from '@/components/ui/button';
import {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showLoading,
  showWithAction,
  dismissAllToasts,
} from '@/lib/toast';
import { useState } from 'react';

export default function ToastDemoPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccessToast = () => {
    showSuccess('Operation completed!', 'Your changes have been saved successfully.');
  };

  const handleErrorToast = () => {
    showError('Something went wrong', 'Please try again or contact support if the problem persists.');
  };

  const handleWarningToast = () => {
    showWarning('Warning', 'Please review this action before proceeding.');
  };

  const handleInfoToast = () => {
    showInfo('Information', 'This is an informational message for you.');
  };

  const handleLoadingToast = () => {
    setIsLoading(true);
    const toastId = showLoading('Processing...', 'Please wait while we process your request.');

    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false);
      // In a real scenario, you would dismiss this and show success/error
      dismissAllToasts();
      showSuccess('Complete!', 'The operation finished successfully.');
    }, 3000);
  };

  const handleActionToast = () => {
    showWithAction(
      'Undo operation?',
      'Undo',
      () => {
        showInfo('Action undone', 'The previous action has been reverted.');
      },
      'You can undo this action for 5 seconds.'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Toast Notifications</h1>
          <p className="text-gray-600 mb-8">
            Demonstration of the toast notification system. Click any button to see how each toast type works.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Success Toast */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Success Toast</h2>
              <Button
                onClick={handleSuccessToast}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Show Success
              </Button>
              <p className="text-sm text-gray-600">
                Used to confirm successful operations or positive outcomes.
              </p>
            </div>

            {/* Error Toast */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Error Toast</h2>
              <Button
                onClick={handleErrorToast}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Show Error
              </Button>
              <p className="text-sm text-gray-600">
                Displays error messages or failed operations to the user.
              </p>
            </div>

            {/* Warning Toast */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Warning Toast</h2>
              <Button
                onClick={handleWarningToast}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Show Warning
              </Button>
              <p className="text-sm text-gray-600">
                Alert users about potential issues or important notices.
              </p>
            </div>

            {/* Info Toast */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Info Toast</h2>
              <Button
                onClick={handleInfoToast}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Show Info
              </Button>
              <p className="text-sm text-gray-600">
                Display general informational messages to users.
              </p>
            </div>

            {/* Loading Toast */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Loading Toast</h2>
              <Button
                onClick={handleLoadingToast}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Show Loading'}
              </Button>
              <p className="text-sm text-gray-600">
                Show loading state during async operations (auto-dismisses after 3s).
              </p>
            </div>

            {/* Custom Action Toast */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-lg font-semibold text-gray-900">Custom Action Toast</h2>
              <Button
                onClick={handleActionToast}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Show with Action
              </Button>
              <p className="text-sm text-gray-600">
                Toast with custom action button for undo/retry operations.
              </p>
            </div>
          </div>

          {/* Usage Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Usage in Your Components</h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Import the utilities:</h3>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`import { showSuccess, showError, showWarning, showInfo } from '@/lib/toast';`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Use in event handlers:</h3>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`const handleSubmit = async () => {
  try {
    const response = await submitForm(data);
    showSuccess('Form submitted!', 'Your data has been saved.');
  } catch (error) {
    showError('Submission failed', error.message);
  }
};`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">With custom actions:</h3>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto text-sm">
{`showWithAction(
  'Item deleted',
  'Undo',
  () => restoreItem(),
  'You can undo this action for 30 seconds.'
);`}
                </pre>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Available Functions</h3>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• showSuccess(message, description?)</li>
                <li>• showError(message, description?)</li>
                <li>• showWarning(message, description?)</li>
                <li>• showInfo(message, description?)</li>
                <li>• showLoading(message, description?)</li>
                <li>• showWithAction(message, label, onAction, description?)</li>
                <li>• dismissToast(toastId)</li>
                <li>• dismissAllToasts()</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Best Practices</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use success for confirmations</li>
                <li>• Use error for failures</li>
                <li>• Keep messages concise</li>
                <li>• Add descriptions for context</li>
                <li>• Use loading for async operations</li>
                <li>• Provide action buttons for undo</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> The Toaster component is already added to the root layout at{' '}
              <code className="bg-white px-2 py-1 rounded">/src/app/layout.tsx</code>. This means toast
              notifications will work on any page in your application without additional setup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
