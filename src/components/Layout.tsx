import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Layout() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/todos" className={isActive('/todos') ? 'active' : ''}>
              Todo App
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={logout} data-testid="logout-btn">
                  Logout ({user.email})
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={isActive('/login') ? 'active' : ''}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className={isActive('/register') ? 'active' : ''}>
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
