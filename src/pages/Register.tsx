import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Version } from '../components/Version'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { register, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    const result = await register(formData.email, formData.password, formData.name)
    
    if (result.success) {
      setSuccess('Registration successful! Please check your email for verification.')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } else {
      setError(result.error || 'Registration failed')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const generateMailinatorEmail = () => {
    const randomId = Math.random().toString(36).substring(2, 15)
    const email = `testuser${randomId}@mailinator.com`
    setFormData(prev => ({ ...prev, email }))
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem', minHeight: '100vh' }}>
      <div className="auth-container">
        <h2>Register</h2>
      
      <form onSubmit={handleSubmit} data-testid="register-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-testid="name-input"
            placeholder="Enter your full name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              data-testid="email-input"
              placeholder="Enter your email"
              style={{ flex: 1 }}
            />
            <button 
              type="button" 
              onClick={generateMailinatorEmail}
              data-testid="generate-email-btn"
              style={{ fontSize: '0.8rem', padding: '0.5rem' }}
            >
              Generate Test Email
            </button>
          </div>
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
            placeholder="Enter your password (min 6 chars)"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            data-testid="confirm-password-input"
            placeholder="Confirm your password"
          />
        </div>
        
        {error && (
          <div className="error-message" data-testid="error-message">
            {error}
          </div>
        )}
        
        {success && (
          <div className="success-message" data-testid="success-message">
            {success}
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={isLoading}
          data-testid="register-button"
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
        
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#DAA520', borderRadius: '4px', color: '#000' }}>
          <p><strong>Email Verification Demo:</strong></p>
          <p>Use the "Generate Test Email" button to create a Mailinator email for testing email verification flows.</p>
        </div>
      </div>
      
      <Version />
    </div>
    </div>
  )
}
