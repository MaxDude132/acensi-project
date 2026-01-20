import { useQuery, useMutation, useQueryClient, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'

// ============================================
// DRF Standard Types
// ============================================

/** DRF standard paginated response format */
export interface DRFPaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

/** DRF standard error response */
export interface DRFErrorResponse {
  detail?: string
  non_field_errors?: string[]
  [field: string]: string | string[] | undefined
}

/** Standard list filters for DRF endpoints */
export interface DRFListFilters {
  page?: number
  page_size?: number
  search?: string
  ordering?: string // e.g., '-created_at' for descending
}

// ============================================
// Helper: Build query params for DRF
// ============================================
export function buildQueryParams(filters: DRFListFilters): string {
  const params = new URLSearchParams()

  if (filters.page) params.append('page', String(filters.page))
  if (filters.page_size) params.append('page_size', String(filters.page_size))
  if (filters.search) params.append('search', filters.search)
  if (filters.ordering) params.append('ordering', filters.ordering)

  const queryString = params.toString()
  return queryString ? `?${queryString}` : ''
}

// ============================================
// Query Key Factory Helper
// ============================================
// Use this pattern for each entity:
//
// export const queryKeys = {
//   users: {
//     all: ['users'] as const,
//     lists: () => [...queryKeys.users.all, 'list'] as const,
//     list: (filters: DRFListFilters) => [...queryKeys.users.lists(), filters] as const,
//     details: () => [...queryKeys.users.all, 'detail'] as const,
//     detail: (id: number) => [...queryKeys.users.details(), id] as const,
//   },
// }

// ============================================
// Generic Hook Factories
// ============================================

/** Create a hook for fetching a paginated list */
export function createListQuery<T>(
  endpoint: string,
  queryKey: readonly unknown[]
) {
  return function useList(
    filters: DRFListFilters = {},
    options?: Omit<UseQueryOptions<DRFPaginatedResponse<T>>, 'queryKey' | 'queryFn'>
  ) {
    return useQuery({
      queryKey: [...queryKey, 'list', filters],
      queryFn: () => apiClient.get<DRFPaginatedResponse<T>>(`${endpoint}${buildQueryParams(filters)}`),
      ...options,
    })
  }
}

/** Create a hook for fetching a single item */
export function createDetailQuery<T>(
  endpoint: string,
  queryKey: readonly unknown[]
) {
  return function useDetail(
    id: number,
    options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
  ) {
    return useQuery({
      queryKey: [...queryKey, 'detail', id],
      queryFn: () => apiClient.get<T>(`${endpoint}${id}/`),
      enabled: !!id,
      ...options,
    })
  }
}

/** Create a hook for creating an item */
export function createCreateMutation<T, TInput>(
  endpoint: string,
  queryKey: readonly unknown[]
) {
  return function useCreate(options?: UseMutationOptions<T, Error, TInput>) {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (data: TInput) => apiClient.post<T>(endpoint, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
      },
      ...options,
    })
  }
}

/** Create a hook for updating an item (PATCH) */
export function createUpdateMutation<T, TInput>(
  endpoint: string,
  queryKey: readonly unknown[]
) {
  return function useUpdate(options?: UseMutationOptions<T, Error, { id: number; data: TInput }>) {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: ({ id, data }) => apiClient.patch<T>(`${endpoint}${id}/`, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: [...queryKey, 'detail', id] })
        queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
      },
      ...options,
    })
  }
}

/** Create a hook for deleting an item */
export function createDeleteMutation(
  endpoint: string,
  queryKey: readonly unknown[]
) {
  return function useDelete(options?: UseMutationOptions<void, Error, number>) {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (id) => apiClient.delete<void>(`${endpoint}${id}/`),
      onSuccess: (_, id) => {
        queryClient.removeQueries({ queryKey: [...queryKey, 'detail', id] })
        queryClient.invalidateQueries({ queryKey: [...queryKey, 'list'] })
      },
      ...options,
    })
  }
}

// ============================================
// Usage Example
// ============================================
/*
// 1. Define your types
interface User {
  id: number
  email: string
  username: string
}

interface CreateUserInput {
  email: string
  username: string
  password: string
}

// 2. Create query key
const userKeys = ['users'] as const

// 3. Create hooks using factories
export const useUsers = createListQuery<User>('/users/', userKeys)
export const useUser = createDetailQuery<User>('/users/', userKeys)
export const useCreateUser = createCreateMutation<User, CreateUserInput>('/users/', userKeys)
export const useUpdateUser = createUpdateMutation<User, Partial<CreateUserInput>>('/users/', userKeys)
export const useDeleteUser = createDeleteMutation('/users/', userKeys)

// 4. Use in components
const { data } = useUsers({ page: 1, page_size: 10, ordering: '-date_joined' })
// Access: data.results, data.count, data.next, data.previous
*/
