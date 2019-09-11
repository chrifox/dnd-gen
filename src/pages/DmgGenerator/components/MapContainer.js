import React from 'react'
import styled from 'styled-components'
import { Container } from '../../../components/map/index'

const RelativeContainer = styled(Container)`
  position: relative;
`

const MapContainer = ({ children }) => (
  <RelativeContainer>
    {children}
  </RelativeContainer>
)

export default MapContainer
