import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Button from '../Button'
import SvgIcon from '../SvgIcon'

export const TILE_SIZE = 24 // 1 tile = 5ft
export const BORDER_WIDTH = 1
const directions = ['top', 'right', 'bottom', 'left']

const arrowPosition = props => {
  let top, right, bottom, left
  top = props.door === 'top' && -TILE_SIZE
  right = props.door === 'right' && -TILE_SIZE + BORDER_WIDTH
  bottom = props.door === 'bottom' && -TILE_SIZE
  left = props.door === 'left' && -TILE_SIZE + BORDER_WIDTH
  if (props.door === 'top' || props.door === 'bottom') {
    // TODO: fix top and bottom arrow placement
    left = TILE_SIZE * props.column + BORDER_WIDTH
  }
  return `
    top: ${top}px;
    right: ${right}px;
    bottom: ${bottom}px;
    left: ${left}px;
  `
}

const ArrowButton = styled(Button)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  padding: 0;
  background: #aaa;
  ${arrowPosition};
`

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

const StyledTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${TILE_SIZE}px;
  height: ${TILE_SIZE}px;
  background: ${props => props.theme.tileColors[tileStyles(props)]};
  border-style: solid;
  ${tileBorderWidth};
  ${tileBorderColor};
`

export const Tile = ({ children, ...props }) => (
  <>
    <StyledTile {...props}>
      {children}
    </StyledTile>

    {props.door && (
      <ArrowButton {...props} onPress={() => console.log(`Make room ${props.door}`)}>
        <SvgIcon name={props.door} size={TILE_SIZE * 0.75} />
      </ArrowButton>
    )}
  </>
)
