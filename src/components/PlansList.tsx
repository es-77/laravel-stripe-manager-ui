import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStripeManager } from '../hooks/useStripeManager';
import { PlansListProps } from '../types';
import { cn, formatCurrency, getBillingPeriodText } from '../utils';

export const PlansList: React.FC<PlansListProps> = ({
  className,
  onPlanSelect,
  showTrialInfo = true,
}) => {
  const { plans, loading, error, getPlans } = useStripeManager();

  useEffect(() => {
    getPlans();
  }, [getPlans]);

  if (loading.plans) {
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
            <h3 className="text-sm font-medium text-red-800">Error loading plans</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-500">No plans available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              <div className="space-y-3">
                {plan.pricing.map((pricing) => (
                  <div
                    key={pricing.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{pricing.nickname}</h4>
                        <p className="text-sm text-gray-500">
                          {getBillingPeriodText(pricing.billing_period, pricing.billing_period_count)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(pricing.unit_amount, pricing.currency)}
                        </div>
                        {pricing.trial_period_days && showTrialInfo && (
                          <div className="text-sm text-green-600 font-medium">
                            {pricing.trial_period_days} days free trial
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onPlanSelect?.(plan, pricing)}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium"
                    >
                      Select Plan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
