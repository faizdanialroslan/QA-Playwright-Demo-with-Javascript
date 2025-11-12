#!/bin/bash

# 📊 QA Playwright Portfolio - Test Results Checker
# Quick access to test results in multiple formats

echo "🎯 QA Playwright Portfolio - Test Results"
echo "========================================="
echo

# Check if test results exist
if [ ! -d "test-results" ]; then
    echo "❌ No test results found. Run 'npm test' first to generate results."
    exit 1
fi

# Function to show test summary
show_summary() {
    echo "📊 Test Results Summary:"
    echo "----------------------"
    
    if [ -f "test-results/results.json" ]; then
        # Extract stats using Node.js
        node -e "
        const fs = require('fs');
        try {
            const results = JSON.parse(fs.readFileSync('test-results/results.json', 'utf8'));
            const stats = results.stats || {};
            
            console.log('Total Tests:', stats.total || 'N/A');
            console.log('✅ Passed:', stats.expected || 0);
            console.log('❌ Failed:', stats.unexpected || 0);
            console.log('⏭️  Skipped:', stats.skipped || 0);
            console.log('🕒 Duration:', Math.round((stats.duration || 0)/1000) + 's');
            console.log('📈 Status:', stats.ok ? '✅ ALL PASSED' : '❌ SOME FAILED');
            
            if (results.suites) {
                console.log('\\n📁 Test Suites:');
                results.suites.forEach(suite => {
                    const suiteName = suite.title || 'Unknown Suite';
                    console.log('  •', suiteName);
                });
            }
        } catch (error) {
            console.log('Error reading results.json:', error.message);
        }
        "
    else
        echo "❌ JSON results not found"
    fi
    echo
}

# Function to show available reports
show_reports() {
    echo "📋 Available Report Formats:"
    echo "---------------------------"
    
    if [ -d "test-results/html" ]; then
        echo "✅ HTML Report: test-results/html/index.html"
    else
        echo "❌ HTML Report: Not found"
    fi
    
    if [ -f "test-results/results.json" ]; then
        echo "✅ JSON Report: test-results/results.json"
    else
        echo "❌ JSON Report: Not found"
    fi
    
    if [ -f "test-results/junit.xml" ]; then
        echo "✅ JUnit XML: test-results/junit.xml"
    else
        echo "❌ JUnit XML: Not found"
    fi
    echo
}

# Function to show quick commands
show_commands() {
    echo "🚀 Quick Access Commands:"
    echo "------------------------"
    echo "# View interactive HTML report"
    echo "npx playwright show-report test-results/html"
    echo
    echo "# View JSON results in VS Code"
    echo "code test-results/results.json"
    echo
    echo "# View JUnit XML"
    echo "cat test-results/junit.xml"
    echo
    echo "# Run new tests"
    echo "npm test"
    echo
    echo "# Run specific test suite"
    echo "npx playwright test tests/01-basic-ui-tests.spec.ts"
    echo "npx playwright test tests/02-authentication-flows.spec.ts"
    echo "npx playwright test tests/03-email-verification.spec.ts"
    echo "npx playwright test tests/04-api-testing.spec.ts"
    echo
}

# Main execution based on arguments
case "${1:-summary}" in
    "summary"|"")
        show_summary
        ;;
    "reports")
        show_reports
        ;;
    "commands")
        show_commands
        ;;
    "all")
        show_summary
        show_reports
        show_commands
        ;;
    "html")
        echo "🌐 Opening HTML report..."
        
        # Check if server is already running on port 9323
        if lsof -i :9323 > /dev/null 2>&1; then
            echo "✅ HTML report server already running on port 9323"
            echo "🌐 Open in browser: http://localhost:9323"
            echo "💡 Or run 'open http://localhost:9323' to open automatically"
        else
            echo "🚀 Starting HTML report server..."
            npx playwright show-report test-results/html
        fi
        ;;
    "json")
        echo "📄 Opening JSON report in VS Code..."
        code test-results/results.json
        ;;
    "junit")
        echo "📋 Displaying JUnit XML report:"
        echo "==============================="
        cat test-results/junit.xml
        ;;
    "help")
        echo "📖 Usage: ./scripts/get-test-results.sh [option]"
        echo
        echo "Options:"
        echo "  summary   - Show test results summary (default)"
        echo "  reports   - Show available report formats"
        echo "  commands  - Show quick access commands"
        echo "  all       - Show everything"
        echo "  html      - Open HTML report"
        echo "  json      - Open JSON report in VS Code"
        echo "  junit     - Display JUnit XML content"
        echo "  help      - Show this help message"
        ;;
    *)
        echo "❌ Unknown option: $1"
        echo "Run './scripts/get-test-results.sh help' for usage information"
        exit 1
        ;;
esac

echo "🎉 QA Playwright Portfolio Results Ready!"
echo "Need help? Run: ./scripts/get-test-results.sh help"
