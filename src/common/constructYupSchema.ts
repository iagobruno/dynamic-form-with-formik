import * as Yup from 'yup'
import type { IFieldGroup, IField } from './types'

export default function constructYupSchema(fields: IFieldGroup) {
  console.log('constructYupSchema called')
  const schema = {}

  for (const field of fields) {
    const validationTypes: Record<IField['type'], string> = {
      text: 'string',
      textarea: 'string',
      select: 'string',
      checkbox: 'array',
      radio: 'string',
      number: 'number',
    }
    const validationType = validationTypes[field.type]
    let validator = Yup[validationType]()

    // Can be any Yup rule validation
    // @see https://www.npmjs.com/package/yup
    for (const rule in field.validations) {
      const arg =
        field.validations[rule] === true ? undefined : field.validations[rule]

      validator = validator[rule]?.(arg)
    }

    schema[field.name] = validator
  }

  return Yup.object().shape(schema)
}

Yup.setLocale({
  mixed: {
    default: 'Campo inválido',
    required: 'Este campo é obrigatório',
    notType: ({ path, type, value, originalValue }) => {
      const msgs = {
        number: 'Precisa ser um número',
        string: 'Precisa ser um texto',
        array: 'Precisa ser uma lista',
      }
      return msgs[type]
    },
  },
  string: {
    min: ({ min }) =>
      `Precisa ter pelo menos ${min} ${min === 1 ? 'caracter' : 'caracteres'}`,
    max: ({ max }) =>
      `Precisa ter ${max} ${max === 1 ? 'caracter' : 'caracteres'} ou menos`,
    email: 'Precisa ser um e-mail válido',
    url: 'Precisa ser um URL válido',
    matches: 'Precisa corresponder ao padrão',
  },
  number: {
    min: 'Precisa ser um número maior que ${min}',
    max: 'Precisa ser um número menor que ${max}',
    positive: 'Precisa ser um número positivo',
    negative: 'Precisa ser um número negativo',
    integer: 'Precisa ser um número inteiro',
  },
  array: {
    min: ({ min }) =>
      `Selecione pelo menos ${min} ${min === 1 ? 'item' : 'itens'}`,
    max: ({ max }) =>
      `Selecione no máximo ${max} ${max === 1 ? 'item' : 'itens'}`,
  },
})
