import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStripeManager } from '../hooks/useStripeManager';
import { SaveStripeIdFormProps } from '../types';
import { cn } from '../utils';

export const SaveStripeIdForm: React.FC<SaveStripeIdFormProps> = ({
  className,
  onSuccess,
}) => {
  const { saveStripeId, error, validationErrors, clearError, clearValidationErrors } = useStripeManager();
  const [stripeId, setStripeId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripeId.trim()) {
      return;
    }

    setIsSubmitting(true);
    clearError();
    clearValidationErrors();

    try {
      await saveStripeId(stripeId.trim());
      setStripeId('');
      onSuccess?.(stripeId.trim());
    } catch (err) {
      // Error is handled by the hook
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('bg-white rounded-lg shadow border border-gray-200 p-6', className)}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Save Stripe ID</h2>
        <p className="text-gray-600">
          Enter your Stripe customer ID to link your account with Stripe.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="stripe-id" className="block text-sm font-medium text-gray-700 mb-2">
            Stripe Customer ID
          </label>
          <input
            type="text"
            id="stripe-id"
            value={stripeId}
            onChange={(e) => setStripeId(e.target.value)}
            placeholder="cus_xxxxxxxxxxxxx"
            className={cn(
              'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
              validationErrors.stripe_id && 'border-red-300 focus:ring-red-500 focus:border-red-500'
            )}
            disabled={isSubmitting}
          />
          {validationErrors.stripe_id && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.stripe_id[0]}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
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

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!stripeId.trim() || isSubmitting}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium text-white',
              'bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-colors duration-200'
            )}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </div>
            ) : (
              'Save Stripe ID'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Need help finding your Stripe ID?</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                You can find your Stripe Customer ID in your Stripe Dashboard under Customers, 
                or it will be provided to you by your application administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
