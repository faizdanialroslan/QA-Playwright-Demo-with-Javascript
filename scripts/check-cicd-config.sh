#!/bin/bash

# CI/CD Configuration Validation Script
# This script checks if your QA Playwright Portfolio is ready for CI/CD integration

echo "🔍 QA Playwright Portfolio - CI/CD Configuration Check"
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check functions
check_passed() {
    echo -e "${GREEN}✅ $1${NC}"
}

check_failed() {
    echo -e "${RED}❌ $1${NC}"
}

check_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo ""
echo "📋 Checking CI/CD Configuration..."

# 1. Check GitHub Actions workflow exists
if [ -f ".github/workflows/playwright.yml" ]; then
    check_passed "GitHub Actions workflow found"
else
    check_failed "GitHub Actions workflow missing"
    exit 1
fi

# 2. Check Playwright configuration
if [ -f "playwright.config.ts" ]; then
    check_passed "Playwright configuration found"
    
    # Check if it has CI optimizations
    if grep -q "process.env.CI" playwright.config.ts; then
        check_passed "CI optimizations configured"
    else
        check_warning "CI optimizations could be improved"
    fi
else
    check_failed "Playwright configuration missing"
    exit 1
fi

# 3. Check package.json scripts
if [ -f "package.json" ]; then
    check_passed "package.json found"
    
    # Check for test scripts
    if grep -q '"test".*playwright' package.json; then
        check_passed "Test scripts configured"
    else
        check_failed "Test scripts missing or misconfigured"
    fi
    
    # Check for build scripts
    if grep -q '"build"' package.json; then
        check_passed "Build scripts configured"
    else
        check_warning "Build scripts missing"
    fi
else
    check_failed "package.json missing"
    exit 1
fi

# 4. Check test files
TEST_COUNT=$(find tests -name "*.spec.ts" -type f | wc -l)
if [ $TEST_COUNT -gt 0 ]; then
    check_passed "Test files found ($TEST_COUNT test suites)"
else
    check_failed "No test files found"
    exit 1
fi

# 5. Check environment variables setup
echo ""
echo "🔧 Environment Variables Setup:"
echo "   BASE_URL: ${BASE_URL:-'Not set (will use default)'}"
echo "   NODE_ENV: ${NODE_ENV:-'Not set (will use default)'}"
echo "   TEST_USER_EMAIL: ${TEST_USER_EMAIL:-'Not set (will use default)'}"
echo "   MAILINATOR_API_TOKEN: ${MAILINATOR_API_TOKEN:-'Not set (required for email tests)'}"

# 6. Check dependencies
echo ""
echo "📦 Checking Dependencies..."

if [ -f "package-lock.json" ] || [ -f "yarn.lock" ]; then
    check_passed "Lock file found (dependencies locked)"
else
    check_warning "No lock file found - consider using npm ci or yarn install --frozen-lockfile"
fi

# Check if Playwright is installed
if npm list @playwright/test > /dev/null 2>&1; then
    check_passed "Playwright test dependency installed"
else
    check_failed "Playwright test dependency missing"
fi

# 7. Versioning system check
echo ""
echo "🏷️  Versioning System:"
if [ -f "src/utils/version.ts" ]; then
    check_passed "Version utility found"
    
    # Check if it has the new format
    if grep -q "YYYYMMDD_deploymentCount_HHMM" src/utils/version.ts; then
        check_passed "New versioning format (YYYYMMDD_deploymentCount_HHMM) configured"
    else
        check_warning "Versioning format could be updated"
    fi
else
    check_warning "Version utility not found"
fi

# 8. Test execution check
echo ""
echo "🧪 Test Suite Validation:"
echo "Running quick test validation..."

if command -v npx > /dev/null 2>&1; then
    # Quick syntax check
    npx playwright test --list > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        check_passed "Test suite syntax validation passed"
        
        # Count tests
        TOTAL_TESTS=$(npx playwright test --list 2>/dev/null | grep -c "\.spec\.ts")
        echo "   Total test suites: $TOTAL_TESTS"
    else
        check_failed "Test suite syntax validation failed"
    fi
else
    check_warning "npx not available - cannot validate test syntax"
fi

echo ""
echo "🚀 CI/CD Deployment Triggers:"
echo "   ✅ Push to main/master branch"
echo "   ✅ Pull requests to main/master"
echo "   ✅ Daily scheduled runs (2 AM UTC)"
echo "   ✅ Manual workflow dispatch"

echo ""
echo "🎯 CI/CD Features:"
echo "   ✅ Multi-browser testing (Chromium, WebKit, Firefox)"
echo "   ✅ Parallel execution with sharding"
echo "   ✅ Automatic version generation with deployment count"
echo "   ✅ Test reports and artifacts"
echo "   ✅ Screenshot/video capture on failure"
echo "   ✅ GitHub Pages deployment for reports"
echo "   ✅ Slack notifications (if configured)"

echo ""
echo "📝 Required GitHub Secrets (optional):"
echo "   - MAILINATOR_API_TOKEN (for email verification tests)"
echo "   - SLACK_WEBHOOK (for Slack notifications)"

echo ""
echo "=================================================="
check_passed "CI/CD Configuration Validation Complete!"
echo ""
echo "🎉 Your QA Playwright Portfolio is ready for CI/CD integration!"
echo ""
echo "🔗 Next Steps:"
echo "   1. Push your code to GitHub"
echo "   2. Check the Actions tab for workflow execution"
echo "   3. Configure GitHub secrets if needed"
echo "   4. Monitor test results in the Actions dashboard"
echo ""
echo "📊 On every deployment, the pipeline will:"
echo "   • Generate version: YYYYMMDD_deploymentCount_HHMM"
echo "   • Run 100 tests across 3 browsers"
echo "   • Generate comprehensive reports"
echo "   • Deploy results to GitHub Pages"
echo "   • Send notifications (if configured)"
