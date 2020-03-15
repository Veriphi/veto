import React, { useState } from 'react'
import { Input, Label, Text, Box, Select, Button, Flex } from '@veriphi/veto-ui'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import { useInput } from 'hooks/useInput'
import { spend } from 'api'

type Status = 'constructTx' | 'reviewTx' | 'sending' | 'successfulSend' | 'error'

const SendBTC = () => {
  // General State
  const [status, setStatus] = useState<Status>('constructTx')
  const [error, setError] = useState('')
  const [successData, setSuccessData] = useState({ status: '', hash: '' })

  // Input
  const amount = useInput('')
  const address = useInput('')
  const fees = useInput('')
  const label = useInput('')

  // Handlers
  const handleGoToReview = () => {
    // just make sure we have the important bits to construct the transaction
    if (!amount.value || !address.value || !fees.value) {
      return
    }
    setStatus('reviewTx')
  }

  const handleSend = async () => {
    setStatus('sending')
    try {
      const response = await spend({ address: address.value, amount: amount.value, eventMessage: label.value })
      setSuccessData({ hash: response.hash, status: response.status })
      setStatus('successfulSend')
    } catch (spendError) {
      setError(spendError.message)
      setStatus('error')
    }
  }

  return (
    <Box>
      <Text variant="heading2">Send BTC</Text>
      {error && error}
      {status === 'constructTx' && (
        <>
          <Text>Create your sending transaction...</Text>
          <Label>From Wallet</Label>
          <Select>
            <option>Core Wallet</option>
          </Select>
          <Label>Amount</Label>
          <Input {...amount.bind} type="number" />
          <Label>Address</Label>
          <Input {...address.bind} placeholder="Bitcoin address" />
          <Label>Network Fees (sats per byte)</Label>
          <Input {...fees.bind} type="number" min="1" step="1" placeholder="1" />
          <Label>Label</Label>
          <Input {...label.bind} placeholder="Internal label for this transaction" />
          <Box>
            <Button
              disabled={!amount.value || !address.value || !fees.value}
              icon={faChevronRight}
              onClick={handleGoToReview}
            >
              Next
            </Button>
          </Box>
        </>
      )}

      {status === 'reviewTx' && (
        <>
          <Text>Review and confirm your transaction...</Text>
          <Flex>
            <Label>From Wallet</Label>
            <Text>Core Wallet</Text>
          </Flex>
          <Flex>
            <Label>To</Label>
            <Text>{address.value}</Text>
          </Flex>
          <Flex>
            <Label>Label</Label>
            <Text>{label.value}</Text>
          </Flex>
          <Flex>
            <Label>Amount</Label>
            <Text>{amount.value}</Text>
          </Flex>
          <Flex>
            <Label>Network Fees</Label>
            <Text>{fees.value}</Text>
          </Flex>

          <Box>
            <Button
              icon={faChevronLeft}
              onClick={() => {
                setStatus('constructTx')
              }}
            >
              Back
            </Button>
            <Button icon={faChevronRight} onClick={handleSend}>
              Send
            </Button>
          </Box>
        </>
      )}

      {status === 'successfulSend' && (
        <>
          <Text>Success!</Text>
          <Text>
            {'Transaction status: '}
            {successData.status}
          </Text>
          <Text>
            {'Transaction Hash: '}
            {successData.hash}
          </Text>
        </>
      )}
    </Box>
  )
}

export default SendBTC
