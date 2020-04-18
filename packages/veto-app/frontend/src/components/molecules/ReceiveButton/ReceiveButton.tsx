import React, { useState } from 'react'
import { Modal, Button } from '@veriphi/veto-ui'
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons/faWaveSquare'
import ReceiveBTC from '../ReceiveForm'

type Status = 'idle' | 'modalOpen'

export default () => {
  // State
  const [status, setStatus] = useState<Status>('idle')

  return (
    <>
      <Button variant="secondary" icon={faWaveSquare} onClick={() => setStatus('modalOpen')}>
        Receive
      </Button>

      <Modal isOpen={status === 'modalOpen'} onClickCloseButton={() => setStatus('idle')}>
        <ReceiveBTC />
      </Modal>
    </>
  )
}
