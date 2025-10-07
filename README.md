# Laravel Stripe Manager UI

A customizable React + TypeScript UI package for Laravel Stripe Manager API endpoints. This package provides ready-to-use components for managing subscriptions, payment methods, and plans in your React applications.

[![npm version](https://badge.fury.io/js/laravel-stripe-manager-ui.svg)](https://badge.fury.io/js/laravel-stripe-manager-ui)
[![GitHub repository](https://img.shields.io/badge/GitHub-es--77%2Flaravel--stripe--manager--ui-blue)](https://github.com/es-77/laravel-stripe-manager-ui)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Emmanuel%20Saleem-blue)](https://www.linkedin.com/in/es77)

## Features

- 🎨 **Customizable UI Components** - Built with Tailwind CSS and fully customizable
- 🔧 **TypeScript Support** - Full type safety and IntelliSense support
- 🚀 **Easy Integration** - Simple setup with context provider
- 📱 **Responsive Design** - Mobile-first responsive components
- ⚡ **Performance Optimized** - Built with modern React patterns
- 🎭 **Animation Support** - Smooth animations with Framer Motion
- 🛡️ **Error Handling** - Comprehensive error and validation handling

## Installation

```bash
npm install laravel-stripe-manager-ui
```

**Important:** Make sure you have React and React-DOM installed as peer dependencies:

```bash
npm install react react-dom
```

If you encounter any issues, see the [Troubleshooting Guide](TROUBLESHOOTING.md).

## Quick Start

### 1. Wrap your app with the provider

```tsx
import { StripeManagerProvider } from 'laravel-stripe-manager-ui';

function App() {
  return (
    <StripeManagerProvider 
      baseUrl="https://yourdomain.com/api/stripe-manager" 
      token="your_jwt_token"
    >
      <YourAppContent />
    </StripeManagerProvider>
  );
}
```

### 2. Use the components

```tsx
import { PlansList, UserSubscription, TrialInfo } from 'laravel-stripe-manager-ui';

function SubscriptionPage() {
  return (
    <div className="space-y-8">
      <TrialInfo />
      <UserSubscription />
      <PlansList />
    </div>
  );
}
```

## Components

### PlansList

Displays all available subscription plans with pricing information.

```tsx
import { PlansList } from 'laravel-stripe-manager-ui';

<PlansList 
  className="custom-class"
  onPlanSelect={(plan, pricing) => console.log('Selected:', plan, pricing)}
  showTrialInfo={true}
/>
```

**Props:**
- `className?: string` - Custom CSS classes
- `onPlanSelect?: (plan: Plan, pricing: Pricing) => void` - Callback when a plan is selected
- `showTrialInfo?: boolean` - Whether to show trial period information

### UserSubscription

Shows the current user's subscription details.

```tsx
import { UserSubscription } from 'laravel-stripe-manager-ui';

<UserSubscription 
  className="custom-class"
  showCancelButton={true}
  onCancel={() => console.log('Cancel clicked')}
/>
```

**Props:**
- `className?: string` - Custom CSS classes
- `showCancelButton?: boolean` - Whether to show the cancel button
- `onCancel?: () => void` - Callback when cancel is clicked

### TrialInfo

Displays trial period information for the user.

```tsx
import { TrialInfo } from 'laravel-stripe-manager-ui';

<TrialInfo 
  className="custom-class"
  userId={123} // Optional, uses authenticated user if not provided
/>
```

**Props:**
- `className?: string` - Custom CSS classes
- `userId?: number` - User ID to get trial info for (optional)

### PaymentMethods

Lists and manages user payment methods.

```tsx
import { PaymentMethods } from 'laravel-stripe-manager-ui';

<PaymentMethods 
  className="custom-class"
  onSetDefault={(paymentMethodId) => console.log('Set default:', paymentMethodId)}
  onDelete={(paymentMethodId) => console.log('Delete:', paymentMethodId)}
/>
```

**Props:**
- `className?: string` - Custom CSS classes
- `onSetDefault?: (paymentMethodId: string) => void` - Callback when setting default payment method
- `onDelete?: (paymentMethodId: string) => void` - Callback when deleting payment method

### Modals

#### SelectPlanModal

Modal for confirming plan selection.

```tsx
import { SelectPlanModal } from 'laravel-stripe-manager-ui';

<SelectPlanModal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  plan={selectedPlan}
  onConfirm={(plan, pricing) => {
    // Handle plan confirmation
    setIsModalOpen(false);
  }}
/>
```

#### CancelSubscriptionModal

Modal for confirming subscription cancellation.

```tsx
import { CancelSubscriptionModal } from 'laravel-stripe-manager-ui';

<CancelSubscriptionModal 
  isOpen={isCancelModalOpen}
  onClose={() => setIsCancelModalOpen(false)}
  onConfirm={async () => {
    // Handle cancellation
    await cancelSubscription();
    setIsCancelModalOpen(false);
  }}
/>
```

### Forms

#### SaveStripeIdForm

Form for saving Stripe customer ID.

```tsx
import { SaveStripeIdForm } from 'laravel-stripe-manager-ui';

<SaveStripeIdForm 
  className="custom-class"
  onSuccess={(stripeId) => console.log('Saved:', stripeId)}
/>
```

#### SetDefaultPaymentMethod

Component for setting default payment method.

```tsx
import { SetDefaultPaymentMethod } from 'laravel-stripe-manager-ui';

<SetDefaultPaymentMethod 
  className="custom-class"
  onSuccess={(paymentMethodId) => console.log('Set default:', paymentMethodId)}
/>
```

## Hooks

### useStripeManager

Main hook for interacting with the Stripe Manager API.

```tsx
import { useStripeManager } from 'laravel-stripe-manager-ui';

function MyComponent() {
  const {
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
  } = useStripeManager();

  // Use the data and functions...
}
```

## API Integration

The package automatically handles API calls to your Laravel Stripe Manager endpoints:

- `GET /plans` - Get all available plans
- `GET /subscription` - Get user subscription
- `GET /trial-info` - Get user trial info
- `GET /payment-methods` - Get user payment methods
- `POST /select-subscription-plan` - Select a plan
- `DELETE /cancel-subscription` - Cancel subscription
- `POST /save-stripe-id` - Save Stripe ID
- `POST /set-default-payment-method` - Set default payment method

## Error Handling

The package provides comprehensive error handling:

### API Errors
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

### Validation Errors
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "field_name": ["The field name field is required."]
  }
}
```

## Customization

### Styling

All components use Tailwind CSS classes and can be customized by:

1. **Passing custom className props**
2. **Overriding Tailwind configuration**
3. **Using CSS custom properties**

```tsx
// Custom styling example
<PlansList className="my-custom-plans-list" />
```

### Theme Customization

You can customize the theme by modifying your Tailwind configuration:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... your custom colors
        },
      },
    },
  },
}
```

## TypeScript Support

The package is built with TypeScript and provides full type definitions:

```tsx
import { Plan, UserSubscription, UseStripeManagerReturn } from 'laravel-stripe-manager-ui';

// All types are available for use in your application
const plans: Plan[] = [];
const subscription: UserSubscription | null = null;
const hook: UseStripeManagerReturn = useStripeManager();
```

## Requirements

- React 16.8.0 or higher
- TypeScript 4.0 or higher (if using TypeScript)
- Tailwind CSS (for styling)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

**Emmanuel Saleem**
- LinkedIn: [@es77](https://www.linkedin.com/in/es77)
- GitHub: [@es-77](https://github.com/es-77)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

#### React Duplicate Instance Error

If you encounter the error: `Cannot read properties of undefined (reading 'ReactCurrentDispatcher')`, this means there are multiple React instances. 

**Quick Fix:**

```bash
rm -rf node_modules package-lock.json
npm install
```

For more solutions, see the [Troubleshooting Guide](TROUBLESHOOTING.md).

#### Module Not Found

Ensure all dependencies are installed:

```bash
npm install react react-dom axios framer-motion
```

#### Styling Not Working

Make sure to import the CSS file:

```tsx
import 'laravel-stripe-manager-ui/dist/index.css';
```

For more issues and solutions, check the [Troubleshooting Guide](TROUBLESHOOTING.md).

## Support

For support, please open an issue on [GitHub](https://github.com/es-77/laravel-stripe-manager-ui/issues) or contact the maintainer.

## Changelog

### 1.0.0
- Initial release
- All core components implemented
- TypeScript support
- Tailwind CSS styling
- Framer Motion animations
- Comprehensive error handling
