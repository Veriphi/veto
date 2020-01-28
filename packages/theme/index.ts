import { lightTheme } from '@lightspeed/flame/Core'
import deepmerge from 'deepmerge'
import colors from './colors'
import buttonVariants from './buttonVariants'

// Extending the Flame theme
export default {
  ...lightTheme,

  fontFamily: {
    ...lightTheme.fontFamily,
    ...{
      'sans-serif': 'Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
  },

  colors: deepmerge(lightTheme.colors, colors),

  breakpoints: [...lightTheme.breakpoints, '1400px'],

  buttonVariants: deepmerge(lightTheme.buttonVariants, buttonVariants),
}
