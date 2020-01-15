import { lightTheme } from '@lightspeed/flame/Core'
// import { lighten, darken } from 'polished'

// ----- Constants -----

// Colors
const highlight = '#f5912e'
const main = '#2a335b'
const homeBg = '#FFFDFD'

// border radii
const buttonRadius = '0.35rem'

// Extending the Flame theme
export default {
  ...lightTheme,

  textStyles: {
    ...lightTheme.textStyles,
    color: main,
  },
  colors: {
    ...lightTheme.colors,
    highlight: highlight,
    main: main,
    textHeading: main,
    homeBg: homeBg,
  },
  breakpoints: [...lightTheme.breakpoints, '1400px'],
}
