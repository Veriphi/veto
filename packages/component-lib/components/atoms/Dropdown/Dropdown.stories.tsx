import React from 'react'
import { action, actions } from '@storybook/addon-actions'
import Dropdown, { DropdownOptionCard } from './Dropdown'

export default {
  title: 'Dropdown',
  component: Dropdown,
}

export const Default = () => (
  <Dropdown buttonContent="Some content">
    {[
      <DropdownOptionCard key="1" onClick={() => actions('option 1 clicked')}>
        This is an option you can click
      </DropdownOptionCard>,
      <DropdownOptionCard key="2" onClick={() => actions('option 2 clicked')}>
        Here is another clickable selection
      </DropdownOptionCard>,
      <DropdownOptionCard key="3" onClick={() => actions('option 2 clicked')}>
        And another one here
      </DropdownOptionCard>,
    ]}
  </Dropdown>
)
