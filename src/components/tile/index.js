import React, { useState } from 'react'
import styled, { css } from 'styled-components'

export const TILE_SIZE = 30
const BORDER_WIDTH = 2
const directions = ['top', 'right', 'bottom', 'left']

const tileStyles = props => {
  switch (props.value) {
    case 's': return 'start'
    case 'e': return 'end'
    case 0: return 'path'
    default: return 'wall' // default is 1
  }
}

const tileBorderWidth = props => {
  return directions.reduce((style, dir) =>
    `${style}
      border-${dir}-width: ${BORDER_WIDTH * props[dir] ? 5 : 1}px;
    `, '')
}

const tileBorderColor = props => {
  return directions.reduce((style, dir) =>
    `${style}
      border-${dir}-color: ${props.theme.tileColors[(props[dir] && (props.door === dir)) ? 'door' : 'grid']};
    `, '')
}

export const Tile = styled.div`
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  background: ${props => props.theme.tileColors[tileStyles(props)]};
  border-style: solid;
  ${tileBorderWidth};
  ${tileBorderColor};
`
