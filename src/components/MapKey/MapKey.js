import React from 'react'
import styled from 'styled-components'
import { H3 } from '../typography'

const Key = styled.div`
  background: ${props => props.theme.colors.backgroundDark};
  position: absolute;
  top: 0;
  right: 0;
  display: ${props => props.open ? 'flex' : 'none'};
  flex-direction: column;
  padding: 20px 40px 16px;
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

const MapKey = ({ items, open }) => (
  <Key open={open}>
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
