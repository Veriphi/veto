/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Button, ButtonProps } from '@lightspeed/flame/Button'
import { Merge } from 'type-fest'

type Props = Merge<
  ButtonProps,
  {
    variant?: 'primary' | 'secondary' | 'neutral' | 'danger' | 'plain'
  }
>

export default (props: Props) => {
  const { variant = 'plain' } = props
  return (
    <Button
      data-testid="Button"
      {...props}
      variant={variant}
      css={
        // This allows for icon children to be styled the right color (exclusive to "plain" type buttons)
        variant === 'plain' &&
        ((theme) => css`
          svg {
            fill: ${theme.colors.tertiary};
          }
        `)
      }
    />
  )
}
