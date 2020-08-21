import React from 'react'
import { Button } from '@veriphi/veto-ui'
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog';

export default (props) => {
  return (
    <>
      <Button icon={faCog}
        variant="secondary" onClick={() => (window.location.href = props.click)}>
        {'Manage'}
      </Button>
    </>
  )
}

// FIX DIMENSIONS AND STYLING
