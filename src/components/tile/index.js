import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button'
import SvgIcon from '../SvgIcon'

export const TILE_SIZE = 20 // 1 tile = 5ft
export const BORDER_WIDTH = 1
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
    case 3: return 'trap'
    case 4: return 'chamber'
    case 5: return 'water'
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

const tileBackground = props => {
  const color = props.theme.tileColors[tileStyles(props)]
  const imageBase = img => `
    background-image: url("/static/img/tiles/${img}");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
  `
  let image
  switch (tileStyles(props)) {
    case 'floor':
    case 'passage':
      return image = imageBase(`tiles${Math.ceil(Math.random() * 9)}.jpg`)
    case 'trap':
      return image = imageBase('trap.jpg')
  }
  return `
    background-color: ${color};
    ${image};
  `
}

const StyledTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  border-style: solid;
  border-width: ${BORDER_WIDTH}px;
  ${tileBorderColor};
  ${tileBackground};
`

const TileContainer = styled.div`
  position: relative;
`

export const Tile = ({ openADoor, children, ...props }) => (
  <TileContainer>
    <StyledTile {...props}>
      {children}
    </StyledTile>

    {props.door && (
      <DoorButton
        {...props}
        onClick={() => openADoor(props)}
      />
    )}

    {props.secretDoor && (
      <DoorButton
        {...props}
        onClick={() => console.log(`Spawn secret room ${props.secretDoor} of [${props.row}][${props.column}]`)}
      />
    )}
  </TileContainer>
)
