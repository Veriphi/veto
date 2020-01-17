import React, { Fragment } from 'react'
import { addDecorator, addParameters } from '@storybook/react'
import { FlameGlobalStyles, Box } from '@lightspeed/flame/Core'
import ThemeProvider from '../../theme/ThemeProvider'

// Story Wrapper for providers such as ThemeProvider
const StoriesWrapper = ({ children }) => (
  <Box p="1em">
    <FlameGlobalStyles />
    <ThemeProvider>{children}</ThemeProvider>
  </Box>
)
const StoriesDecorator = (storyFn) => <StoriesWrapper>{storyFn()}</StoriesWrapper>
addDecorator(StoriesDecorator)
addParameters({
  options: {
    name: 'Veto UI',
    panelPosition: 'right',
  },
})
