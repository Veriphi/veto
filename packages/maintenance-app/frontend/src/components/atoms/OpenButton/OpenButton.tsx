import React from 'react'
import { Button } from '@veriphi/veto-ui'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt';

export default (props) => {
  return (
    <>
      <Button icon={faExternalLinkAlt}
        variant="primary" onClick={(e) => {
          e.preventDefault();
          window.location.href = props.click
        }}>
        {'Open'}
      </Button>
    </>
  )
}

// FIX DIMENSIONS AND STYLING
