import React from 'react'
import { render, getByTestId } from 'test-utils'
import '@testing-library/jest-dom/extend-expect'

import {{ properCase name }} from './{{ properCase name }}'

describe('{{ properCase name }} component', () => {
  it('renders', () => {
    const props = {}
    const { container } = render(<{{ properCase name }} {...props} />)
    const containderDiv = getByTestId(container, '{{ properCase name }}')
    expect(containderDiv).toBeInTheDocument();
  });
});
