"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const forcedTheme = props.forcedTheme
  const renderedTheme = mounted ? props.themes?.find((t) => t === forcedTheme) ?? forcedTheme : undefined

  if (!mounted && !forcedTheme) {
    return <>{children}</>
  }
  
  // Apply theme class to html tag to enable theme.
  if (typeof window !== 'undefined') {
    const applyTheme = (theme: string) => {
      document.documentElement.className = theme;
    }
    if (props.forcedTheme) {
      applyTheme(props.forcedTheme)
    } else {
      const stored = localStorage.getItem(props.storageKey ?? 'theme')
      if (stored && props.themes?.includes(stored)) {
        applyTheme(stored)
      } else if (props.enableSystem) {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        applyTheme(systemTheme)
      } else {
        applyTheme(props.defaultTheme ?? 'light')
      }
    }
  }

  return <NextThemesProvider {...props} forcedTheme={renderedTheme}>{children}</NextThemesProvider>
}
