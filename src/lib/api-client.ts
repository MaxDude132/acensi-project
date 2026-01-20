import { API_BASE_URL, API_TIMEOUT } from '@/config/env'

interface RequestConfig extends RequestInit {
  timeout?: number
}

interface ApiError extends Error {
  status?: number
  data?: unknown
}

class ApiClient {
  private baseUrl: string
  private defaultTimeout: number
  private isRefreshing = false
  private refreshPromise: Promise<boolean> | null = null

  constructor(baseUrl: string = API_BASE_URL, timeout: number = API_TIMEOUT) {
    this.baseUrl = baseUrl
    this.defaultTimeout = timeout
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {},
    retry = true
  ): Promise<T> {
    const { timeout = this.defaultTimeout, ...fetchConfig } = config
    const url = `${this.baseUrl}${endpoint}`

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    try {
      const response = await fetch(url, {
        ...fetchConfig,
        signal: controller.signal,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...fetchConfig.headers,
        },
      })

      clearTimeout(timeoutId)

      if (response.status === 401 && retry && !endpoint.includes('auth/')) {
        const refreshed = await this.refreshToken()
        if (refreshed) {
          return this.request<T>(endpoint, config, false)
        }
        const error: ApiError = new Error('Authentication required')
        error.status = 401
        throw error
      }

      if (!response.ok) {
        const error: ApiError = new Error(`HTTP error! status: ${response.status}`)
        error.status = response.status
        try {
          error.data = await response.json()
        } catch {
          // Response is not JSON
        }
        throw error
      }

      const text = await response.text()
      return (text ? JSON.parse(text) : null) as T
    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof Error && error.name === 'AbortError') {
        const timeoutError: ApiError = new Error('Request timeout')
        timeoutError.status = 408
        throw timeoutError
      }
      throw error
    }
  }

  private async refreshToken(): Promise<boolean> {
    if (this.isRefreshing && this.refreshPromise) {
      return this.refreshPromise
    }

    this.isRefreshing = true
    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${this.baseUrl}auth/token/refresh/`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        })
        return response.ok
      } catch {
        return false
      } finally {
        this.isRefreshing = false
        this.refreshPromise = null
      }
    })()

    return this.refreshPromise
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' })
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' })
  }
}

export const apiClient = new ApiClient()
export default apiClient
