import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  font-size: 16px;
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.primary};
  padding: 0.6em 1em;
  outline: none;
  border: none;
  cursor: pointer;
`

/** @component */
export default Button
