import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Version } from '../components/Version'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />
  }

  const handleLogout = async () => {
    logout()
    navigate('/')
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user.name || user.email}!</p>
        <button 
          onClick={handleLogout}
          data-testid="logout-btn"
          style={{ 
            marginTop: '1rem', 
            padding: '0.5rem 1rem', 
            backgroundColor: '#e74c3c', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Account Status</h3>
          <p>Email: {user.email}</p>
          <p>Status: {user.isVerified ? '✅ Verified' : '⚠️ Unverified'}</p>
          <p>User ID: {user.id}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Test Automation Features</h3>
          <ul style={{ textAlign: 'left', paddingLeft: '1rem' }}>
            <li>UI Testing with Playwright</li>
            <li>Authentication Flows</li>
            <li>Email Verification</li>
            <li>API Integration Testing</li>
          </ul>
        </div>
        
        <div className="dashboard-card">
          <h3>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button 
              onClick={() => window.location.href = '/todos'}
              data-testid="goto-todos-btn"
            >
              Go to Todo App
            </button>
            <button 
              onClick={() => window.open('https://mailinator.com', '_blank')}
              data-testid="mailinator-btn"
            >
              Check Mailinator
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>Test Coverage</h3>
          <div style={{ textAlign: 'left' }}>
            <p>📊 <strong>UI Tests:</strong> 15 test cases</p>
            <p>🔐 <strong>Auth Tests:</strong> 8 test cases</p>
            <p>📧 <strong>Email Tests:</strong> 5 test cases</p>
            <p>🌐 <strong>API Tests:</strong> 12 test cases</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-card">
        <h3>Session Information</h3>
        <p><strong>Login Time:</strong> {new Date().toLocaleString()}</p>
        <p><strong>Browser:</strong> {navigator.userAgent.split(')')[0].split('(')[1]}</p>
        <p><strong>Session Active:</strong> ✅</p>
        
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h4>Security Features Tested:</h4>
          <ul style={{ textAlign: 'left', margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
            <li>JWT Token Management</li>
            <li>Session Storage Security</li>
            <li>CSRF Protection</li>
            <li>Secure Cookie Handling</li>
            <li>XSS Prevention</li>
          </ul>
        </div>
      </div>
      
      <Version />
    </div>
  )
}
