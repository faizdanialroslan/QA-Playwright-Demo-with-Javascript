#!/bin/bash

# 🚀 QA Professional Workflow Pipeline
# Development → Test → Deploy → Verify

set -e # Exit on any error

echo "🎯 QA Professional Workflow Pipeline"
echo "===================================="
echo

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Phase 1: Development Testing
echo "📋 Phase 1: Development Environment Testing"
echo "----------------------------------------"

print_status "Starting development server..."
npm run dev &
DEV_PID=$!
sleep 5

print_status "Running test suite against development environment..."
if npm run test:dev; then
    print_status "Development tests PASSED ✅"
else
    print_error "Development tests FAILED ❌"
    kill $DEV_PID
    exit 1
fi

# Stop development server
kill $DEV_PID
print_status "Development server stopped"

echo
echo "📋 Phase 2: Production Build & Local Testing"
echo "-------------------------------------------"

print_status "Building production bundle..."
if npm run build; then
    print_status "Production build SUCCESSFUL ✅"
    BUILD_SIZE=$(du -sh dist | cut -f1)
    print_status "Build size: $BUILD_SIZE"
else
    print_error "Production build FAILED ❌"
    exit 1
fi

print_status "Testing production build locally..."
if npm run test:prod-local; then
    print_status "Local production tests PASSED ✅"
else
    print_error "Local production tests FAILED ❌"
    exit 1
fi

echo
echo "📋 Phase 3: Deployment Decision"
echo "------------------------------"

read -p "🚀 Deploy to production? (y/N): " DEPLOY_CONFIRM

if [[ $DEPLOY_CONFIRM =~ ^[Yy]$ ]]; then
    print_status "Deploying to production..."
    
    git add .
    git commit -m "QA Workflow: Automated deployment $(date '+%Y-%m-%d %H:%M:%S')"
    git push origin main
    
    print_status "Code deployed to GitHub Pages!"
    echo
    
    echo "📋 Phase 4: Production Environment Testing"
    echo "----------------------------------------"
    
    print_warning "Waiting 30 seconds for deployment to complete..."
    sleep 30
    
    PROD_URL="https://faizdanialroslan.github.io/QA-Playwright-Demo-with-Javascript"
    print_status "Testing production environment: $PROD_URL"
    
    if npm run test:prod; then
        print_status "Production tests PASSED ✅"
        echo
        echo "🎉 QA WORKFLOW COMPLETE!"
        echo "======================="
        echo "✅ Development tests: PASSED"
        echo "✅ Production build: SUCCESSFUL"
        echo "✅ Local production tests: PASSED"
        echo "✅ Deployment: SUCCESSFUL"
        echo "✅ Live production tests: PASSED"
        echo
        echo "🌐 Your portfolio is live at: $PROD_URL"
        echo "📊 Test reports available in: test-results/"
    else
        print_error "Production tests FAILED ❌"
        print_warning "Consider rolling back or investigating issues"
        exit 1
    fi
else
    print_warning "Deployment cancelled by user"
    print_status "Build is ready for manual deployment"
fi

echo
print_status "QA Workflow completed successfully! 🚀"
