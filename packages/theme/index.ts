import { lightTheme } from '@lightspeed/flame/Core'
import deepmerge from 'deepmerge'
import colors from './colors'
import buttonVariants from './buttonVariants'

// Extending the Flame theme
export default {
  ...lightTheme,

  colors: deepmerge(lightTheme.colors, colors),
  breakpoints: [...lightTheme.breakpoints, '1400px'],

  buttonVariants: deepmerge(lightTheme.buttonVariants, buttonVariants),
}
