#!/bin/bash

# Build Verification Script for laravel-stripe-manager-ui
# This script verifies that the package is built correctly

echo "🔍 Verifying laravel-stripe-manager-ui build..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Error: dist directory not found. Run 'npm run build' first.${NC}"
    exit 1
fi

# Check if required files exist
echo "📁 Checking build files..."
files=("dist/index.js" "dist/index.esm.js" "dist/index.d.ts" "dist/index.css")
all_exist=true

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file (missing)${NC}"
        all_exist=false
    fi
done

if [ "$all_exist" = false ]; then
    echo -e "${RED}❌ Some build files are missing. Run 'npm run build'.${NC}"
    exit 1
fi

echo ""
echo "🔎 Checking if React is properly externalized..."

# Check ESM build
if grep -q 'from"react"' dist/index.esm.js; then
    echo -e "${GREEN}✅ ESM: React is externalized${NC}"
else
    echo -e "${RED}❌ ESM: React might be bundled${NC}"
    all_exist=false
fi

# Check CommonJS build
if grep -q 'require("react")' dist/index.js; then
    echo -e "${GREEN}✅ CJS: React is externalized${NC}"
else
    echo -e "${RED}❌ CJS: React might be bundled${NC}"
    all_exist=false
fi

echo ""
echo "📦 Checking dependencies..."

# Check if peer dependencies are defined
if grep -q '"react":' package.json && grep -q 'peerDependencies' package.json; then
    echo -e "${GREEN}✅ Peer dependencies defined${NC}"
else
    echo -e "${YELLOW}⚠️  Warning: Peer dependencies might not be properly defined${NC}"
fi

echo ""
echo "📊 Package size analysis..."

# Get file sizes
esm_size=$(du -h dist/index.esm.js | cut -f1)
cjs_size=$(du -h dist/index.js | cut -f1)
css_size=$(du -h dist/index.css | cut -f1)

echo "  ESM bundle: $esm_size"
echo "  CJS bundle: $cjs_size"
echo "  CSS bundle: $css_size"

echo ""
if [ "$all_exist" = true ]; then
    echo -e "${GREEN}✅ All checks passed! Package is ready.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Test locally: npm link"
    echo "  2. Publish: npm publish"
    exit 0
else
    echo -e "${RED}❌ Some checks failed. Please review the errors above.${NC}"
    exit 1
fi

