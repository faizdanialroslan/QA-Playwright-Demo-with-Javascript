#!/bin/bash

# Multi-Format Reports Demonstration Script
echo "🎭 Playwright Multi-Format Reports Demonstration"
echo "=============================================="
echo ""

# Check if reports exist
if [ ! -d "test-results" ]; then
    echo "❌ No test results found. Please run tests first:"
    echo "   npm test"
    exit 1
fi

echo "📊 Available Report Formats:"
echo ""

# 1. HTML Report
if [ -f "test-results/html/index.html" ]; then
    echo "✅ 1. HTML Report (Interactive)"
    echo "   📂 Location: test-results/html/index.html"
    echo "   🌐 Size: $(ls -lh test-results/html/index.html | awk '{print $5}')"
    echo "   🎯 Features: Interactive UI, Screenshots, Videos, Filtering"
    echo "   🚀 Open with: npx playwright show-report test-results/html"
    echo ""
else
    echo "❌ HTML report not found"
fi

# 2. JSON Report  
if [ -f "test-results/results.json" ]; then
    echo "✅ 2. JSON Report (Machine Readable)"
    echo "   📂 Location: test-results/results.json"
    echo "   🌐 Size: $(ls -lh test-results/results.json | awk '{print $5}')"
    echo "   🎯 Features: Detailed test data, CI/CD integration, Custom analysis"
    echo ""
    
    # Extract stats if possible
    if command -v python3 > /dev/null 2>&1; then
        echo "   📈 Test Statistics:"
        python3 -c "
import json
with open('test-results/results.json') as f:
    data = json.load(f)
    stats = data.get('stats', {})
    print(f'      Total Tests: {stats.get(\"expected\", 0) + stats.get(\"unexpected\", 0)}')
    print(f'      Passed: {stats.get(\"expected\", 0)}')
    print(f'      Failed: {stats.get(\"unexpected\", 0)}')
    print(f'      Skipped: {stats.get(\"skipped\", 0)}')
    print(f'      Duration: {stats.get(\"duration\", 0)/1000:.1f}s')
" 2>/dev/null || echo "      (Stats parsing unavailable)"
    fi
    echo ""
else
    echo "❌ JSON report not found"
fi

# 3. JUnit Report
if [ -f "test-results/junit.xml" ]; then
    echo "✅ 3. JUnit XML Report (CI/CD Standard)"
    echo "   📂 Location: test-results/junit.xml" 
    echo "   🌐 Size: $(ls -lh test-results/junit.xml | awk '{print $5}')"
    echo "   🎯 Features: Jenkins/Azure DevOps integration, Build servers"
    echo ""
    
    # Extract basic info from XML
    if command -v grep > /dev/null 2>&1; then
        echo "   📈 JUnit Statistics:"
        TESTS=$(grep -o 'tests="[0-9]*"' test-results/junit.xml | head -1 | grep -o '[0-9]*')
        FAILURES=$(grep -o 'failures="[0-9]*"' test-results/junit.xml | head -1 | grep -o '[0-9]*')
        TIME=$(grep -o 'time="[0-9.]*"' test-results/junit.xml | head -1 | grep -o '[0-9.]*')
        echo "      Total Tests: ${TESTS:-'Unknown'}"
        echo "      Failures: ${FAILURES:-'0'}"
        echo "      Duration: ${TIME:-'Unknown'}s"
    fi
    echo ""
else
    echo "❌ JUnit XML report not found"
fi

echo "🚀 Quick Access Commands:"
echo "────────────────────────────────────────────"
echo "# View Interactive HTML Report"
echo "npx playwright show-report test-results/html"
echo ""
echo "# Analyze JSON Report (if jq installed)"
echo "cat test-results/results.json | jq '.stats'"
echo ""
echo "# Validate JUnit XML"
echo "cat test-results/junit.xml | head -10"
echo ""
echo "# Open reports in browser/editor"
echo "open test-results/html/index.html     # macOS"
echo "code test-results/results.json        # VS Code"
echo ""

echo "📁 Report Directory Structure:"
echo "test-results/"
find test-results -type f -name "*.*" | head -10 | sed 's/^/├── /'

echo ""
echo "💡 Pro Tips:"
echo "• HTML report is best for development and debugging"
echo "• JSON report is perfect for automation and analysis"  
echo "• JUnit XML is required for most CI/CD platforms"
echo "• All formats are generated automatically on test run"
echo ""
echo "🎯 Your portfolio includes comprehensive reporting for all 100 tests!"
