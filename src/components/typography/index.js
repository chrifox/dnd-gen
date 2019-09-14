import React from 'react'
import styled, { css } from 'styled-components'

const headingStyles = css`
  margin: 0 0 1em;
  text-align: center;
  color: ${props => props.theme.colors.text};
`

export const H1 = styled.h1`
  ${headingStyles};
`

export const H2 = styled.h2`
  ${headingStyles};
`

export const H3 = styled.h3`
  ${headingStyles};
`
