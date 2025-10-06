import { useState, useCallback, useContext } from 'react';
import { StripeManagerContext } from '../context/StripeManagerContext';
import { 
  UseStripeManagerReturn, 
  Plan, 
  UserSubscription, 
  TrialInfo, 
  PaymentMethod,
  ApiError,
  ValidationError 
} from '../types';

export const useStripeManager = (): UseStripeManagerReturn => {
  const { api } = useContext(StripeManagerContext);

  // State
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [trialInfo, setTrialInfo] = useState<TrialInfo | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  
  const [loading, setLoading] = useState({
    plans: false,
    subscription: false,
    trialInfo: false,
    paymentMethods: false,
  });
  
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  // Helper function to handle errors
  const handleError = useCallback((err: any) => {
    if (err.type === 'validation') {
      setValidationErrors(err.data.errors);
      setError(err.data.message);
    } else if (err.type === 'api') {
      setError(err.data.message || err.data.error);
      setValidationErrors({});
    } else {
      setError(err.data?.message || 'An unexpected error occurred');
      setValidationErrors({});
    }
  }, []);

  // API Methods
  const getPlans = useCallback(async () => {
    setLoading(prev => ({ ...prev, plans: true }));
    setError(null);
    setValidationErrors({});
    
    try {
      const data = await api.getPlans();
      setPlans(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(prev => ({ ...prev, plans: false }));
    }
  }, [api, handleError]);

  const getSubscription = useCallback(async () => {
    setLoading(prev => ({ ...prev, subscription: true }));
    setError(null);
    setValidationErrors({});
    
    try {
      const data = await api.getSubscription();
      setSubscription(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(prev => ({ ...prev, subscription: false }));
    }
  }, [api, handleError]);

  const getTrialInfo = useCallback(async (userId?: number) => {
    setLoading(prev => ({ ...prev, trialInfo: true }));
    setError(null);
    setValidationErrors({});
    
    try {
      const data = await api.getTrialInfo(userId);
      setTrialInfo(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(prev => ({ ...prev, trialInfo: false }));
    }
  }, [api, handleError]);

  const getPaymentMethods = useCallback(async () => {
    setLoading(prev => ({ ...prev, paymentMethods: true }));
    setError(null);
    setValidationErrors({});
    
    try {
      const data = await api.getPaymentMethods();
      setPaymentMethods(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(prev => ({ ...prev, paymentMethods: false }));
    }
  }, [api, handleError]);

  const selectPlan = useCallback(async (planId: number, pricingId: number) => {
    setError(null);
    setValidationErrors({});
    
    try {
      await api.selectPlan(planId, pricingId);
      // Refresh subscription data after selecting a plan
      await getSubscription();
    } catch (err) {
      handleError(err);
    }
  }, [api, handleError, getSubscription]);

  const cancelSubscription = useCallback(async () => {
    setError(null);
    setValidationErrors({});
    
    try {
      await api.cancelSubscription();
      // Refresh subscription data after cancellation
      await getSubscription();
    } catch (err) {
      handleError(err);
    }
  }, [api, handleError, getSubscription]);

  const saveStripeId = useCallback(async (stripeId: string) => {
    setError(null);
    setValidationErrors({});
    
    try {
      await api.saveStripeId(stripeId);
    } catch (err) {
      handleError(err);
    }
  }, [api, handleError]);

  const setDefaultPaymentMethod = useCallback(async (paymentMethodId: string) => {
    setError(null);
    setValidationErrors({});
    
    try {
      await api.setDefaultPaymentMethod(paymentMethodId);
      // Refresh payment methods after setting default
      await getPaymentMethods();
    } catch (err) {
      handleError(err);
    }
  }, [api, handleError, getPaymentMethods]);

  // Utility functions
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  return {
    // Data
    plans,
    subscription,
    trialInfo,
    paymentMethods,
    
    // Loading states
    loading,
    
    // Error states
    error,
    validationErrors,
    
    // Actions
    getPlans,
    getSubscription,
    getTrialInfo,
    getPaymentMethods,
    selectPlan,
    cancelSubscription,
    saveStripeId,
    setDefaultPaymentMethod,
    
    // Utility functions
    clearError,
    clearValidationErrors,
  };
};
