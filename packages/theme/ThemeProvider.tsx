import React from 'react'
import { ThemeProvider } from 'emotion-theming'

import theme from '.'

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>
