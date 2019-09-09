import React, { useState } from 'react'
import styled, { css } from 'styled-components'

export const TILE_SIZE = 16
const BORDER_WIDTH = 1

const tileStyles = props => {
  switch (props.value) {
    case 's': return 'start'
    case 'e': return 'end'
    case 0: return 'path'
    default: return 'wall' // default is 1
  }
}

const tileBorder = props => {
  const { n, e, s, w } = props.options
  return css`
    border-top-color: rgba(100,0,0,${n ? 0.5 : 0.2});
    border-right-color: rgba(100,0,0,${e ? 0.5 : 0.2});
    border-bottom-color: rgba(100,0,0,${s ? 0.5 : 0.2});
    border-left-color: rgba(100,0,0,${w ? 0.5 : 0.2});
  `
}

export const Tile = styled.div`
  padding: ${(TILE_SIZE - BORDER_WIDTH * 2) / 2}px;
  background: ${props => props.theme.tileColors[tileStyles(props)]};
  border: ${BORDER_WIDTH}px solid rgba(0,0,0,0.3);
`
