import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Navbar from '../src/components/Navbar'
import { theme } from '../theme'

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.background};
`

const App = ({ Component, ...pageProps }) => (
  <ThemeProvider theme={theme}>
    <AppContainer>
      <Navbar />
      <Component {...pageProps} />
    </AppContainer>
  </ThemeProvider>
)

export default App
