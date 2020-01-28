/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Dropdown } from '@lightspeed/flame/Dropdown'
import { Box } from '@lightspeed/flame/Core'

type Props = {
  children: React.ReactNode
  buttonContent: React.ReactNode
}

export default (props: Props) => <Dropdown data-testid="Dropdown" {...props} />

type OptionProps = {
  children: React.ReactNode
  onClick: () => void
}

export const DropdownOptionCard = (props: OptionProps) => (
  <Box
    p={2}
    css={css`
      transform: translateY(-8px);
      cursor: pointer;
    `}
    {...props}
  />
)
