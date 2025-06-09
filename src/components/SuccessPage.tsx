import React, { useEffect } from 'react';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useSubscription } from '../hooks/useSubscription';

interface SuccessPageProps {
  onBackToApp: () => void;
}

export function SuccessPage({ onBackToApp }: SuccessPageProps) {
  const { refetch } = useSubscription();

  useEffect(() => {
    // Refetch subscription data after successful payment
    const timer = setTimeout(() => {
      refetch();
    }, 2000);

    return () => clearTimeout(timer);
  }, [refetch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. Your subscription has been activated and you can now enjoy all the premium features.
          </p>
          
          <button
            onClick={onBackToApp}
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to App
          </button>
        </div>
      </div>
    </div>
  );
}