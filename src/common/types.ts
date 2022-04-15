export type IFormSectionGroup = IFormSection[]

export interface IFormSection {
  title: string
  fields: IFieldGroup
}

export type IFieldGroup = IField[]

export interface IField {
  type: 'text' | 'textarea' | 'number' | 'checkbox' | 'radio' | 'select'
  label: string
  name: string
  placeholder?: string
  options?: string[]
  /**
   * Can be any Yup rule validator.
   * @see https://www.npmjs.com/package/yup
   */
  validations?: {
    required?: boolean
    min?: number
    max?: number
    pattern?: RegExp
  }
}
