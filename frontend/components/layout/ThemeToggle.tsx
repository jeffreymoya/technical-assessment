'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

/**
 * Renders a button with a dropdown menu to toggle between light, dark, and system themes.
 * Utilizes `next-themes` to manage theme state.
 *
 * @returns {JSX.Element | null} The theme toggle button and dropdown, or a disabled button if not yet mounted.
 */
export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled className="opacity-50" />;
  }

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-md border bg-popover p-1 shadow-md z-[9999]">
          <button
            className="w-full rounded-sm px-2 py-1.5 text-sm text-left hover:bg-accent hover:text-accent-foreground"
            onClick={() => handleSetTheme('light')}
          >
            Light
          </button>
          <button
            className="w-full rounded-sm px-2 py-1.5 text-sm text-left hover:bg-accent hover:text-accent-foreground"
            onClick={() => handleSetTheme('dark')}
          >
            Dark
          </button>
          <button
            className="w-full rounded-sm px-2 py-1.5 text-sm text-left hover:bg-accent hover:text-accent-foreground"
            onClick={() => handleSetTheme('system')}
          >
            System
          </button>
        </div>
      )}
    </div>
  )
} 