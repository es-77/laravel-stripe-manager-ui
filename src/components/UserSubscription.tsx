import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStripeManager } from '../hooks/useStripeManager';
import { UserSubscriptionProps } from '../types';
import { cn, formatCurrency, formatDate, getSubscriptionStatusColor } from '../utils';

export const UserSubscription: React.FC<UserSubscriptionProps> = ({
  className,
  showCancelButton = true,
  onCancel,
}) => {
  const { subscription, loading, error, getSubscription } = useStripeManager();

  useEffect(() => {
    getSubscription();
  }, [getSubscription]);

  if (loading.subscription) {
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
            <h3 className="text-sm font-medium text-red-800">Error loading subscription</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="bg-gray-50 rounded-lg p-6">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Subscription</h3>
          <p className="text-gray-500">You don't have an active subscription at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('bg-white rounded-lg shadow-lg border border-gray-200 p-6', className)}
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Current Subscription</h2>
          <p className="text-gray-600 mt-1">Manage your subscription details</p>
        </div>
        <span className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          getSubscriptionStatusColor(subscription.status)
        )}>
          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1).replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{subscription.product}</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Plan:</span>
              <span className="font-medium">{subscription.price.nickname}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">
                {formatCurrency(subscription.price.unit_amount, subscription.price.currency)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Billing:</span>
              <span className="font-medium">
                Every {subscription.price.billing_period_count} {subscription.price.billing_period}
                {subscription.price.billing_period_count > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Billing Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Period:</span>
              <span className="font-medium">
                {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Billing:</span>
              <span className="font-medium">{formatDate(subscription.next_billing_at)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Amount:</span>
              <span className="font-medium">
                {formatCurrency(subscription.next_billing_amount, subscription.price.currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showCancelButton && (
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={onCancel}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            Cancel Subscription
          </button>
        </div>
      )}
    </motion.div>
  );
};
