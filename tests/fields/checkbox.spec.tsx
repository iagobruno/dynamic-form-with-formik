import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from '../../src/components/Form'

beforeEach(() => {
  render(
    <Form
      fields={[
        {
          label: 'Em qual área você quer atuar?',
          type: 'checkbox',
          name: 'area',
          options: ['Front-end', 'Back-end', 'Full-stack'],
          validation: {
            required: true,
            min: 1,
          },
        },
      ]}
    />
  )
})

test('Deve renderizar corretamente as perguntas com múltima escolhas (checkbox)', () => {
  const labelEl = document.querySelector('label[for="area-field"]')
  expect(labelEl).toBeInTheDocument()
  expect(labelEl.textContent).toContain('Em qual área você quer atuar?')

  expect(document.querySelectorAll('input[type=checkbox]')).toHaveLength(3)
  expect(screen.getByText('Front-end')).toBeInTheDocument()
  expect(screen.getByText('Back-end')).toBeInTheDocument()
  expect(screen.getByText('Full-stack')).toBeInTheDocument()
})
