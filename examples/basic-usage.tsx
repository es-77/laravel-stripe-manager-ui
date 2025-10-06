import React, { useState } from 'react';
import {
  StripeManagerProvider,
  PlansList,
  UserSubscription,
  TrialInfo,
  PaymentMethods,
  SelectPlanModal,
  CancelSubscriptionModal,
  useStripeManager,
  Plan,
  Pricing,
} from 'laravel-stripe-manager-ui';

// Example: Basic usage with all components
function App() {
  return (
    <StripeManagerProvider 
      baseUrl="https://yourdomain.com/api/stripe-manager" 
      token="your_jwt_token"
    >
      <SubscriptionDashboard />
    </StripeManagerProvider>
  );
}

function SubscriptionDashboard() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const handlePlanSelect = (plan: Plan, pricing: Pricing) => {
    setSelectedPlan(plan);
    setIsSelectModalOpen(true);
  };

  const handlePlanConfirm = async (plan: Plan, pricing: Pricing) => {
    // Handle plan confirmation logic here
    console.log('Plan confirmed:', plan, pricing);
    setIsSelectModalOpen(false);
  };

  const handleCancelClick = () => {
    setIsCancelModalOpen(true);
  };

  const handleCancelConfirm = async () => {
    // Handle cancellation logic here
    console.log('Subscription cancelled');
    setIsCancelModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Subscription Management
      </h1>

      <div className="space-y-8">
        <TrialInfo />
        <UserSubscription onCancel={handleCancelClick} />
        <PaymentMethods />
        <PlansList onPlanSelect={handlePlanSelect} />
      </div>

      <SelectPlanModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        plan={selectedPlan}
        onConfirm={handlePlanConfirm}
      />

      <CancelSubscriptionModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelConfirm}
      />
    </div>
  );
}

export default App;
