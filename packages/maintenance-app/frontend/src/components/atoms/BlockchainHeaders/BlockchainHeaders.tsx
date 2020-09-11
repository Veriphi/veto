import React from 'react'
import useBitcoinHeaders from '../../../hooks/useBitcoinHeaders'
import { Text } from '@veriphi/veto-ui'
import ErrorMessage from '../ErrorMessage'

function renderBitcoinHeaders(isValidating: boolean, error?: string, headers?: Number) {
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>
  } else if (isValidating) {
    return <Text>"..."</Text>
  }

  return (
    <>
      <Text>{headers}</Text>
    </>
  )
}

const BlockchainHeaders = () => {
  const { headers, headersError, isValidating } = useBitcoinHeaders()

  return <div>{renderBitcoinHeaders(isValidating, headersError, headers)}</div>
}

export default BlockchainHeaders
