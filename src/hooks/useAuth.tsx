import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import Cookies from 'js-cookie'

interface User {
  id: string
  email: string
  name?: string
  isVerified: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  verifyEmail: (token: string) => Promise<{ success: boolean; error?: string }>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

// Mock API calls - In real app, these would call your backend
const api = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock validation
    if (email === 'test@example.com' && password === 'password123') {
      const user = {
        id: '1',
        email,
        name: 'Test User',
        isVerified: true
      }
      Cookies.set('auth_token', 'mock-jwt-token', { expires: 7 })
      Cookies.set('user', JSON.stringify(user), { expires: 7 })
      return { success: true, user }
    }
    
    return { success: false, error: 'Invalid credentials' }
  },
  
  register: async (email: string, password: string, name?: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock validation
    if (email && password && password.length >= 6) {
      const user = {
        id: Date.now().toString(),
        email,
        name: name || email.split('@')[0],
        isVerified: false
      }
      
      // Don't auto-login on registration, require email verification
      return { success: true, user }
    }
    
    return { success: false, error: 'Registration failed. Check your inputs.' }
  },
  
  verifyEmail: async (token: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (token === 'valid-token') {
      return { success: true }
    }
    
    return { success: false, error: 'Invalid verification token' }
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth on mount
    const token = Cookies.get('auth_token')
    const savedUser = Cookies.get('user')
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        Cookies.remove('auth_token')
        Cookies.remove('user')
      }
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    
    try {
      const result = await api.login(email, password)
      
      if (result.success && result.user) {
        setUser(result.user)
      }
      
      return result
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true)
    
    try {
      const result = await api.register(email, password, name)
      return result
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('auth_token')
    Cookies.remove('user')
  }

  const verifyEmail = async (token: string) => {
    setIsLoading(true)
    
    try {
      const result = await api.verifyEmail(token)
      
      if (result.success && user) {
        const updatedUser = { ...user, isVerified: true }
        setUser(updatedUser)
        Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 })
      }
      
      return result
    } catch (error) {
      return { success: false, error: 'Email verification failed. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      verifyEmail,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
