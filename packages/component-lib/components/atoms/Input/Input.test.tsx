import React from 'react'
import { render, getByTestId } from 'component-lib/test-utils'
import '@testing-library/jest-dom/extend-expect'

import Input from './Input'

describe('Input component', () => {
  it('renders', () => {
    const props = {}
    const { container } = render(<Input {...props} />)
    const containderDiv = getByTestId(container, 'Input')
    expect(containderDiv).toBeInTheDocument()
  })
})
