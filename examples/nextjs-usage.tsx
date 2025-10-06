// Example: Next.js usage with dynamic imports and SSR considerations
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  StripeManagerProvider,
  useStripeManager,
} from 'laravel-stripe-manager-ui';

// Dynamically import components to avoid SSR issues
const PlansList = dynamic(() => import('laravel-stripe-manager-ui').then(mod => ({ default: mod.PlansList })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
});

const UserSubscription = dynamic(() => import('laravel-stripe-manager-ui').then(mod => ({ default: mod.UserSubscription })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-48 rounded-lg"></div>
});

const TrialInfo = dynamic(() => import('laravel-stripe-manager-ui').then(mod => ({ default: mod.TrialInfo })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
});

// Next.js page component
export default function SubscriptionPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <StripeManagerProvider 
      baseUrl={process.env.NEXT_PUBLIC_STRIPE_MANAGER_URL || 'https://yourdomain.com/api/stripe-manager'}
      token={process.env.NEXT_PUBLIC_STRIPE_MANAGER_TOKEN}
    >
      <SubscriptionDashboard />
    </StripeManagerProvider>
  );
}

function SubscriptionDashboard() {
  const { loading, error } = useStripeManager();

  if (loading.plans || loading.subscription) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
          <p className="mt-2 text-gray-600">
            Manage your subscription, payment methods, and billing information.
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <TrialInfo />
          <UserSubscription />
          <PlansList />
        </div>
      </div>
    </div>
  );
}

// Example: Custom hook for Next.js
export function useSubscriptionData() {
  const stripeManager = useStripeManager();

  useEffect(() => {
    // Load data on mount
    stripeManager.getPlans();
    stripeManager.getSubscription();
    stripeManager.getTrialInfo();
  }, []);

  return stripeManager;
}

// Example: Server-side data fetching (if needed)
export async function getServerSideProps(context: any) {
  // You can fetch initial data here if needed
  // But remember that the components will re-fetch on the client side
  return {
    props: {
      // Any server-side props
    },
  };
}
