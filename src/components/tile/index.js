import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button'
import SvgIcon from '../SvgIcon'

export const TILE_SIZE = 20 // 1 tile = 5ft
export const BORDER_WIDTH = 3
const EDGE_MULTIPLIER = 4
const directions = ['top', 'right', 'bottom', 'left']

const arrowPosition = props => {
  const buttonSpace = TILE_SIZE * -1.5
  let top, right, bottom, left, margin
  top = props.door === 'top' && buttonSpace
  right = props.door === 'right' && buttonSpace
  bottom = props.door === 'bottom' && buttonSpace
  left = props.door === 'left' && buttonSpace
  if (props.door === 'top' || props.door === 'bottom') {
    margin = `margin-left: ${BORDER_WIDTH * (props.column === 0 ? EDGE_MULTIPLIER : 1)}px;`
  }
  if (props.door === 'right' || props.door === 'left') {
    margin = `margin-top: ${BORDER_WIDTH * (props.row === 0 ? EDGE_MULTIPLIER : 1)}px;`
    top = 0
  }
  return `
    top: ${top}px;
    right: ${right}px;
    bottom: ${bottom}px;
    left: ${left}px;
    ${margin};
  `
}

const ArrowButton = styled(Button)`
  position: absolute;
  z-index: ${props => props.theme.zIndex.doorButton};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  padding: 0;
  background: ${props => props.theme.colors.action};
  ${arrowPosition};
`

const tileStyles = props => {
  switch (props.value) {
    case 's': return 'start'
    case 'e': return 'end'
    case 1: return 'floor'
    case 2: return 'passage'
    default: return 'empty' // default is 0
  }
}

const tileBorderWidth = props => {
  return directions.reduce((style, dir) =>
    `${style}
      border-${dir}-width: ${BORDER_WIDTH * (props[dir] ? EDGE_MULTIPLIER : 1)}px;
    `, '')
}

const borderColor = (props, dir) => {
  if (props[dir] && (props.door === dir)) return 'door'
  if (props[dir] && (props.secretDoor === dir)) return 'secretDoor'
  if (props[dir]) return 'wall'
  return 'grid'
}

const tileBorderColor = props => {
  return directions.reduce((style, dir) =>
    `${style}
      border-${dir}-color: ${props.theme.borderColors[borderColor(props, dir)]};
    `, '')
}

const StyledTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  background: ${props => props.theme.tileColors[tileStyles(props)]};
  border-style: solid;
  border-width: ${BORDER_WIDTH}px;
  ${tileBorderColor};
`

const TileContainer = styled.div`
  position: relative;
`

export const Tile = ({ children, ...props }) => (
  <TileContainer>
    <StyledTile {...props}>
      {children}
    </StyledTile>

    {props.door && (
      <ArrowButton {...props} onClick={() => console.log(`Spawn room ${props.door} of [${props.row}][${props.column}]`)}>
        <SvgIcon name={props.door} size={TILE_SIZE * 0.75} />
      </ArrowButton>
    )}
  </TileContainer>
)
