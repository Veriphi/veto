import React from 'react'
import { Input, Label, Text, Box, Select, Flex, Button } from '@veriphi/veto-ui'
import useNewAddress from '../../../hooks/useNewAddress'
import ErrorMessage from '../../atoms/ErrorMessage'

function renderAddress(isValidating: boolean, error?: string, address?: string) {
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>
  } else if (isValidating) {
    return '...Fetching new address...'
  }

  return (
    <>
      <Text>{address}</Text>
      <Button>copy to clipboard</Button>
    </>
  )
}
const ReceiveBTC = () => {
  const { address, addressError, isValidating } = useNewAddress()

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

      <Flex>{renderAddress(isValidating, addressError, address)}</Flex>
    </Box>
  )
}

export default ReceiveBTC
