import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import apiClient from './api-client'

export interface User {
  id: number
  username: string
  email?: string
  first_name?: string
  last_name?: string
  [key: string]: unknown
}

interface LoginCredentials {
  username: string
  password: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
  setUser: (user: User) => void
  clear: () => void
}

const AUTH_ENDPOINTS = {
  login: 'auth/token/',
  logout: 'auth/logout/',
  refresh: 'auth/token/refresh/',
  user: 'auth/user/',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true })
        try {
          await apiClient.post(AUTH_ENDPOINTS.login, credentials)
          set({ isAuthenticated: true, isLoading: false })
          await get().fetchUser()
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        try {
          await apiClient.post(AUTH_ENDPOINTS.logout)
        } catch {
          // Ignore logout errors
        }
        get().clear()
      },

      fetchUser: async () => {
        try {
          const user = await apiClient.get<User>(AUTH_ENDPOINTS.user)
          set({ user, isAuthenticated: true })
        } catch {
          get().clear()
        }
      },

      setUser: (user) => set({ user }),

      clear: () =>
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
