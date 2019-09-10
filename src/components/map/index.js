import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { TILE_SIZE, BORDER_WIDTH } from '../tile'

export const Container = styled.div`
  border: 1px solid #444;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${TILE_SIZE / 2}px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
