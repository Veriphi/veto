import React from 'react'
import { render, getByTestId } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const { container } = render(<App />)
  const containderDiv = getByTestId(container, 'Router')
  expect(containderDiv).toBeDefined()
})
