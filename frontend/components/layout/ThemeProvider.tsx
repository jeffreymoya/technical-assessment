'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

/**
 * Provides application-wide theme management using next-themes.
 *
 * @param {ThemeProviderProps} props - Props passed to the underlying NextThemesProvider.
 * @param {React.ReactNode} props.children - The child components to wrap with the theme provider.
 * @returns {JSX.Element} The theme provider component.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
} 