import React, { useState } from 'react'
import styled, { css } from 'styled-components'

export const TILE_SIZE = 30
const BORDER_WIDTH = 1
const directions = ['top', 'right', 'bottom', 'left']

const tileStyles = props => {
  switch (props.value) {
    case 's': return 'start'
    case 'e': return 'end'
    case 0: return 'path'
    default: return 'wall' // default is 1
  }
}

const tileBorderColor = props => {
  return directions.reduce((style, dir) =>
    `${style}border-${dir}-color: rgba(75,10,20,${props[dir] ? 0.8 : 0.1});`
  , '')
}

export const Tile = styled.div`
  padding: ${(TILE_SIZE - BORDER_WIDTH * 2) / 2}px;
  background: ${props => props.theme.tileColors[tileStyles(props)]};
  border-width: ${BORDER_WIDTH}px;
  border-style: solid;
  ${tileBorderColor};
`
