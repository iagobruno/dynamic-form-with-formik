import React, { useState, useRef } from 'react'
import { Stepper, Step, StepButton } from '@mui/material'
import type { IFormSectionGroup } from '../common/types'
import { FormikProps } from 'formik'
import Form from './Form'

interface Props {
  form: IFormSectionGroup
  onSubmit: (values: Record<string, string | string[]>) => Promise<void>
}

export default function DynamicForm(props: Props) {
  const allValues = useRef({})
  const formikRef = useRef<FormikProps<any> | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const section = props.form[activeStep]
  const steps = props.form.length
  const isLastStep = activeStep === steps - 1

  function onSubmit(newValues: Record<string, any>) {
    allValues.current = {
      ...allValues.current,
      ...formikRef.current?.values,
    }

    if (isLastStep) {
      formikRef.current?.setSubmitting(true)
      props.onSubmit(allValues.current).finally(() => {
        formikRef.current?.setSubmitting(false)
      })
    } else {
      const nextStep = activeStep + 1
      handleStepChange(nextStep)
      console.log('NEXT STEP')
    }
  }

  function handleStepChange(step: number) {
    allValues.current = {
      ...allValues.current,
      ...formikRef.current?.values,
    }
    setActiveStep(step)
  }

  return (
    <>
      <Stepper nonLinear activeStep={activeStep} style={{ width: '100%' }}>
        {props.form.map((section, index) => (
          <Step key={section.title} completed={false}>
            <StepButton color="inherit" onClick={() => handleStepChange(index)}>
              {section.title}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <Form
        fields={section.fields}
        initialValues={allValues.current}
        onSubmit={onSubmit}
        formikRef={formikRef}
        buttonText={isLastStep ? 'Enviar' : 'Avançar'}
        // Instruct React to remount the component on "activeStep" state change
        key={activeStep}
      />
    </>
  )
}
