import React from 'react'
import { Box, Flex, Text, Card } from '@veriphi/veto-ui'
import useBalance from '../../../hooks/useBalance'
import SendButton from '../SendButton'
import ReceiveButton from '../ReceiveButton'
import ErrorMessage from '../../atoms/ErrorMessage'
import CardTitle from '../../atoms/CardTitle'

const SummaryCard = () => {
  const { balance, balanceError } = useBalance()

  return (
    <Card>
      <CardTitle>Summary</CardTitle>
      <Box mt={3} />
      <Card variant="inset">
        {/* Flex the inset card content horizontal */}
        <Flex height="7rem">
          {/* Node Balance */}
          <Flex flexDirection="column" justifyContent="space-between" mr="3rem">
            <CardTitle>Node Balance</CardTitle>
            <Flex>
              <Text variant="heading1" color="textGrey" mr={2} sx={{ fontSize: '2rem' }}>
                {'BTC'}
              </Text>
              {balanceError ? (
                <ErrorMessage>{balanceError}</ErrorMessage>
              ) : (
                <Text color="textGrey" variant="heading1" sx={{ fontWeight: 600, fontSize: '2rem' }}>
                  {balance ? balance : '...loading...'}
                </Text>
              )}
            </Flex>
          </Flex>

          {/* Send and Receive Buttons */}
          <Flex flexDirection="column" justifyContent="space-between">
            <SendButton />
            <ReceiveButton />
          </Flex>
        </Flex>
      </Card>
      {/* End of inset card */}
    </Card>
  )
}

export default SummaryCard
