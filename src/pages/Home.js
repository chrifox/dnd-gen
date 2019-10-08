import React from 'react'
import styled from 'styled-components'
import { H1, H2 } from '../components/typography'

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Home = () => (
  <PageLayout>
    <H1>Welcome</H1>
    <H2>Open the menu to get started</H2>
  </PageLayout>
)

export default Home
