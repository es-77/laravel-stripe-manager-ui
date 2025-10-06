import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStripeManager } from '../hooks/useStripeManager';
import { SetDefaultPaymentMethodProps } from '../types';
import { cn, getCardBrandIcon } from '../utils';

export const SetDefaultPaymentMethod: React.FC<SetDefaultPaymentMethodProps> = ({
  className,
  onSuccess,
}) => {
  const { 
    paymentMethods, 
    loading, 
    error, 
    getPaymentMethods, 
    setDefaultPaymentMethod 
  } = useStripeManager();

  useEffect(() => {
    getPaymentMethods();
  }, [getPaymentMethods]);

  const handleSetDefault = async (paymentMethodId: string) => {
    try {
      await setDefaultPaymentMethod(paymentMethodId);
      onSuccess?.(paymentMethodId);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (loading.paymentMethods) {
    return (
      <div className={cn('flex justify-center items-center py-8', className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('bg-red-50 border border-red-200 rounded-lg p-4', className)}>
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error loading payment methods</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentMethods.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="bg-gray-50 rounded-lg p-6">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Payment Methods</h3>
          <p className="text-gray-500">You need to add payment methods before setting a default one.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('space-y-6', className)}
    >
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Set Default Payment Method</h2>
        <p className="text-gray-600">
          Choose which payment method should be used by default for future charges.
        </p>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              'bg-white rounded-lg border p-4 transition-all duration-200',
              method.is_default 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">
                  {getCardBrandIcon(method.card.brand)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {method.card.brand.charAt(0).toUpperCase() + method.card.brand.slice(1)} •••• {method.card.last4}
                    </h3>
                    {method.is_default && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    Expires {method.card.exp_month.toString().padStart(2, '0')}/{method.card.exp_year}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {method.is_default ? (
                  <span className="text-sm text-green-600 font-medium">
                    Currently Default
                  </span>
                ) : (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium px-3 py-1 rounded-md hover:bg-primary-50 transition-colors duration-200"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Default Payment Method</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                The default payment method will be used automatically for all future charges 
                and subscriptions. You can change this at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
