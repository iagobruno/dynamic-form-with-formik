import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from '../../src/components/Form'

beforeEach(() => {
  render(
    <Form
      fields={[
        {
          label: 'Sua idade:',
          type: 'number',
          name: 'age',
          validation: {
            required: true,
            min: 16,
          },
        },
      ]}
    />
  )
})

test('Deve renderizar o campo de número corretamente', () => {
  const labelEl = document.querySelector('label[for="age-field"]')
  expect(labelEl).toBeInTheDocument()
  expect(labelEl.textContent).toContain('Sua idade:')

  const numberEl = document.querySelector('input#age-field')
  expect(numberEl).toBeInTheDocument()
  expect(numberEl.getAttribute('type')).toBe('number')
  expect(numberEl.getAttribute('min')).toBe('16')
  expect(numberEl.hasAttribute('required')).toBe(true)
})
