import React, { useState } from 'react'
import { Modal, Button } from '@veriphi/veto-ui'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane'
import SendBTC from '../SendForm'

type Status = 'idle' | 'modalOpen'

export default () => {
  // General State
  const [status, setStatus] = useState<Status>('idle')

  return (
    <>
      <Button variant="primary" icon={faPaperPlane} onClick={() => setStatus('modalOpen')}>
        Send
      </Button>
      <Modal isOpen={status === 'modalOpen'} onClickCloseButton={() => setStatus('idle')}>
        <SendBTC />
      </Modal>
    </>
  )
}
