import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const { user, login, isLoading } = useAuth()

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const result = await login(formData.email, formData.password)
    
    if (!result.success) {
      setError(result.error || 'Login failed')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      
      <form onSubmit={handleSubmit} data-testid="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            data-testid="email-input"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            data-testid="password-input"
            placeholder="Enter your password"
          />
        </div>
        
        {error && (
          <div className="error-message" data-testid="error-message">
            {error}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isLoading}
          data-testid="login-button"
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#e8f4f8', borderRadius: '4px' }}>
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: test@example.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  )
}
