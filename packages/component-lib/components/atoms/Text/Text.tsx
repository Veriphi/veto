/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {
  Heading1 as FlameHeading1,
  Heading2 as FlameHeading2,
  Heading3 as FlameHeading3,
  Heading4 as FlameHeading4,
  Text as FlameText,
  TextProps,
} from '@lightspeed/flame/Text'
import { Merge } from 'type-fest'

type Props = Merge<TextProps, { children: string; onClick?: () => void }>

export const Text = (props: Props) => (
  <FlameText data-testid="Text" color="black" fontWeight="normal" fontSize="small" {...props} />
)
export const Heading1 = (props: Props) => (
  <FlameHeading1 data-testid="Heading1" color="textBody" fontWeight="lighter" {...props} />
)
export const Heading2 = (props: Props) => (
  <FlameHeading2 data-testid="Heading2" color="textBody" fontWeight="normal" {...props} />
)
export const Heading3 = (props: Props) => (
  <FlameHeading3 data-testid="Heading3" color="textBody" fontWeight="normal" {...props} />
)
export const Heading4 = (props: Props) => (
  <FlameHeading4
    data-testid="Heading4"
    color="textBody"
    fontWeight="normal"
    {...props}
    css={css`
      letter-spacing: 0.5px;
    `}
  />
)
