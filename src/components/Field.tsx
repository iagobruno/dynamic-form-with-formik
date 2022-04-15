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
import type { IField } from '../common/types'

interface FieldProps extends IField {
  formik: FormikProps<any>
}

function Field({ formik, ...props }: FieldProps) {
  const commonInputProps = {
    name: props.name,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
  }
  const fieldId = props.name + '-field'
  const hasError =
    (formik.touched[props.name] || formik.submitCount >= 1) &&
    Boolean(formik.errors[props.name])

  function renderControl() {
    if (props.type === 'text' || props.type === 'textarea') {
      return (
        <TextField
          {...commonInputProps}
          id={fieldId}
          type={props.name === 'email' ? 'email' : 'text'}
          value={formik.values[props.name] ?? ''}
          placeholder={props.placeholder}
          error={hasError}
          multiline={props.type === 'textarea'}
          rows={6}
          inputProps={{
            required: props.validations?.required,
            maxLength: props.validations?.max,
            minLength: props.validations?.min,
          }}
          style={{
            backgroundColor: '#FFF',
            width: '100%',
          }}
          variant="outlined"
        />
      )
    }

    if (props.type === 'number') {
      return (
        <TextField
          {...commonInputProps}
          id={fieldId}
          type="number"
          value={formik.values[props.name] ?? ''}
          error={hasError}
          inputProps={{
            required: props.validations?.required,
            max: props.validations?.max,
            min: props.validations?.min,
          }}
          style={{
            backgroundColor: '#FFF',
            width: '140px',
          }}
          variant="outlined"
        />
      )
    }

    if (props.type === 'radio') {
      return (
        <RadioGroup
          {...commonInputProps}
          value={formik.values[props.name] ?? ''}
        >
          {props.options!.map((option) => (
            <FormControlLabel
              key={option}
              control={<Radio {...commonInputProps} value={option} />}
              label={option}
            />
          ))}
        </RadioGroup>
      )
    }

    if (props.type === 'checkbox') {
      return (
        <FormGroup>
          {props.options!.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  {...commonInputProps}
                  checked={formik.values[props.name]?.includes(option) ?? false}
                  value={option}
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      )
    }

    if (props.type === 'select') {
      return (
        <Select
          {...commonInputProps}
          id={fieldId}
          value={formik.values[props.name] ?? ''}
          error={hasError}
          style={{
            backgroundColor: '#FFF',
            minWidth: '140px',
          }}
        >
          {props.options!.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      )
    }
  }

  return (
    <div>
      <FormLabel htmlFor={fieldId} style={{ display: 'block' }}>
        {props.label} {props.validations?.required && <Required>*</Required>}
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
  color: red;
  font-weight: 600;
  line-height: 1.66;
`

const ErrorMessage = styled.p`
  color: red;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 1.66;
  margin: 0;
`
