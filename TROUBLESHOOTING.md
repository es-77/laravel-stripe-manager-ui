# Troubleshooting Guide

## Common Issues

### Error: "Cannot read properties of undefined (reading 'ReactCurrentDispatcher')"

This error occurs when there are multiple instances of React running in your application.

#### Solution 1: Ensure Single React Instance (Recommended)

Make sure you only have one version of React installed:

```bash
# Check for duplicate React installations
npm ls react
npm ls react-dom

# If you see multiple versions, clean install
rm -rf node_modules package-lock.json
npm install
```

#### Solution 2: For Webpack Projects

Add this to your `webpack.config.js`:

```javascript
module.exports = {
  // ... other config
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
};
```

#### Solution 3: For Next.js Projects

Add this to your `next.config.js`:

```javascript
module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    };
    return config;
  },
};
```

#### Solution 4: For Vite Projects

Add this to your `vite.config.js`:

```javascript
export default {
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
};
```

#### Solution 5: Use npm/yarn link carefully

If you're developing the package locally:

```bash
# In your main app
npm link react
npm link react-dom

# In the package directory
npm link
cd /path/to/your/app
npm link laravel-stripe-manager-ui
```

### Module Not Found Errors

If you encounter module not found errors:

```bash
# Ensure all peer dependencies are installed
npm install react react-dom

# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

If you get TypeScript errors:

1. Ensure you have `@types/react` and `@types/react-dom` installed:
```bash
npm install --save-dev @types/react @types/react-dom
```

2. Update your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Styling Issues

If styles are not loading:

1. Make sure you're importing the CSS:
```typescript
import 'laravel-stripe-manager-ui/dist/index.css';
```

2. Ensure Tailwind CSS is configured in your project

3. If using a bundler, ensure CSS files are processed correctly

### Framer Motion Errors

If you encounter Framer Motion errors:

```bash
# Ensure compatible version is installed
npm install framer-motion@^10.16.0
```

### Axios Errors

If you encounter Axios errors:

```bash
# Ensure Axios is installed
npm install axios@^1.6.0
```

## Getting Help

If you continue to experience issues:

1. Check the [GitHub Issues](https://github.com/es-77/laravel-stripe-manager-ui/issues)
2. Create a new issue with:
   - Your package.json
   - Error messages
   - Steps to reproduce
   - Environment details (Node version, package manager, etc.)

## Version Compatibility

- React: >= 16.8.0
- React-DOM: >= 16.8.0
- Node: >= 14.0.0
- TypeScript: >= 4.0.0 (if using TypeScript)

