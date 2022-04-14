import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from '../../src/components/Form'

beforeEach(() => {
  render(
    <Form
      fields={[
        {
          label: 'Você assiste Big Brother Brasil?',
          type: 'select',
          name: 'bbb',
          options: ['sim, sempre', 'as vezes', 'não assisto'],
          validation: {
            required: true,
          },
        },
      ]}
    />
  )
})

test('Deve renderizar corretamente as perguntas com lista suspensa (select)', () => {
  const labelEl = document.querySelector('label[for="bbb-field"]')
  expect(labelEl).toBeInTheDocument()
  expect(labelEl.textContent).toContain('Você assiste Big Brother Brasil?')

  const selectEl = document.querySelector('#bbb-field')
  expect(selectEl).toBeInTheDocument()
  expect(selectEl.classList.contains('MuiSelect-select')).toBe(true)
})
