import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStripeManager } from '../hooks/useStripeManager';
import { TrialInfoProps } from '../types';
import { cn, formatDate } from '../utils';

export const TrialInfo: React.FC<TrialInfoProps> = ({
  className,
  userId,
}) => {
  const { trialInfo, loading, error, getTrialInfo } = useStripeManager();

  useEffect(() => {
    getTrialInfo(userId);
  }, [getTrialInfo, userId]);

  if (loading.trialInfo) {
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
            <h3 className="text-sm font-medium text-red-800">Error loading trial info</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!trialInfo || !trialInfo.has_trial) {
    return (
      <div className={cn('text-center py-8', className)}>
        <div className="bg-gray-50 rounded-lg p-6">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Trial Available</h3>
          <p className="text-gray-500">You don't have an active trial period.</p>
        </div>
      </div>
    );
  }

  const trialStart = trialInfo.trial_start ? new Date(trialInfo.trial_start) : null;
  const trialEnd = trialInfo.trial_end ? new Date(trialInfo.trial_end) : null;
  const now = new Date();
  
  const isTrialActive = trialInfo.active && trialStart && trialEnd && now >= trialStart && now <= trialEnd;
  const daysRemaining = trialEnd ? Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('bg-white rounded-lg shadow-lg border border-gray-200 p-6', className)}
    >
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3">
          <h2 className="text-xl font-bold text-gray-900">Trial Information</h2>
          <p className="text-gray-600">Your trial period details</p>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              {isTrialActive ? 'Trial Active' : 'Trial Period'}
            </h3>
            <div className="mt-1 text-sm text-blue-700">
              {isTrialActive 
                ? `You have ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining in your trial`
                : 'Your trial period has ended'
              }
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Trial Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className={`font-medium ${isTrialActive ? 'text-green-600' : 'text-gray-600'}`}>
                {isTrialActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            {trialStart && trialInfo.trial_start && (
              <div className="flex justify-between">
                <span className="text-gray-600">Started:</span>
                <span className="font-medium">{formatDate(trialInfo.trial_start)}</span>
              </div>
            )}
            {trialEnd && trialInfo.trial_end && (
              <div className="flex justify-between">
                <span className="text-gray-600">Ends:</span>
                <span className="font-medium">{formatDate(trialInfo.trial_end)}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Next Steps</h3>
          <div className="text-sm text-gray-600">
            {isTrialActive ? (
              <p>
                Your trial is currently active. You can explore all features during this period.
                Choose a subscription plan before your trial ends to continue using the service.
              </p>
            ) : (
              <p>
                Your trial period has ended. To continue using the service, please select a subscription plan.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
