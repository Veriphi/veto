import React from 'react'
import { Input, Label, Text, Box, Select, Flex, Button } from '@veriphi/veto-ui'

type Props = {
  address: string
}

const ReceiveBTC = ({ address }: Props) => {
  return (
    <Box>
      <Text variant="heading2">Receive BTC</Text>

      <Label>Receving Wallet</Label>
      <Select>
        <option>Core Wallet</option>
      </Select>
      <Label>Label</Label>
      <Input placeholder="Internal label for this transaction" />

      <Label>Address</Label>

      <Flex>
        <Text>{address}</Text>
        <Button>copy to clipboard</Button>
      </Flex>
    </Box>
  )
}

export default ReceiveBTC
