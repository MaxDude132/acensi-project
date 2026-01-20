import type { ReactNode } from 'react'
import { Navigate, useLocation } from '@tanstack/react-router'
import useAuth from './useAuth'

interface ProtectedRouteProps {
  children: ReactNode
  isAuthenticated?: boolean
  redirectTo?: string
}

function ProtectedRoute({
  children,
  isAuthenticated: isAuthProp,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const location = useLocation()
  const { isAuthenticated: isAuthHook } = useAuth()
  
  const isAuthenticated = isAuthProp ?? isAuthHook

  if (!isAuthenticated) {
    // Redirect to login with return URL
    return (
      <Navigate
        to={redirectTo}
        search={{ returnTo: location.pathname }}
        replace
      />
    )
  }

  return <>{children}</>
}

export default ProtectedRoute
