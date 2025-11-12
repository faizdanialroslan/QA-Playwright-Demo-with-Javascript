#!/bin/bash

# 🚀 Professional QA Pipeline - Local Testing
# Test development environment first, then proceed to production only if dev passes

set -e # Exit on any error

echo "🎯 Professional QA Pipeline - Dev First Approach"
echo "================================================="
echo

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_section() {
    echo -e "${BLUE}📋 $1${NC}"
    echo -e "${BLUE}$(printf '=%.0s' {1..50})${NC}"
}

# Phase 1: Development Environment Testing
print_section "PHASE 1: Development Environment Validation"

print_info "Building application for testing..."
if npm run build; then
    print_status "Build successful"
else
    print_error "Build failed"
    exit 1
fi

print_info "Starting preview server for testing..."
npm run preview &
PREVIEW_PID=$!
sleep 5

print_info "Running comprehensive test suite on development build..."
DEV_TEST_RESULT=0

# Run tests and capture result
if npm run test:dev; then
    print_status "✅ DEVELOPMENT TESTS PASSED"
    DEV_TEST_RESULT=1
else
    print_error "❌ DEVELOPMENT TESTS FAILED"
    DEV_TEST_RESULT=0
fi

# Stop preview server
kill $PREVIEW_PID 2>/dev/null || true
print_info "Preview server stopped"

echo
print_section "PHASE 2: Development Gate Decision"

if [ $DEV_TEST_RESULT -eq 1 ]; then
    print_status "✅ Development environment validation PASSED"
    print_status "🚀 Code is ready for production deployment"
    echo
    
    read -p "🚀 Proceed with production deployment? (y/N): " PROCEED
    
    if [[ $PROCEED =~ ^[Yy]$ ]]; then
        echo
        print_section "PHASE 3: Production Deployment"
        
        print_info "Committing and deploying to production..."
        
        # Stage all changes
        git add .
        
        # Create commit with timestamp
        COMMIT_MSG="🚀 QA Pipeline: Dev tests passed - Deploying $(date '+%Y-%m-%d %H:%M:%S')"
        git commit -m "$COMMIT_MSG" || print_warning "No changes to commit"
        
        # Push to trigger GitHub Actions
        print_info "Pushing to GitHub (triggers CI/CD pipeline)..."
        git push origin main
        
        print_status "✅ Code pushed to GitHub"
        print_info "🔄 GitHub Actions pipeline will now:"
        print_info "   1. Re-validate development tests"
        print_info "   2. Deploy to GitHub Pages"
        print_info "   3. Run production environment tests"
        echo
        
        print_info "⏱️  Waiting for deployment to complete..."
        sleep 30
        
        echo
        print_section "PHASE 4: Production Environment Testing"
        
        PROD_URL="https://faizdanialroslan.github.io/QA-Playwright-Demo-with-Javascript"
        print_info "Testing production environment: $PROD_URL"
        
        # Wait a bit more for deployment
        print_info "⏱️  Waiting additional time for deployment..."
        sleep 30
        
        if npm run test:prod; then
            print_status "✅ PRODUCTION TESTS PASSED"
            echo
            print_section "🎉 QA PIPELINE COMPLETED SUCCESSFULLY!"
            echo -e "${GREEN}=================================${NC}"
            echo -e "${GREEN}✅ Development tests: PASSED${NC}"
            echo -e "${GREEN}✅ Production deployment: SUCCESSFUL${NC}"
            echo -e "${GREEN}✅ Production tests: PASSED${NC}"
            echo -e "${GREEN}🌐 Live URL: $PROD_URL${NC}"
            echo -e "${GREEN}📊 GitHub Actions: https://github.com/faizdanialroslan/QA-Playwright-Demo-with-Javascript/actions${NC}"
        else
            print_error "❌ PRODUCTION TESTS FAILED"
            print_warning "🔧 Check production environment and logs"
            print_info "📊 View detailed results: npm run test:report"
            exit 1
        fi
        
    else
        print_warning "🛑 Production deployment cancelled by user"
        print_status "✅ Development validation complete - ready for manual deployment"
    fi
else
    print_error "❌ DEVELOPMENT TESTS FAILED"
    print_error "🚫 BLOCKING PRODUCTION DEPLOYMENT"
    echo
    print_warning "🔧 Fix the following before proceeding:"
    print_warning "   1. Review test failures in test-results/"
    print_warning "   2. Fix failing tests"
    print_warning "   3. Re-run this pipeline"
    echo
    print_info "📊 View detailed results: npm run test:report"
    exit 1
fi

echo
print_status "🎯 Professional QA Pipeline completed!"
print_info "💼 This workflow demonstrates enterprise-level QA practices"
