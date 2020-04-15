import React, { ReactNode } from 'react'
import { Text } from '@veriphi/veto-ui'

type Props = {
  children: ReactNode
  [x: string]: any
}

export default ({ children, ...rest }: Props) => (
  <Text color="textFade" sx={{ fontSize: '16px', fontWeight: 600, textTransform: 'uppercase' }} {...rest}>
    {children}
  </Text>
)
