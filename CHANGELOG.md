# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-01-15

### Fixed
- **Critical**: Fixed React duplicate instance error that caused "Cannot read properties of undefined (reading 'ReactCurrentDispatcher')" 
- Updated Rollup configuration to properly externalize React, React-DOM, and all peer dependencies
- Added `sideEffects` field to package.json for better tree-shaking
- Added `peerDependenciesMeta` for explicit peer dependency requirements

### Added
- Comprehensive troubleshooting guide (TROUBLESHOOTING.md)
- `.npmignore` file to ensure clean package distribution
- Better documentation for common installation issues

### Changed
- Improved Rollup build configuration with better external dependencies handling
- Added regex patterns to externalize all React-related imports (including `react/jsx-runtime`)
- Enhanced README with installation troubleshooting section

## [1.0.0] - 2024-01-01

### Added
- Initial release of Laravel Stripe Manager UI package
- Complete set of React components for subscription management
- TypeScript support with full type definitions
- Tailwind CSS styling with customizable theme
- Framer Motion animations for smooth user experience
- Comprehensive error handling for API and validation errors
- Context provider for easy configuration
- Custom hook (`useStripeManager`) for API interactions
- Responsive design for mobile and desktop
- Modal components for plan selection and subscription cancellation
- Form components for Stripe ID and payment method management
- Utility functions for currency formatting and date handling
- Example usage files for React and Next.js
- Complete documentation with API reference
- ESLint configuration for code quality
- Rollup build configuration for optimal bundle size

### Components Added
- `PlansList` - Display all available subscription plans
- `UserSubscription` - Show current subscription details
- `TrialInfo` - Display trial period information
- `PaymentMethods` - Manage user payment methods
- `SelectPlanModal` - Modal for plan selection confirmation
- `CancelSubscriptionModal` - Modal for subscription cancellation
- `SaveStripeIdForm` - Form for saving Stripe customer ID
- `SetDefaultPaymentMethod` - Component for setting default payment method

### Features
- Full integration with Laravel Stripe Manager API endpoints
- Automatic error handling and validation
- Loading states for all async operations
- Customizable styling through className props
- TypeScript support with IntelliSense
- Mobile-responsive design
- Accessibility features
- Animation support with Framer Motion
- Utility functions for common operations

### API Integration
- GET /plans - Fetch all available plans
- GET /subscription - Get user subscription details
- GET /trial-info - Get user trial information
- GET /payment-methods - Get user payment methods
- POST /select-subscription-plan - Select a subscription plan
- DELETE /cancel-subscription - Cancel current subscription
- POST /save-stripe-id - Save Stripe customer ID
- POST /set-default-payment-method - Set default payment method

### Dependencies
- React 16.8.0+ (peer dependency)
- TypeScript 4.0+ (dev dependency)
- Tailwind CSS 3.3+ (dependency)
- Framer Motion 10.16+ (dependency)
- Axios 1.6+ (dependency)
- clsx and tailwind-merge for utility functions

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Documentation
- Comprehensive README with usage examples
- TypeScript type definitions
- API reference documentation
- Example implementations for React and Next.js
- Customization guide
- Error handling documentation
