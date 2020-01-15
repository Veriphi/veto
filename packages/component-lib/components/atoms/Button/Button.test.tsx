import React from 'react'
import { render, getByTestId } from 'component-lib/test-utils'
import '@testing-library/jest-dom/extend-expect'

import Button from './Button'

describe('Button component', () => {
  it('renders', () => {
    const props = {}
    const { container } = render(<Button {...props} />)
    const containderDiv = getByTestId(container, 'Button')
    expect(containderDiv).toBeInTheDocument()
  })
})
