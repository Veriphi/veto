import React from 'react'
import { Router, RouteComponentProps } from '@reach/router'
import { ThemeProvider } from 'emotion-theming'
import { getTheme, GlobalStyles } from '@veriphi/veto-ui'
import MainLayout from './layouts/MainLayout'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import { Global, css } from '@emotion/core'

const App = () => {
  type ThemeName = 'light' | 'dark' | undefined

  const [themeName] = React.useState<ThemeName>('light')
  const theme = getTheme(themeName)

  return (
    <ThemeProvider theme={theme}>
      {/* Veto-ui necessary globals */}
      <GlobalStyles />

      {/* Global css reset */}
      <Global
        styles={css`
          html,
          body {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
        `}
      />
      <Router data-testid="Router">
        <RouterPage path="/" pageComponent={<Welcome />} />
        <MainLayout path="/*" />
      </Router>
    </ThemeProvider>
  )
}

// This RouterPage Component is to ensure proper typing on children components to <Router /> by @reach/router
const RouterPage = (props: { pageComponent: JSX.Element } & RouteComponentProps) => props.pageComponent

export default App
