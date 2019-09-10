import React from 'react'
import styled from 'styled-components'
import { Container } from '../../../components/map'

const MapContainer = ({ children }) => (
  <Container>
    {children}
  </Container>
)

export default MapContainer
