/** @jsx jsx */
import { jsx, css } from '@emotion/core'
// import React from 'react'
import { Button } from '@lightspeed/flame/Button'

type Props = {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'neutral' | 'danger' | 'plain'
}

export default (props) => {
  const { variant = 'plain' } = props
  return (
    <Button
      data-testid="Button"
      {...props}
      variant={variant}
      css={
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
