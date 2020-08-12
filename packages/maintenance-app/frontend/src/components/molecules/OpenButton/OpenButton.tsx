import React from 'react'
import { Button } from '@veriphi/veto-ui'

export default (props) => {
  return (
    <>
      <Button variant="primary" onClick={() => (window.location.href = props.click)}>
        {'Open'}
      </Button>
    </>
  )
}

// FIX DIMENSIONS AND STYLING
