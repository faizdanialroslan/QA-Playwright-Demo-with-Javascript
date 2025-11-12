import { Link } from 'react-router-dom'
import { Version } from '../components/Version'

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
      </div>
      
      <div style={{ margin: '3rem 0', textAlign: 'center' }}>
        <h2>Portfolio Features</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ margin: '0.5rem 0', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '30px', textAlign: 'center' }}>✅</span>
            <span>Basic UI Tests (Todo CRUD operations)</span>
          </div>
          <div style={{ margin: '0.5rem 0', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '30px', textAlign: 'center' }}>✅</span>
            <span>Authentication Flows (Login/Register/Logout)</span>
          </div>
          <div style={{ margin: '0.5rem 0', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '30px', textAlign: 'center' }}>✅</span>
            <span>Email Verification with Mailinator API</span>
          </div>
          <div style={{ margin: '0.5rem 0', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '30px', textAlign: 'center' }}>✅</span>
            <span>Page Object Model Design Pattern</span>
          </div>
          <div style={{ margin: '0.5rem 0', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '30px', textAlign: 'center' }}>✅</span>
            <span>Cross-browser Testing (Chromium + WebKit)</span>
          </div>
          <div style={{ margin: '0.5rem 0', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '30px', textAlign: 'center' }}>✅</span>
            <span>Test Sharding and Parallel Execution</span>
          </div>
          <div style={{ margin: '0.5rem 0', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '30px', textAlign: 'center' }}>✅</span>
            <span>CI/CD Integration with GitHub Actions</span>
          </div>
          <div style={{ margin: '0.5rem 0', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '30px', textAlign: 'center' }}>✅</span>
            <span>Test Artifacts (Reports, Traces, Videos)</span>
          </div>
          <div style={{ margin: '0.5rem 0', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            <span style={{ minWidth: '30px', textAlign: 'center' }}>✅</span>
            <span>Secure Secrets Management</span>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#DAA520', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', maxWidth: '800px', margin: '2rem auto' }}>
        <p style={{ margin: '0.8rem 0', fontSize: '1.1rem', lineHeight: '1.6' }}><strong>Tech Stack:</strong> React + TypeScript + Vite + Playwright</p>
        <p style={{ margin: '0.8rem 0', fontSize: '1.1rem', lineHeight: '1.6' }}><strong>Testing:</strong> E2E Testing, API Testing, Visual Regression, Performance</p>
        <p style={{ margin: '0.8rem 0', fontSize: '1.1rem', lineHeight: '1.6' }}><strong>CI/CD:</strong> GitHub Actions, Docker, Test Reporting, Artifact Management</p>
      </div>
      
      <Version />
    </div>
  )
}
