import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import App from '../src/App'

test.skip('should render correctly', () => {
  render(<App />)

  expect(screen.getByText('Hello Vite + React!')).toBeInTheDocument()
  expect(screen.getByText('count is: 0')).toBeInTheDocument()
})

test.skip('should setState correctly', () => {
  render(<App />)

  fireEvent.click(screen.getByText('count is: 0'))

  expect(screen.getByText('count is: 1')).toBeInTheDocument()
})
