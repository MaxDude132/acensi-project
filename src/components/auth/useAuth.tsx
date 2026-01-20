import { useAuthStore } from '@/lib/auth-store'

const useAuth = () => {
  const { isAuthenticated, isLoading, user, login, logout, fetchUser, clear } = useAuthStore()
  return { isAuthenticated, isLoading, user, login, logout, fetchUser, clear }
}

export default useAuth
