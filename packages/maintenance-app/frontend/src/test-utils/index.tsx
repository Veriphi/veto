import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'emotion-theming'
import { lightTheme } from '@veriphi/veto-ui'

const AllTheProviders: React.ComponentType = ({ children }) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
}

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { ...options, wrapper: AllTheProviders })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
