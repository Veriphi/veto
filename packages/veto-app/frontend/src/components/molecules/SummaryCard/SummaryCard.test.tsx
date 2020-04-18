import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, screen } from '../../../test-utils'
import SummaryCard from '../SummaryCard'

test('Loads and displays balance', async () => {
  render(<SummaryCard />)

  expect(screen.getByText('Node Balance')).toBeDefined()
  expect(screen.getByText('Receive')).toBeDefined()
  expect(screen.getByText('Send')).toBeDefined()
})
