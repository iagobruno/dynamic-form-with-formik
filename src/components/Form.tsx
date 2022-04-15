import React from 'react'
import { useFormik } from 'formik'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import type { IFieldGroup } from '../common/types'
import constructYupSchema from '../common/constructYupSchema'
import Field from './Field'

type Values = Record<string, string | string[]>

interface FormProps {
  fields: IFieldGroup
  initialValues: Values
  buttonText: string
  onSubmit: (values: Values) => void
  formikRef?: React.MutableRefObject<any>
}

export default function Form(props: FormProps) {
  const validationSchema = React.useMemo(
    () => constructYupSchema(props.fields),
    [props.fields]
  )
  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: props.onSubmit,
  })
  props.formikRef!.current = formik

  return (
    <StyledForm onSubmit={formik.handleSubmit}>
      {props.fields.map((item) => (
        <Field key={item.name} {...item} formik={formik} />
      ))}

      <div>
        {!formik.isValid && formik.submitCount >= 1 && (
          <RedText>Confira todos os campos</RedText>
        )}
        <Button
          type="submit"
          disabled={
            (!formik.isValid && formik.submitCount >= 1) || formik.isSubmitting
          }
          variant="contained"
        >
          {props.buttonText}
        </Button>
      </div>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  width: 100%;
  margin-top: 2.4rem;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  gap: 2.2rem;
`

const RedText = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 16px;
`
