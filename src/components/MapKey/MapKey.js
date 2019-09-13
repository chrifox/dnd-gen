import React from 'react'
import styled from 'styled-components'
import { H3 } from '../typography'

const Key = styled.div`
  background: ${props => props.theme.colors.backgroundDark};
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  padding: 0 30px 10px 40px;
  border: 1px solid #ddd;
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

const Symbol = styled.div``

const Label = styled.div`
  color: ${props => props.theme.colors.text};
  margin-left: 10px;
`

const MapKey = ({ items }) => (
  <Key>
    <H3>Legend</H3>
    {items.map(({ name, symbol, description }) => (
      <Item key={name}>
        <Symbol>
          {symbol}
        </Symbol>
        <Label>{description}</Label>
      </Item>
    ))}
  </Key>
)

export default MapKey
