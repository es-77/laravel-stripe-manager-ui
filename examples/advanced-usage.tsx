import React, { useState, useEffect } from 'react';
import {
  StripeManagerProvider,
  useStripeManager,
  SaveStripeIdForm,
  SetDefaultPaymentMethod,
} from 'laravel-stripe-manager-ui';

// Example: Advanced usage with custom logic and error handling
function AdvancedSubscriptionManager() {
  const {
    plans,
    subscription,
    trialInfo,
    paymentMethods,
    loading,
    error,
    validationErrors,
    getPlans,
    getSubscription,
    getTrialInfo,
    getPaymentMethods,
    selectPlan,
    cancelSubscription,
    saveStripeId,
    setDefaultPaymentMethod,
    clearError,
    clearValidationErrors,
  } = useStripeManager();

  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [selectedPricingId, setSelectedPricingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          getPlans(),
          getSubscription(),
          getTrialInfo(),
          getPaymentMethods(),
        ]);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [getPlans, getSubscription, getTrialInfo, getPaymentMethods]);

  const handlePlanSelection = async (planId: number, pricingId: number) => {
    try {
      await selectPlan(planId, pricingId);
      // Show success message or redirect
      console.log('Plan selected successfully');
    } catch (err) {
      console.error('Error selecting plan:', err);
    }
  };

  const handleSubscriptionCancellation = async () => {
    try {
      await cancelSubscription();
      // Show success message
      console.log('Subscription cancelled successfully');
    } catch (err) {
      console.error('Error cancelling subscription:', err);
    }
  };

  const handleStripeIdSave = async (stripeId: string) => {
    try {
      await saveStripeId(stripeId);
      // Show success message
      console.log('Stripe ID saved successfully');
    } catch (err) {
      console.error('Error saving Stripe ID:', err);
    }
  };

  const handleDefaultPaymentMethod = async (paymentMethodId: string) => {
    try {
      await setDefaultPaymentMethod(paymentMethodId);
      // Show success message
      console.log('Default payment method set successfully');
    } catch (err) {
      console.error('Error setting default payment method:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Advanced Subscription Management
      </h1>

      {/* Error Display */}
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
              <div className="mt-4">
                <button
                  onClick={clearError}
                  className="text-sm text-red-600 hover:text-red-500 font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Validation Errors */}
      {Object.keys(validationErrors).length > 0 && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Validation Errors</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(validationErrors).map(([field, errors]) => (
                    <li key={field}>
                      <strong>{field}:</strong> {errors.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <button
                  onClick={clearValidationErrors}
                  className="text-sm text-yellow-600 hover:text-yellow-500 font-medium"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <SaveStripeIdForm onSuccess={handleStripeIdSave} />
          <SetDefaultPaymentMethod onSuccess={handleDefaultPaymentMethod} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Custom Plan Selection */}
          <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Plan</h2>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <p className="text-gray-600 mb-3">{plan.description}</p>
                  <div className="space-y-2">
                    {plan.pricing.map((pricing) => (
                      <div key={pricing.id} className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{pricing.nickname}</span>
                          <span className="text-gray-500 ml-2">
                            ${(pricing.unit_amount / 100).toFixed(2)}/{pricing.billing_period}
                          </span>
                        </div>
                        <button
                          onClick={() => handlePlanSelection(plan.id, pricing.id)}
                          disabled={loading.subscription}
                          className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700 disabled:opacity-50"
                        >
                          Select
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Subscription Management */}
          {subscription && (
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Current Subscription</h2>
              <div className="space-y-2">
                <p><strong>Plan:</strong> {subscription.product}</p>
                <p><strong>Status:</strong> {subscription.status}</p>
                <p><strong>Next Billing:</strong> {new Date(subscription.next_billing_at).toLocaleDateString()}</p>
                <p><strong>Amount:</strong> ${(subscription.next_billing_amount / 100).toFixed(2)}</p>
              </div>
              <button
                onClick={handleSubscriptionCancellation}
                disabled={loading.subscription}
                className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:opacity-50"
              >
                Cancel Subscription
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Example: App with provider
function App() {
  return (
    <StripeManagerProvider 
      baseUrl="https://yourdomain.com/api/stripe-manager" 
      token="your_jwt_token"
    >
      <AdvancedSubscriptionManager />
    </StripeManagerProvider>
  );
}

export default App;
