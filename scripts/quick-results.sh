#!/bin/bash

# 🚀 Quick Test Results Access
# Simple commands for instant test result access

echo "🎯 QA Playwright Portfolio - Quick Results"
echo "=========================================="

# Check if test results exist
if [ ! -d "test-results" ]; then
    echo "❌ No test results found. Running tests now..."
    npm test
fi

echo "📊 Latest Test Results Available:"
echo "--------------------------------"

# Show file info
if [ -f "test-results/results.json" ]; then
    echo "✅ JSON Report: $(ls -lh test-results/results.json | awk '{print $5}') - $(date -r test-results/results.json)"
fi

if [ -d "test-results/html" ]; then
    echo "✅ HTML Report: Interactive - $(date -r test-results/html)"
fi

if [ -f "test-results/junit.xml" ]; then
    echo "✅ JUnit XML: $(ls -lh test-results/junit.xml | awk '{print $5}') - $(date -r test-results/junit.xml)"
fi

echo
echo "🚀 Quick Access Options:"
echo "----------------------"
echo "1. HTML Report (Interactive): open http://localhost:9323"
echo "2. JSON in VS Code: code test-results/results.json"
echo "3. View in Terminal: cat test-results/results.json"
echo "4. Run Fresh Tests: npm test"
echo
echo "💡 Tip: The HTML report server is running on http://localhost:9323"
echo "   You can bookmark this URL for instant access!"
