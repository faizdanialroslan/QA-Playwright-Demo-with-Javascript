# Test Reports Guide - Multi-Format Test Results

## 📊 Available Report Formats

After running your tests with `npm test` or `npx playwright test`, Playwright generates multiple report formats automatically.

### 🎯 Report Locations and Access Methods

## 1. **HTML Report (Interactive)** 📱
**Location:** `test-results/html/index.html`

**How to view:**
```bash
# Option 1: Open with Playwright command (recommended)
npx playwright show-report test-results/html

# Option 2: Open directly in browser
open test-results/html/index.html

# Option 3: Serve with local server
cd test-results/html && python -m http.server 8080
# Then visit: http://localhost:8080
```

**Features:**
- ✅ Interactive test results with filtering
- ✅ Screenshots and videos for failed tests
- ✅ Test execution timeline
- ✅ Error stack traces
- ✅ Retry information
- ✅ Browser execution details

---

## 2. **JSON Report (Machine Readable)** 🤖
**Location:** `test-results/results.json`

**How to view:**
```bash
# View in terminal (formatted)
cat test-results/results.json | jq .

# View raw JSON
cat test-results/results.json

# Open in VS Code
code test-results/results.json
```

**Use cases:**
- ✅ CI/CD integration
- ✅ Custom report generation
- ✅ Test metrics analysis
- ✅ Automated result processing

**Sample structure:**
```json
{
  "config": { "projects": [...] },
  "suites": [...],
  "tests": [...],
  "errors": [...],
  "stats": {
    "total": 100,
    "expected": 100,
    "unexpected": 0,
    "flaky": 0,
    "skipped": 0,
    "ok": true
  }
}
```

---

## 3. **JUnit Report (CI/CD Standard)** ⚙️
**Location:** `test-results/junit.xml`

**How to view:**
```bash
# View in terminal
cat test-results/junit.xml

# Pretty print with xmllint (if available)
xmllint --format test-results/junit.xml

# Open in VS Code
code test-results/junit.xml
```

**Use cases:**
- ✅ Jenkins integration
- ✅ Azure DevOps integration
- ✅ GitHub Actions integration
- ✅ Test result dashboards
- ✅ Build server reporting

**Sample structure:**
```xml
<testsuites>
  <testsuite name="tests/01-basic-ui-tests.spec.ts" tests="26" failures="0" skipped="0" time="8.9">
    <testcase name="should add a new todo item" time="0.5"/>
    <testcase name="should mark todo as complete" time="0.3"/>
    <!-- ... more test cases ... -->
  </testsuite>
</testsuites>
```

---

## 🚀 Quick Commands Reference

### Generate Reports
```bash
# Run tests and generate all reports
npm test

# Run specific test file with reports
npx playwright test tests/01-basic-ui-tests.spec.ts

# Run with specific reporter only
npx playwright test --reporter=html
npx playwright test --reporter=json
npx playwright test --reporter=junit
```

### View Reports
```bash
# Interactive HTML report (best for development)
npx playwright show-report test-results/html

# JSON analysis (best for automation)
cat test-results/results.json | jq '.stats'

# JUnit validation (best for CI/CD)
xmllint --noout test-results/junit.xml && echo "Valid XML"
```

### Report Analysis Commands
```bash
# Count total tests
cat test-results/results.json | jq '.stats.total'

# Check pass/fail status
cat test-results/results.json | jq '.stats.ok'

# List failed tests
cat test-results/results.json | jq '.tests[] | select(.outcome == "unexpected") | .title'

# Get test execution time
cat test-results/results.json | jq '.stats.duration'
```

---

## 🎯 CI/CD Integration Examples

### GitHub Actions
```yaml
- name: Run Playwright Tests
  run: npx playwright test

- name: Upload HTML Report
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: playwright-report
    path: test-results/html/

- name: Publish JUnit Results
  uses: dorny/test-reporter@v1
  if: always()
  with:
    name: Playwright Tests
    path: test-results/junit.xml
    reporter: java-junit
```

### Jenkins
```groovy
post {
    always {
        publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'test-results/html',
            reportFiles: 'index.html',
            reportName: 'Playwright Report'
        ])
        
        publishTestResults testResultsPattern: 'test-results/junit.xml'
    }
}
```

---

## 📈 Report Features by Format

| Feature | HTML | JSON | JUnit |
|---------|------|------|-------|
| Interactive UI | ✅ | ❌ | ❌ |
| Screenshots | ✅ | 📝 | ❌ |
| Videos | ✅ | 📝 | ❌ |
| Test Timeline | ✅ | ✅ | ❌ |
| Error Details | ✅ | ✅ | ✅ |
| CI/CD Integration | ⚠️ | ✅ | ✅ |
| Machine Readable | ❌ | ✅ | ✅ |
| Test Metrics | ✅ | ✅ | ✅ |
| Filtering | ✅ | 📝 | ❌ |

**Legend:** ✅ Full Support | ⚠️ Limited | ❌ Not Available | 📝 Via Processing

---

## 🔍 Troubleshooting

### Common Issues

**HTML report not opening:**
```bash
# Fix: Use the Playwright command
npx playwright show-report test-results/html
```

**JSON report too large:**
```bash
# View summary only
cat test-results/results.json | jq '.stats'
```

**JUnit XML validation:**
```bash
# Check if valid XML
xmllint --noout test-results/junit.xml
```

### Report Configuration

All report settings are configured in `playwright.config.ts`:
```typescript
reporter: [
  ['html', { outputFolder: 'test-results/html' }],
  ['json', { outputFile: 'test-results/results.json' }],
  ['junit', { outputFile: 'test-results/junit.xml' }],
  ['github'] // For GitHub Actions
],
```

---

## 🎉 Your Current Setup

Based on your configuration, every test run automatically generates:

1. **📊 Interactive HTML Report** - `test-results/html/index.html`
2. **🤖 JSON Data Report** - `test-results/results.json` 
3. **⚙️ JUnit XML Report** - `test-results/junit.xml`
4. **🔗 GitHub Actions Report** - Integrated with GitHub UI

**Total Tests Covered:** 100 tests across 4 comprehensive suites! 🚀
