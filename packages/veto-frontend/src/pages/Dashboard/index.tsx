import React, { useState } from 'react'
import ReceiveBTC from 'components/molecules/ReceiveBTC'
import { Button, Modal, Text, Flex } from '@veriphi/veto-ui'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane'
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons/faWaveSquare'
import { getNewAddress } from 'api'
import useBalance from 'hooks/useBalance'
import SendBTC from 'components/molecules/SendBTC'

type Status = 'idle' | 'fetchReceivingAddress' | 'showReceivingAddress' | 'constructSendingTx' | 'sending' | 'error'

export default () => {
  // General Page State
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [balance, balanceLoading, balanceFetchError] = useBalance()

  // State for Receiving
  const [receivingAddress, setReceivingAddress] = useState('')

  // Handlers for Receiving
  const onClickReceive = async () => {
    setStatus('fetchReceivingAddress')
    try {
      const newAddress = await getNewAddress()
      setReceivingAddress(newAddress)
      setStatus('showReceivingAddress')
    } catch (e) {
      setError(e.message)
      setStatus('error')
    }
  }

  // Handlers for Sending
  const onClickSend = async () => {
    setStatus('constructSendingTx')
  }

  return (
    <div>
      <Text variant="heading1">Dashboard</Text>

      <Flex>
        <Text variant="heading2">
          {'Balance '}
          {balanceFetchError ? balanceFetchError : balanceLoading ? '...loading....' : balance + ' btc'}
        </Text>
      </Flex>

      <Button variant="primary" icon={faPaperPlane} onClick={onClickSend}>
        Send
      </Button>
      <Button variant="secondary" icon={faWaveSquare} onClick={onClickReceive}>
        {status === 'fetchReceivingAddress' ? '...Loading...' : 'Receive'}
      </Button>
      {error && status === 'error' && <Text color="warning">{error}</Text>}
      <Modal isOpen={status === 'showReceivingAddress'} onClickCloseButton={() => setStatus('idle')}>
        <ReceiveBTC address={receivingAddress} />
      </Modal>
      <Modal isOpen={status === 'constructSendingTx'} onClickCloseButton={() => setStatus('idle')}>
        <SendBTC />
      </Modal>
    </div>
  )
}
