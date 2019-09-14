import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button'
import SvgIcon from '../SvgIcon'

export const TILE_SIZE = 18 // 1 tile = 5ft
export const BORDER_WIDTH = 2
const directions = ['top', 'right', 'bottom', 'left']

const sizePosition = props => {
  const door = props.door || props.secretDoor
  const doorVertical = door === 'top' || door === 'bottom'
  const doorHorizontal = door === 'right' || door === 'left'
  const buttonSpace = (TILE_SIZE - BORDER_WIDTH) * -1
  let top, right, bottom, left, margin
  top = door === 'top' && buttonSpace * (doorVertical ? 0.25 : 1)
  right = door === 'right' && buttonSpace * (doorHorizontal ? 0.25 : 1)
  bottom = door === 'bottom' && buttonSpace * (doorVertical ? 0.25 : 1)
  left = door === 'left' && buttonSpace * (doorHorizontal ? 0.25 : 1)
  if (doorVertical) {
    margin = `margin-left: ${BORDER_WIDTH}px;`
  }
  if (doorHorizontal) {
    margin = `margin-top: ${BORDER_WIDTH}px;`
    top = 0
  }
  return `
    width: ${TILE_SIZE * (doorVertical ? 1 : 0.5)}px;
    height: ${TILE_SIZE * (doorHorizontal ? 1 : 0.5)}px;
    top: ${top}px;
    right: ${right}px;
    bottom: ${bottom}px;
    left: ${left}px;
    ${margin};
    transition: 0.2s transform ease;
    &:hover {
      transform: scale(2.5);
    }
  `
}

// const doorBackground = props => props => !!props.secretDoor ? props.theme.borderColors.secretDoor : `url(/static/img/door-${props.door}.jpg)`

const DoorButton = styled(Button)`
  position: absolute;
  z-index: ${props => props.theme.zIndex.doorButton};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  background: ${props => props.theme.borderColors[!!props.secretDoor ? 'secretDoor' : 'door']};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  ${sizePosition};
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
  // if (props[dir] && (props.door === dir)) return 'door'
  // if (props[dir] && (props.secretDoor === dir)) return 'secretDoor'
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
      <DoorButton
        {...props}
        onClick={() => console.log(`Spawn room ${props.door} of [${props.row}][${props.column}]`)}
      />
    )}

    {props.secretDoor && (
      <DoorButton
        {...props}
        onClick={() => console.log(`Spawn room ${props.secretDoor} of [${props.row}][${props.column}]`)}
      />
    )}
  </TileContainer>
)
