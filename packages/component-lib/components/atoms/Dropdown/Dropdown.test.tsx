import React from 'react'
import { render, getByTestId } from 'component-lib/test-utils'
import '@testing-library/jest-dom/extend-expect'
import Dropdown, { DropdownOptionCard } from './Dropdown'

describe('Dropdown component', () => {
  it('renders', () => {
    const props = {
      children: [
        <DropdownOptionCard key="1" onClick={() => console.log('option 1 clicked')}>
          This is an option you can click
        </DropdownOptionCard>,
        <DropdownOptionCard key="2" onClick={() => console.log('option 2 clicked')}>
          Here is another clickable selection
        </DropdownOptionCard>,
        <DropdownOptionCard key="3" onClick={() => console.log('option 2 clicked')}>
          And another one here
        </DropdownOptionCard>,
      ],
      buttonContent: 'Some content',
    }
    const { container } = render(<Dropdown {...props} />)
    const containderDiv = getByTestId(container, 'Dropdown')
    expect(containderDiv).toBeInTheDocument()
  })
})
