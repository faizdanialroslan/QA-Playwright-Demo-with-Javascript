#!/bin/bash

# QA Playwright Portfolio Test Runner Script
# This script demonstrates the complete test automation workflow

echo "🎭 QA Playwright Test Automation Portfolio"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install Node.js and npm first."
    exit 1
fi

print_status "Checking dependencies..."

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    print_warning "Dependencies not found. Installing..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
else
    print_success "Dependencies found"
fi

# Check if Playwright browsers are installed
print_status "Checking Playwright browsers..."
if npx playwright --version &> /dev/null; then
    print_success "Playwright is available"
    
    # Check if browsers are installed
    if npx playwright install --dry-run 2>&1 | grep -q "browsers are already installed"; then
        print_success "Playwright browsers are installed"
    else
        print_warning "Installing Playwright browsers..."
        npx playwright install
        if [ $? -eq 0 ]; then
            print_success "Playwright browsers installed successfully"
        else
            print_error "Failed to install Playwright browsers"
            exit 1
        fi
    fi
else
    print_error "Playwright is not available"
    exit 1
fi

echo ""
echo "🚀 Portfolio Features Demonstration"
echo "=================================="

# Start the development server
print_status "Starting React development server..."
npm run dev &
SERVER_PID=$!

# Wait for server to be ready
print_status "Waiting for server to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        print_success "Development server is ready at http://localhost:3000"
        break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
        print_error "Server failed to start within 30 seconds"
        kill $SERVER_PID 2>/dev/null
        exit 1
    fi
done

echo ""
print_status "Running test automation portfolio demonstration..."
echo ""

# Function to run a specific test suite
run_test_suite() {
    local suite_name=$1
    local test_file=$2
    local description=$3
    
    echo ""
    echo "📋 Test Suite: $suite_name"
    echo "Description: $description"
    echo "----------------------------------------"
    
    if npx playwright test $test_file --reporter=line --workers=1; then
        print_success "✅ $suite_name - All tests passed"
    else
        print_warning "⚠️  $suite_name - Some tests failed (this is expected for demo)"
    fi
}

# Demo the portfolio features
echo ""
echo "🎯 Test Portfolio Demonstration"
echo ""
print_status "This portfolio demonstrates the following capabilities:"
echo "  1. Basic UI Testing - Todo CRUD operations"
echo "  2. Authentication Flows - Login/register/session management"
echo "  3. Email Verification - Mailinator API integration"
echo "  4. API Testing - Backend integration and performance"
echo "  5. Cross-browser Testing - Chromium, WebKit, Firefox"
echo "  6. CI/CD Pipeline - GitHub Actions with artifact management"

# Show available test commands
echo ""
echo "📝 Available Test Commands"
echo "========================="
echo ""
echo "Basic test execution:"
echo "  npm test                    # Run all tests"
echo "  npm run test:ui             # Run with Playwright UI"
echo "  npm run test:headed         # Run in headed mode"
echo "  npm run test:debug          # Debug mode"
echo ""
echo "Specific test suites:"
echo "  npx playwright test 01-basic-ui-tests         # UI tests"
echo "  npx playwright test 02-authentication-flows   # Auth tests"
echo "  npx playwright test 03-email-verification     # Email tests"
echo "  npx playwright test 04-api-testing           # API tests"
echo ""
echo "Browser-specific testing:"
echo "  npx playwright test --project=chromium   # Chromium only"
echo "  npx playwright test --project=webkit     # WebKit only"
echo "  npx playwright test --project=firefox    # Firefox only"
echo ""
echo "Reports and artifacts:"
echo "  npm run test:report         # View HTML report"
echo "  npx playwright show-trace   # View test traces"

# Check if we should run actual tests
echo ""
read -p "Would you like to run a quick test demonstration? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    print_status "Running quick test demonstration..."
    
    # Run a simple smoke test
    if npx playwright test --grep="should display login form correctly" --reporter=line; then
        print_success "Demo test completed successfully!"
        echo ""
        print_status "You can now explore the full test suite:"
        echo "  1. Open another terminal"
        echo "  2. Run 'npm test' to execute all tests"
        echo "  3. Run 'npm run test:ui' for interactive testing"
        echo "  4. Visit http://localhost:3000 to see the application"
    else
        print_warning "Demo test encountered issues (this may be expected)"
        echo ""
        print_status "To troubleshoot:"
        echo "  1. Check if the app is running at http://localhost:3000"
        echo "  2. Verify all dependencies are installed with 'npm install'"
        echo "  3. Try running 'npx playwright test --ui' for interactive debugging"
    fi
else
    print_status "Skipping test demonstration"
fi

echo ""
echo "🎭 QA Playwright Portfolio Setup Complete!"
echo ""
print_status "Next steps:"
echo "  1. Explore the application at http://localhost:3000"
echo "  2. Review the test files in the 'tests/' directory"
echo "  3. Check out the Page Object Model in 'tests/pages/'"
echo "  4. Run tests with 'npm test' or 'npm run test:ui'"
echo "  5. Review the comprehensive documentation in README.md"
echo ""
print_status "Portfolio Features:"
echo "  ✅ React TypeScript Application"
echo "  ✅ Playwright Test Framework"
echo "  ✅ Page Object Model Architecture"
echo "  ✅ Cross-browser Testing"
echo "  ✅ Email Verification Testing"
echo "  ✅ API Integration Testing"
echo "  ✅ CI/CD Pipeline with GitHub Actions"
echo "  ✅ CI/CD Pipeline Integration"
echo "  ✅ Comprehensive Test Reporting"
echo ""
print_success "Portfolio is ready for demonstration and exploration!"

# Keep the server running
echo ""
print_status "Development server is running at http://localhost:3000"
print_status "Press Ctrl+C to stop the server"
wait $SERVER_PID
