'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed requests 1 time
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    },
  },
})

/**
 * Provides the React Query client to the application.
 * Configures default options for queries, including retry logic.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to wrap with the provider.
 * @returns {JSX.Element} The React Query provider component.
 */
export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
} 