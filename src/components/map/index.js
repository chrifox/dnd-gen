import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { TILE_SIZE } from '../tile'

export const Container = styled.div`
  border: 1px solid #444;
  display: flex;
  flex-direction: column;
  padding: ${TILE_SIZE / 2}px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.length * TILE_SIZE}px;
`
