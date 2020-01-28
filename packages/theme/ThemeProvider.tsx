import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { FlameGlobalStyles } from '@lightspeed/flame/Core'
import { Global, css } from '@emotion/core'

import theme from '.'

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    <FlameGlobalStyles />
    <Global
      styles={(theme) => css`
        body {
          font-family: ${theme.fontFamily['sans-serif']};
        }
      `}
    />
    {children}
  </ThemeProvider>
)
