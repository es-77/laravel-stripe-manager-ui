// API Response Types
export interface ApiError {
  error: string;
  message: string;
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T;
}

// Plan and Pricing Types
export interface Pricing {
  id: number;
  stripe_price_id: string;
  nickname: string;
  unit_amount: number;
  currency: string;
  type: 'recurring' | 'one_time';
  billing_period: 'day' | 'week' | 'month' | 'year';
  billing_period_count: number;
  trial_period_days: number | null;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  stripe_product_id: string;
  pricing: Pricing[];
}

// Subscription Types
export interface SubscriptionPrice {
  nickname: string;
  unit_amount: number;
  currency: string;
  billing_period: 'day' | 'week' | 'month' | 'year';
  billing_period_count: number;
}

export interface UserSubscription {
  subscription_id: number;
  stripe_subscription_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete' | 'incomplete_expired' | 'trialing';
  product: string;
  price: SubscriptionPrice;
  current_period_start: string;
  current_period_end: string;
  next_billing_at: string;
  next_billing_amount: number;
}

// Trial Types
export interface TrialInfo {
  has_trial: boolean;
  trial_start?: string;
  trial_end?: string;
  active?: boolean;
}

// Payment Method Types
export interface PaymentMethod {
  id: string;
  type: 'card';
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  is_default: boolean;
}

// Component Props Types
export interface StripeManagerProviderProps {
  baseUrl: string;
  token?: string;
  children: React.ReactNode;
  className?: string;
}

export interface PlansListProps {
  className?: string;
  onPlanSelect?: (plan: Plan, pricing: Pricing) => void;
  showTrialInfo?: boolean;
}

export interface UserSubscriptionProps {
  className?: string;
  showCancelButton?: boolean;
  onCancel?: () => void;
}

export interface TrialInfoProps {
  className?: string;
  userId?: number;
}

export interface PaymentMethodsProps {
  className?: string;
  onSetDefault?: (paymentMethodId: string) => void;
  onDelete?: (paymentMethodId: string) => void;
}

export interface SelectPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  onConfirm: (plan: Plan, pricing: Pricing) => void;
  className?: string;
}

export interface CancelSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  className?: string;
}

export interface SaveStripeIdFormProps {
  className?: string;
  onSuccess?: (stripeId: string) => void;
}

export interface SetDefaultPaymentMethodProps {
  className?: string;
  onSuccess?: (paymentMethodId: string) => void;
}

// Hook Return Types
export interface UseStripeManagerReturn {
  // Data
  plans: Plan[];
  subscription: UserSubscription | null;
  trialInfo: TrialInfo | null;
  paymentMethods: PaymentMethod[];
  
  // Loading states
  loading: {
    plans: boolean;
    subscription: boolean;
    trialInfo: boolean;
    paymentMethods: boolean;
  };
  
  // Error states
  error: string | null;
  validationErrors: Record<string, string[]>;
  
  // Actions
  getPlans: () => Promise<void>;
  getSubscription: () => Promise<void>;
  getTrialInfo: (userId?: number) => Promise<void>;
  getPaymentMethods: () => Promise<void>;
  selectPlan: (planId: number, pricingId: number) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  saveStripeId: (stripeId: string) => Promise<void>;
  setDefaultPaymentMethod: (paymentMethodId: string) => Promise<void>;
  
  // Utility functions
  clearError: () => void;
  clearValidationErrors: () => void;
}
