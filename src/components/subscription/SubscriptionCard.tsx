import React, { useState } from 'react';
import { Crown, CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { useAuth } from '../../hooks/useAuth';
import { STRIPE_PRODUCTS } from '../../stripe-config';

export function SubscriptionCard() {
  const { subscription, loading } = useSubscription();
  const { user } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string, mode: 'payment' | 'subscription') => {
    if (!user) return;

    setCheckoutLoading(true);
    setError(null);

    try {
      const { data: session } = await user.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/`,
          mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20';
      case 'trialing':
        return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20';
      case 'past_due':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20';
      case 'canceled':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20';
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  const hasActiveSubscription = subscription && ['active', 'trialing'].includes(subscription.subscription_status);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Crown className="text-primary-600 dark:text-primary-500 mr-2" size={24} />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Subscription</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center">
          <AlertCircle className="text-red-600 dark:text-red-400 mr-2" size={16} />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {hasActiveSubscription ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Plan:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {subscription.product_name || 'Unknown Plan'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Status:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.subscription_status)}`}>
              {subscription.subscription_status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          {subscription.current_period_end && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Next billing:</span>
              <div className="flex items-center text-gray-900 dark:text-white">
                <Calendar size={16} className="mr-1" />
                <span>{formatDate(subscription.current_period_end)}</span>
              </div>
            </div>
          )}

          {subscription.payment_method_last4 && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Payment method:</span>
              <div className="flex items-center text-gray-900 dark:text-white">
                <CreditCard size={16} className="mr-1" />
                <span>
                  {subscription.payment_method_brand?.toUpperCase()} ****{subscription.payment_method_last4}
                </span>
              </div>
            </div>
          )}

          {subscription.cancel_at_period_end && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Your subscription will be canceled at the end of the current billing period.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            You don't have an active subscription. Choose a plan to get started.
          </p>

          <div className="space-y-3">
            {STRIPE_PRODUCTS.map((product) => (
              <div key={product.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{product.name}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.mode === 'subscription' ? 'Monthly' : 'One-time'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{product.description}</p>
                <button
                  onClick={() => handleSubscribe(product.priceId, product.mode)}
                  disabled={checkoutLoading}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {checkoutLoading ? 'Loading...' : `Subscribe to ${product.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}