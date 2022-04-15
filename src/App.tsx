import React, { useState } from 'react'
import styled from 'styled-components'
import DynamicForm from './components/DynamicForm'
import formData from '../form-data.json'
console.log('formData :', formData)

export default function App() {
  return (
    <Container>
      <Title>Formulário dinâmico</Title>
      <Description>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
        similique? Maiores deserunt molestiae laborum quaerat explicabo incidunt
        temporibus cum veritatis ad placeat delectus tenetur omnis rerum, minima
        impedit? Aliquam, fuga?
        <RequiredText>*Obrigatório</RequiredText>
      </Description>

      <DynamicForm
        // @ts-ignore
        form={formData.groups}
        onSubmit={async (values) => console.log('ENVIOU', values)}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: flex-start;
  width: min(660px, 100%);
`

const Title = styled.h1`
  font-size: 2.8rem;
  margin: 0 0 10px;
`

const Description = styled.p`
  color: rgb(0 0 0 / 80%);
  line-height: 1.7rem;
  margin: 0 0 26px;
`

const RequiredText = styled.span`
  display: block;
  color: red;
  font-size: 0.9em;
  margin-top: 10px;
`
