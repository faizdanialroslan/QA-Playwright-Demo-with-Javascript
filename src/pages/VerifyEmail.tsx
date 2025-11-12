import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('')
  const { verifyEmail } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage('No verification token provided')
      return
    }

    const verify = async () => {
      const result = await verifyEmail(token)
      
      if (result.success) {
        setStatus('success')
        setMessage('Email verified successfully! You can now login.')
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        setStatus('error')
        setMessage(result.error || 'Email verification failed')
      }
    }

    verify()
  }, [searchParams, verifyEmail, navigate])

  return (
    <div className="auth-container">
      <h2>Email Verification</h2>
      
      {status === 'verifying' && (
        <div data-testid="verifying-status">
          <p>Verifying your email address...</p>
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <div style={{ 
              display: 'inline-block',
              width: '20px',
              height: '20px',
              border: '2px solid #f3f3f3',
              borderTop: '2px solid #646cff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        </div>
      )}
      
      {status === 'success' && (
        <div data-testid="success-status" className="success-message">
          <h3>✅ Success!</h3>
          <p>{message}</p>
          <p>Redirecting to login page...</p>
        </div>
      )}
      
      {status === 'error' && (
        <div data-testid="error-status" className="error-message">
          <h3>❌ Verification Failed</h3>
          <p>{message}</p>
          
          <div style={{ marginTop: '1rem' }}>
            <button 
              onClick={() => navigate('/register')}
              style={{ marginRight: '1rem' }}
            >
              Try Again
            </button>
            <button onClick={() => navigate('/login')}>
              Go to Login
            </button>
          </div>
        </div>
      )}
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f8ff', borderRadius: '4px' }}>
        <h4>For Demo Purposes:</h4>
        <p>
          To simulate successful verification, use the token: <code>valid-token</code>
        </p>
        <p>
          Example: <code>/verify-email?token=valid-token</code>
        </p>
      </div>
    </div>
  )
}
