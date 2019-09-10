import React, { useState } from 'react'
import styled, { css } from 'styled-components'

export const TILE_SIZE = 20 // 1 tile = 5ft
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

const tileBorderWidth = props => {
  return directions.reduce((style, dir) =>
    `${style}
      border-${dir}-width: ${BORDER_WIDTH * props[dir] ? 5 : 1}px;
    `, '')
}

const borderColor = (props, dir) => {
  if (props[dir] && (props.door === dir)) return 'door'
  if (props[dir] && (props.secretDoor === dir)) return 'secretDoor'
  return 'grid'
}

const tileBorderColor = props => {
  return directions.reduce((style, dir) =>
    `${style}
      border-${dir}-color: ${props.theme.tileColors[borderColor(props, dir)]};
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
