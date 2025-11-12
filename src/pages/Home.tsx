import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>QA Playwright Test Automation Portfolio</h1>
      <p>
        Welcome to my comprehensive test automation portfolio demonstrating 
        Playwright testing capabilities with React applications.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '2rem 0' }}>
        <div className="card">
          <h3>🧪 UI Testing</h3>
          <p>Comprehensive Playwright tests for user interactions, form validation, and navigation flows.</p>
          <Link to="/todos">
            <button>Try Todo App</button>
          </Link>
        </div>
        
        <div className="card">
          <h3>🔐 Authentication Testing</h3>
          <p>Login flows, session management, and secure authentication state handling.</p>
          <Link to="/login">
            <button>Try Login</button>
          </Link>
        </div>
        
        <div className="card">
          <h3>📧 Email Verification</h3>
          <p>End-to-end email verification testing using Mailinator API integration.</p>
          <Link to="/register">
            <button>Try Registration</button>
          </Link>
        </div>
        
        <div className="card">
          <h3>⚡ MCP Server Integration</h3>
          <p>Distributed test execution with Playwright MCP server for scalable testing.</p>
          <p><em>View test results in CI/CD pipeline</em></p>
        </div>
      </div>
      
      <div style={{ margin: '3rem 0' }}>
        <h2>Portfolio Features</h2>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>✅ Basic UI Tests (Todo CRUD operations)</li>
          <li>✅ Authentication Flows (Login/Register/Logout)</li>
          <li>✅ Email Verification with Mailinator API</li>
          <li>✅ Page Object Model Design Pattern</li>
          <li>✅ Cross-browser Testing (Chromium + WebKit)</li>
          <li>✅ Test Sharding and Parallel Execution</li>
          <li>✅ CI/CD Integration with GitHub Actions</li>
          <li>✅ Test Artifacts (Reports, Traces, Videos)</li>
          <li>✅ Secure Secrets Management</li>
        </ul>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <p><strong>Tech Stack:</strong> React + TypeScript + Vite + Playwright + MCP</p>
        <p><strong>Testing:</strong> E2E Testing, API Testing, Visual Regression, Performance</p>
        <p><strong>CI/CD:</strong> GitHub Actions, Docker, Test Reporting, Artifact Management</p>
      </div>
    </div>
  )
}
