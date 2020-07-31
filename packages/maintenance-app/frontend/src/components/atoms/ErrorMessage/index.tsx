import React, { ReactNode } from 'react'
import { Text } from '@veriphi/veto-ui'

export default ({ children }: { children: ReactNode }) => (
  <Text color="cancel" sx={{ fontSize: '16px' }}>
    {children}
  </Text>
)
