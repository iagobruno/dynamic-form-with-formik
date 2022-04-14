import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from '../../src/components/Form'

beforeEach(() => {
  render(
    <Form
      fields={[
        {
          label: 'Tempo de experiência',
          type: 'checkbox',
          name: 'experience',
          options: ['1-2 anos', '3-5 anos', '5-10 anos', '+ 10 anos'],
          validation: {
            required: true,
            min: 1,
            max: 1,
          },
        },
      ]}
    />
  )
})

test('Deve renderizar corretamente as perguntas com escolha única (radio)', () => {
  const labelEl = document.querySelector('label[for="experience-field"]')
  expect(labelEl).toBeInTheDocument()
  expect(labelEl.textContent).toContain('Tempo de experiência')

  expect(document.querySelectorAll('input[type=radio]')).toHaveLength(4)
  expect(screen.getByText('1-2 anos')).toBeInTheDocument()
  expect(screen.getByText('3-5 anos')).toBeInTheDocument()
  expect(screen.getByText('5-10 anos')).toBeInTheDocument()
  expect(screen.getByText('+ 10 anos')).toBeInTheDocument()
})
