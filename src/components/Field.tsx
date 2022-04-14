import React from 'react'
import type { FormikProps } from 'formik'
import styled from 'styled-components'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

interface FieldProps {
  formik: FormikProps<any>
  type: 'text' | 'textarea' | 'number' | 'checkbox'
  name: string
  placeholder?: string
  label: string
  options?: string[]
  validation: {
    required?: boolean
    min?: number
    max?: number
  }
}

function Field({ formik, ...props }: FieldProps) {
  const commonInputProps = {
    name: props.name,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  }
  const fieldId = props.name + '-field'
  const hasError = formik.submitCount >= 1 && Boolean(formik.errors[props.name])

  function renderControl() {
    if (props.type === 'text' || props.type === 'textarea') {
      return (
        <TextField
          {...commonInputProps}
          id={fieldId}
          type="text"
          value={formik.values[props.name]}
          placeholder={props.placeholder}
          error={hasError}
          multiline={props.type === 'textarea'}
          rows={6}
          inputProps={{
            required: props.validation.required,
            maxLength: props.validation.max,
            minLength: props.validation.min,
          }}
          style={{
            backgroundColor: '#FFF',
            width: '100%',
          }}
          variant="outlined"
        />
      )
    }
  }

  return (
    <div>
      <FormLabel htmlFor={fieldId} style={{ display: 'block' }}>
        {props.label} {props.validation.required && <Required>*</Required>}
      </FormLabel>
      {renderControl()}
      {hasError && <ErrorMessage>{formik.errors[props.name]}</ErrorMessage>}
    </div>
  )
}

export default React.memo(Field, (prevProps, nextProps) => {
  return (
    prevProps.formik.values[prevProps.name] ===
      nextProps.formik.values[nextProps.name] &&
    prevProps.formik.errors[prevProps.name] ===
      nextProps.formik.errors[nextProps.name] &&
    prevProps.formik.submitCount === nextProps.formik.submitCount
  )
})

const Required = styled.span`
  color: #d32f2f;
  font-weight: 600;
  line-height: 1.66;
`

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 1.66;
  margin: 0;
`
