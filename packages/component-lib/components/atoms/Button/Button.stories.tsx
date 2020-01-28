import React from 'react'
import Button from './Button'
import { Box } from '@lightspeed/flame/Core'
import { Icon } from '@lightspeed/flame/Icon'

export default {
  title: 'Button',
  component: Button,
}

export const Styles = () => (
  <Box>
    <h2>Styles (Variants)</h2>

    <Button m={1}>Plain (Default)</Button>

    <Button fill variant="primary" m={1}>
      Primary
    </Button>

    <Button fill variant="secondary" m={1}>
      Secondary
    </Button>

    <Button fill variant="danger" m={1}>
      Danger
    </Button>

    <Button fill variant="neutral" m={1}>
      Neutral
    </Button>
  </Box>
)

export const Sizes = () => (
  <Box>
    <h2>Sizes</h2>
    <Box>
      <Button fill variant="secondary" size="small" m={1}>
        Small
      </Button>
      <Button fill variant="secondary" size="medium" m={1}>
        Medium (default)
      </Button>
      <Button fill variant="secondary" size="large" m={1}>
        Large
      </Button>
      <Button fill variant="secondary" size="xlarge" m={1}>
        Extra Large
      </Button>
    </Box>
    <Box>
      <Button fill variant="neutral" size="small" m={1} block>
        Small Block
      </Button>
      <Button fill variant="neutral" size="medium" m={1} block>
        Medium (default) Block
      </Button>
      <Button fill variant="neutral" size="large" m={1} block>
        Large Block
      </Button>
      <Button fill variant="neutral" size="xlarge" m={1} block>
        Extra Large Block
      </Button>
    </Box>
  </Box>
)

export const WithChildren = () => (
  <Box>
    <h2>WithChildren</h2>
    <Box>
      <Button fill variant="secondary" m={1}>
        <Icon name="chevron-left" /> Back
      </Button>
      <Button fill variant="primary" size="small" m={1}>
        Dashboard <Icon name="dashboard" />
      </Button>
      <Button fill variant="danger" size="large" m={1}>
        <Icon name="warning" />
      </Button>
      <Button size="xlarge" m={1}>
        <Icon name="support-tickets" />
        Customers <Icon name="warning" />
      </Button>
    </Box>
  </Box>
)
