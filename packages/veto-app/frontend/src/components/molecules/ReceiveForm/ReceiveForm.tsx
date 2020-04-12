import React from 'react'
import { Input, Label, Text, Box, Select, Flex, Button } from '@veriphi/veto-ui'
import useNewAddress from '../../../hooks/useNewAddress'
import ErrorMessage from 'components/atoms/ErrorMessage'

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

      <Flex>
        {addressError ? (
          <ErrorMessage>{addressError}</ErrorMessage>
        ) : isValidating ? (
          '...Fetching new address...'
        ) : (
          <>
            <Text>{address}</Text>
            <Button>copy to clipboard</Button>
          </>
        )}
      </Flex>
    </Box>
  )
}

export default ReceiveBTC
