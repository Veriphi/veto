import React from 'react'
import { Label, Text, Box, Flex, Button } from '@veriphi/veto-ui'
import useBitcoinOnion from '../../../hooks/useBitcoinOnion'
import ErrorMessage from '../../atoms/ErrorMessage'

function renderOnionAddress(isValidating: boolean, error?: string, address?: string) {
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
const BitcoinOnionForm = () => {
  const { onionAddress, onionError, isValidating } = useBitcoinOnion()

  return (
    <Box>
      <Text variant="heading2">Bitcoin Core Address</Text>

      <Label>Onion Address</Label>

      <Flex>{renderOnionAddress(isValidating, onionError, onionAddress)}</Flex>
    </Box>
  )
}

export default BitcoinOnionForm
