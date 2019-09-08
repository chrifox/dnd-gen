import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.primary};
  padding: 0.8em 1.2em;
  outline: none;
  border: none;
`

/** @component */
export default Button
