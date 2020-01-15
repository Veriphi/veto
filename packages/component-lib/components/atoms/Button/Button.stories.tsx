import React from 'react'
import { action } from '@storybook/addon-actions'
import Button from './Button'

export default {
  title: 'Button',
  component: Button,
}

const props = {
  // ...
}

export const Default = () => <Button {...props}>{/* 🚀Orange coin good ☢️ */}</Button>

// Add more named exports for further stories.
