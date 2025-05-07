import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'
type Direction = 'ltr' | 'rtl';

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultDirection?: Direction
  storageKey?: string
  directionKey?: string
}

type ThemeProviderState = {
  theme: Theme
  direction: Direction
  setTheme: (theme: Theme) => void
  setDirection: (dir: Direction) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  direction: 'ltr',
  setTheme: () => null,
  setDirection: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultDirection = 'ltr',
  storageKey = 'vite-ui-theme',
  directionKey = 'vite-ui-direction',
  ...props
}: ThemeProviderProps) {
  const [theme, _setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

    const [direction, _setDirection] = useState<Direction>(
    () => (localStorage.getItem(directionKey) as Direction) || defaultDirection
  )

  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const savedDirection = localStorage.getItem(directionKey) as Direction
    document.documentElement.dir = savedDirection || direction;
    const applyTheme = (theme: Theme) => {
      root.classList.remove('light', 'dark') // Remove existing theme classes
      const systemTheme = mediaQuery.matches ? 'dark' : 'light'
      const effectiveTheme = theme === 'system' ? systemTheme : theme
      root.classList.add(effectiveTheme) // Add the new theme class
    }

    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    applyTheme(theme)

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, direction, directionKey])

  const setTheme = (theme: Theme) => {
    localStorage.setItem(storageKey, theme)
    _setTheme(theme)
  }

    const setDirection = (dir: Direction) => {
    localStorage.setItem(directionKey, dir)
    _setDirection(dir)
  }

  const value = {
    theme,
    direction,
    setTheme,
    setDirection
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
