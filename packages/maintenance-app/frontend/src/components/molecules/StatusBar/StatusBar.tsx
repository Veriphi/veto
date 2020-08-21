import React from 'react'
import { Flex, Text } from '@veriphi/veto-ui'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faServer, faCheck, faSync } from '@fortawesome/free-solid-svg-icons'
import ErrorMessage from '../../atoms/ErrorMessage'
import useBitcoinBlocks from '../../../hooks/useBitcoinBlocks'
import BlockchainHeaders from '../../atoms/BlockchainHeaders'
import { blockchainInfo } from '../../../api/index'
import axios from 'axios'

async function getBlocks(): Promise<Number> {
  const { data }: { data: { blocks: Number } } = await axios(blockchainInfo)
  return data.blocks
}

async function getHeaders(): Promise<Number> {
  const { data }: { data: { headers: Number } } = await axios(blockchainInfo)
  return data.headers
}

const StatusBar = (props) => {
  const blockHeight = 180000
  const headersHeight = 180000
  const syncingPercentage = blockHeight / headersHeight * 100
  return (
    <Flex flexDirection="row">
      <FontAwesomeIcon icon={faCube} color="#2378e1" />
      {syncingPercentage.toFixed(2)}%
      {console.log(getBlocks())}
      {console.log(getHeaders())}
      <FontAwesomeIcon icon={faCheck} color="green" />
      <FontAwesomeIcon icon={faServer} color="#2378e1" />
      {syncingPercentage == 100 ? '' : 'Syncing New Block...'}
      <FontAwesomeIcon icon={faSync} color="grey" />
    </Flex>

  )
}

export default StatusBar

// STYLING MISSING, might need to change faServer