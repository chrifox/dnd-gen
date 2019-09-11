import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { TILE_SIZE, BORDER_WIDTH } from '../tile'

export const Container = styled.div`
  padding: ${TILE_SIZE / 2}px;
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`
