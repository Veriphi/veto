import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'emotion-theming'
import { getTheme } from '@veriphi/veto-ui'

type ThemeName = 'light' | 'dark' | undefined

const [themeName, setThemeName] = React.useState<ThemeName>('light')
const theme = getTheme(themeName)

const AllTheProviders: React.ComponentType = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { ...options, wrapper: AllTheProviders })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
