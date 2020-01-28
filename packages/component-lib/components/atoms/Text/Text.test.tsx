import React from 'react'
import { render, getByTestId } from 'component-lib/test-utils'
import '@testing-library/jest-dom/extend-expect'

import { Text, Heading1, Heading2, Heading3, Heading4 } from './Text'

describe('Text component', () => {
  it('renders <Text/>', () => {
    const { container } = render(<Text>This is default text</Text>)
    const containderDiv = getByTestId(container, 'Text')
    expect(containderDiv).toBeInTheDocument()
  })
  it('renders <Heading1/>', () => {
    const { container } = render(<Heading1>This is an H1</Heading1>)
    const containderDiv = getByTestId(container, 'Heading1')
    expect(containderDiv).toBeInTheDocument()
  })
  it('renders <Heading2/>', () => {
    const { container } = render(<Heading2>This is an H2</Heading2>)
    const containderDiv = getByTestId(container, 'Heading2')
    expect(containderDiv).toBeInTheDocument()
  })
  it('renders <Heading3/>', () => {
    const { container } = render(<Heading3>This is an H3</Heading3>)
    const containderDiv = getByTestId(container, 'Heading3')
    expect(containderDiv).toBeInTheDocument()
  })

  it('renders <Heading4/>', () => {
    const { container } = render(<Heading4>This is an H4</Heading4>)
    const containderDiv = getByTestId(container, 'Heading4')
    expect(containderDiv).toBeInTheDocument()
  })
})
