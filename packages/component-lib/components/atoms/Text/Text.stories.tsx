import React from 'react'
import { Text, Heading1, Heading2, Heading3, Heading4 } from './Text'
import { Box } from '@lightspeed/flame/Core'

export default {
  title: 'Text',
  component: Text,
}

export const Types = () => (
  <Box>
    <Heading1>This is a Heading1</Heading1>
    <Heading2>This is a Heading2</Heading2>
    <Heading3>This is a Heading3</Heading3>
    <Heading4>This is a Heading4</Heading4>
    <Text>This is just some default text.</Text>
  </Box>
)

export const Colors = () => (
  <Box>
    <Heading1>Close Channel</Heading1>
    <Heading2 color="primary">IMPORTANT</Heading2>
    <Heading4>ON-CHAIN BALANCE</Heading4>
    <Text>Write down your recovery seed words ...</Text>
  </Box>
)
