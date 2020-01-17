import { lighten, darken } from 'polished'
import colors from './colors'

const createButtonStyles = (color: string, fill: boolean = false) => ({
  backgroundImage: fill ? `linear-gradient(to bottom, ${lighten(0.05, color)}, ${color})` : undefined,
  backgroundColor: fill ? color : 'transparent',
  borderColor: fill ? darken(0.05, color) : color,
  color: fill ? colors.white : color,
  '&:hover': {
    backgroundImage: 'none',
    color: fill ? colors.white : color,
    backgroundColor: fill ? color : 'transparent',
    borderColor: fill ? 'rgba(12,13,13,0.5)' : color,
  },
  '&:active': {
    backgroundImage: 'none',
    color: fill ? colors.white : color,
    backgroundColor: fill ? darken(0.05, color) : 'none',
    boxShadow: `inset 0 1px 0 0 ${darken(0.1, color)}`,
    borderColor: fill ? 'rgba(12,13,13,0.5)' : color,
  },
})

// Button Variants
export default {
  outline: {
    plain: createButtonStyles(colors.tertiary, false),
  },

  fill: {
    primary: createButtonStyles(colors.primary, true),
    secondary: createButtonStyles(colors.secondary, true),
    danger: createButtonStyles(colors.danger, true),
    neutral: createButtonStyles(colors.tertiary, true),
  },
}
