import React, { useState } from 'react'
import { Modal, Button, Text } from '@veriphi/veto-ui'
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons/faWaveSquare'
import { getNewAddress } from '../../../api'
import ReceiveBTC from '../ReceiveForm'

type Status = 'idle' | 'fetchReceivingAddress' | 'modalOpen' | 'showReceivingAddress' | 'error'

export default () => {
  // State
  const [status, setStatus] = useState<Status>('idle')
  const [receivingAddress, setReceivingAddress] = useState('')
  const [error, setError] = useState('')

  // Handlers for Receiving
  const onClickReceive = async () => {
    setStatus('fetchReceivingAddress')
    try {
      const newAddress = await getNewAddress()
      setReceivingAddress(newAddress)
      setStatus('showReceivingAddress')
    } catch (getNewAddressError) {
      setError(getNewAddressError.message)
      setStatus('error')
    }
  }

  return (
    <>
      <Button variant="secondary" icon={faWaveSquare} onClick={onClickReceive}>
        {status === 'fetchReceivingAddress' ? '...Loading...' : 'Receive'}
      </Button>
      {status === 'error' && error && <Text color="cancel">{error}</Text>}
      <Modal isOpen={status === 'showReceivingAddress'} onClickCloseButton={() => setStatus('idle')}>
        <ReceiveBTC address={receivingAddress} />
      </Modal>
    </>
  )
}
