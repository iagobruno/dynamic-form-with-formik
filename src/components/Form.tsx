import React from 'react'
import { Formik, FormikProps } from 'formik'
import Field from './Field'
import styled from 'styled-components'
import Button from '@mui/material/Button'

interface FormProps {
  fields: any[]
  onSubmit?: () => void
}

export default function Form(props: FormProps) {
  function validate(values: Record<string, any>) {
    const errors: Record<string, any> = {
      name: 'Is required',
      age: 'Idade mínima de 16 anos',
      experience: 'Select one option',
      area: 'Select at least one option',
    }

    return errors
  }

  return (
    <Formik
      initialValues={{}}
      validate={validate}
      // validateOnMount
      onSubmit={() => props.onSubmit?.()}
    >
      {(formik: FormikProps<any>) => (
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
                (!formik.isValid && formik.submitCount >= 1) ||
                formik.isSubmitting
              }
              variant="contained"
            >
              {formik.isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </StyledForm>
      )}
    </Formik>
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
