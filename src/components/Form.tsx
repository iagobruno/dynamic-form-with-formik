import React from 'react'
import { Formik, FormikProps } from 'formik'
import Field from './Field'
import styled from 'styled-components'
import Button from '@mui/material/Button'
import type { IFieldGroup } from '../common/types'
import constructYupSchema from '../common/constructYupSchema'

interface FormProps {
  fields: IFieldGroup
  onSubmit?: () => void
}

export default function Form(props: FormProps) {
  const validationSchema = React.useMemo(
    () => constructYupSchema(props.fields),
    [props.fields]
  )

  return (
    <Formik
      initialValues={{}}
      validateOnMount
      validationSchema={validationSchema}
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
