import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from '../../src/components/Form'

beforeEach(() => {
  render(
    <Form
      fields={[
        {
          label: 'Fale sobre você:',
          type: 'textarea',
          name: 'about',
          placeholder: 'Escreva um pouco sobre você...',
          validation: {
            required: true,
            min: 20,
          },
        },
      ]}
    />
  )
})

test('Deve renderizar o campo de texto longo corretamente', () => {
  const labelEl = document.querySelector('label[for="about-field"]')
  expect(labelEl).toBeInTheDocument()
  expect(labelEl.textContent).toContain('Fale sobre você:')

  const textareaEl = document.querySelector('textarea#about-field')
  expect(textareaEl).toBeInTheDocument()
  expect(textareaEl.getAttribute('placeholder')).toBe(
    'Escreva um pouco sobre você...'
  )
  expect(textareaEl.getAttribute('minlength')).toBe('20')
  expect(textareaEl.hasAttribute('required')).toBe(true)
})
