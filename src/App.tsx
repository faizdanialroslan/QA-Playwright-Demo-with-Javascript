import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import TodoApp from './pages/TodoApp'
import Register from './pages/Register'
import VerifyEmail from './pages/VerifyEmail'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="todos" element={<TodoApp />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
