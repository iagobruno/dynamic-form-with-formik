import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from '../../src/components/Form'

beforeEach(() => {
  render(
    <Form
      fields={[
        {
          label: 'Seu nome:',
          type: 'text',
          name: 'name',
          placeholder: 'Digite seu nome...',
          validation: {
            required: true,
            min: 3,
            max: 255,
          },
        },
      ]}
    />
  )
})

test('Deve renderizar o campo de texto corretamente', () => {
  const labelEl = document.querySelector('label[for="name-field"]')
  expect(labelEl).toBeInTheDocument()
  expect(labelEl.textContent).toContain('Seu nome:')

  const inputEl = document.querySelector('input#name-field')
  expect(inputEl).toBeInTheDocument()
  expect(inputEl.getAttribute('type')).toBe('text')
  expect(inputEl.getAttribute('minlength')).toBe('3')
  expect(inputEl.getAttribute('maxlength')).toBe('255')
  expect(inputEl.hasAttribute('required')).toBe(true)
})
