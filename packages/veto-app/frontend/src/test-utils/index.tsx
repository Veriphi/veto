import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'emotion-theming'
import { lightTheme } from '@veriphi/veto-ui'

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
}

const customRender = (ui, options?: any) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
